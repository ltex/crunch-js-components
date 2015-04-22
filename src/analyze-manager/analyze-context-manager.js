'use strict';

/** @exports AnalyzeContextManager*/
module.exports = AnalyzeContextManager

AnalyzeContextManager.$inject = [
    'machina'
    , 'assert'
    , 'analyzeEnvironment'
    , 'Analysis'
    , 'AnalyzeDropZone'
    , 'AnalyzeSettingsMediator'
    , 'AnalysesTray'
]

/** @class AnalyzeContextManager
 * @classdesc Provides a mediator and state machine for analyze context components.
 * @return {Function} An object with a create method, the create method is used to get a new instance of the FSM.
 **/
function AnalyzeContextManager(machina
    , assert
    , analyzeEnvironment
    , Analysis
    , AnalyzeDropZone
    , AnalyzeSettingsMediator
    , AnalysesTray) {

    var AnalyzeContextManager = machina.Fsm.extend({
        initialState: 'uninitialized'
        , namespace: 'analyze.manager.context'

        , getSetting : function(setting) {
            return this.viewSettings[setting]
        }

        , setupAnalysis : function(params) {
            var self = this
                ;

            this.currentAnalysis = Analysis.create(params)

            self.currentAnalysis.on('savedAnalysis.loaded', function() {
                var displaySettings = self.currentAnalysis.displaySettings
                    ;

                self.viewSettings.handle('load', self.currentAnalysis, displaySettings)
                analyzeEnvironment.handle('analysis.loaded', self.currentAnalysis)
            })

            self.currentAnalysis.on('analysis.loaded', function() {
                self.viewSettings.handle('load', self.currentAnalysis)
                self.emit('analysis.changed')
            })
        }

        , setupDropZones : function() {
            if(this.dropZone) {
                this.dropZone.destroy()
            }

            this.dropZone = AnalyzeDropZone.create({
                analysis : this.currentAnalysis
                , tableOrGraph : this.viewSettings.tableOrGraph
                , slicesOrGroups : this.viewSettings.slicesOrGroups
            })
        }

        , setupSettings : function() {
            var self = this
                ;

            self.viewSettings = AnalyzeSettingsMediator.create()

            self.viewSettings.on('settings.changed', function() {
                self.emit('settings.changed')
            })
        }

        , setupTray : function() {
            this.analysesTray = new AnalysesTray()
            this.analysesTray.handle('initialize')
        }

        , $events : [
            'environment.changed'
            , 'context.cleared'
            , 'analysis.load'
        ]

        , states:{
            uninitialized:{
                initialize:function(params) {
                    assert(params, 'Pass a valid params object')
                    assert(params.datasetId, 'Pass a valid datasetId')
                    assert(params.primaryVariableId, 'Pass a valid primaryVariableId')

                    this.initialVariable = params.primaryVariableId
                    this.datasetId = params.datasetId

                    this.setupSettings()
                    this.setupAnalysis({datasetId:params.datasetId})
                    this.setupTray()
                    this.setupDropZones()

                    this.currentAnalysis.handle('add-variable', this.initialVariable)

                    this.transition('initialized')
                }
            }

            , initialized:{
                _onEnter:function() {
                    this.emit('analyze.initialized')
                }

                , pause:function() {
                    this.transition('paused')
                }

                , 'environment.changed':function(e, data) {
                    if (data.updatePrimaryVariableId) {
                        this.currentAnalysis.handle('clean')
                        this.currentAnalysis.handle('add-variable', data.variableId)
                    } else {
                        this.currentAnalysis.recalculate()
                    }
                }

                , 'context.cleared':function() {
                    this.transition('destroying')
                }

                , 'analysis.load':function(e, params) {
                    this.currentAnalysis.destroy()

                    this.setupAnalysis({
                        datasetId:this.datasetId
                        , slideId:params.slideId
                        , analysis:params.analysis
                    })

                    this.currentAnalysis.handle('load')
                    this.setupDropZones()
                }
            }

            , paused:{
                initialize:function(params) {
                    if(!params.retainPreviousState) {
                        this.setupSettings()
                        this.setupDropZones()
                        this.currentAnalysis.handle('clean')
                        this.currentAnalysis.handle('add-variable', this.initialVariable)
                    } else {
                        this.currentAnalysis.recalculate()
                    }
                    this.transition('initialized')
                }

                , 'environment.changed':function(e, data) {
                    if (data.updatePrimaryVariableId) {
                        this.initialVariable = data.variableId
                    }
                }

                , 'context.cleared':function() {
                    this.transition('destroying')
                }
            }

            , destroying:{
                _onEnter:function() {
                    this.currentAnalysis.destroy()
                    this.dropZone.destroy()
                    this.viewSettings.destroy()
                    this.analysesTray.destroy()
                    this.transition('uninitialized')
                }
            }
        }
    })

    Object.defineProperties(AnalyzeContextManager.prototype, {
        'loaded' : {
            get : function() {
                return this.currentAnalysis.state === 'loaded'
            }
        }

        , 'loading' : {
            get : function() {
                return this.currentAnalysis.state === 'loading'
            }
        }

        , 'error' : {
            get : function() {
                return this.currentAnalysis.state === 'error'
            }
        }
        , 'empty' : {
            get : function(){
                return this.currentAnalysis.state === 'empty'
            }
        }

        , 'primaryVariableId' : {
            get : function() {
                return !this.empty ? this.currentAnalysis.variables.at(0).self :
                this.initialVariable
            }
        }
    })

    return new AnalyzeContextManager()
}
