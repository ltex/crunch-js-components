'use strict'

module.exports = CategoricalDropZoneFactory

CategoricalDropZoneFactory.$inject = [
    'lodash'
    , '$rootScope'
    , 'TypedDropZone'
    , 'dropZoneUtils'
]

function CategoricalDropZoneFactory(_, $rootScope, TypedDropZone, utils) {
    var getVariableId = utils.getVariableId

    var CategoricalDropZone = TypedDropZone.extend({
        namespace : 'analyzeDropZone'

        , initialState : 'uninitialized'

        , destroy : function() {
            this.off()
            this.analysisListener.off()
        }

        , refreshDropZone : function() {
            if(this.analysis.isEmpty()) {
                this.transition('new')
            } else if(this.analysis.hasArrayVariables()) {
                this.transition('tabs')
            } else if(this.analysis.hasMeanMeasure()){
                this.transition('measure')
            } else if(this.analysis.hasBinnedRows()){
                this.transition('binned')
            } else if(this.analysis.isBivariate()) {
                this.transition('bivariate')
            } else {
                this.transition('univariate')
            }
        }

        , $events : [
            'slice:link'
            , 'group:link'
            , 'row:link'
            , 'column:link'
            , 'table:link'
            , 'tabs:link'
        ]

        , states : {
            uninitialized : {
                initialize : function(params) {
                    utils.assertRequiredParams(params)
                    this.analysis = params.analysis
                    this.slicesOrGroups = params.slicesOrGroups
                    this.tableOrGraph = params.tableOrGraph
                    this.dragged = params.dragged
                    this.analysisListener = this.analysis.on('analysis.changed',
                    this.refreshDropZone.bind(this))
                    this.refreshDropZone()
                }
            }

            , univariate : {
                'row:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 0, getVariableId(data))
                }

                , 'column:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.transition('bivariate')
                }

                , 'slice:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'slices'
                }

                , 'group:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'groups'
                }
            }

            , bivariate : {
                'row:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 0, getVariableId(data))
                }

                , 'column:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                }

                , 'slice:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'slices'
                }

                , 'group:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'groups'
                }

                , 'table:link' : function(e, data) {
                    this.analysis.handle('clean')
                    this.analysis.handle('add-variable', getVariableId(data))
                    this.transition('univariate')
                }

                , 'tabs:link' : function(e, data) {
                    if(this.analysis.dimension > 2) {
                        this.analysis.handle('replace-variable', 0, getVariableId(data))
                    } else {
                        this.analysis.handle('insert-before', 0, getVariableId(data))
                    }
                }
            }
            , binned : {
                'row:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 0, getVariableId(data))
                }

                , 'column:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                }

                , 'slice:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'slices'
                }
                , 'table:link' : function(e, data) {
                    this.analysis.handle('clean')
                    this.analysis.handle('add-variable', getVariableId(data))
                    this.transition('univariate')
                }
            }
            , measure : {
                'row:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 0, getVariableId(data))
                }

                , 'column:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.transition('bivariate')
                }

                , 'slice:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'slices'
                }

                , 'group:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'groups'
                }
                , 'table:link' : function(e, data){
                    this.analysis.handle('clean')
                    this.analysis.handle('measures-count')
                    this.analysis.handle('add-variable', getVariableId(data))
                }
            }

            , tabs : {
                'tabs:link' : function(e, data) {
                    if(this.analysis.dimension > 2) {
                        this.analysis.handle('replace-variable', 0, getVariableId(data))
                    } else {
                        this.analysis.handle('insert-before', 0, getVariableId(data))
                    }
                }
                , 'table:link' : function(e, data) {
                    this.analysis.handle('clean')
                    this.analysis.handle('measures-count')
                    this.analysis.handle('add-variable', getVariableId(data))
                }
            }

            , new : {
                'table:link' : function(e, data) {
                    this.analysis.handle('clean')
                    this.analysis.handle('measures-count')
                    this.analysis.handle('add-variable', getVariableId(data))
                }
            }
        }
    })

    CategoricalDropZone.prototype.toString = function() {
        return 'cat-' + this.tableOrGraph.value + '-' + this.state
    }

    return {
        class : CategoricalDropZone
        , create : function(params) {
            var categoricalDropZone = new CategoricalDropZone()
                ;

            categoricalDropZone.handle('initialize', (params || {}))

            return categoricalDropZone
        }
    }
}
