'use strict'

module.exports = NumericDropZoneFactory

NumericDropZoneFactory.$inject = [
    'TypedDropZone'
    , 'dropZoneUtils'
]

function NumericDropZoneFactory(TypedDropZone, utils) {
    var getVariableId = utils.getVariableId
        ;

    var NumericDropZone = TypedDropZone.extend({
        namespace : 'analyzeDropZone'

        , initialState : 'uninitialized'

        , destroy : function() {
            this.off()
            this.analysisListener.off()
        }

        , refreshDropZone : function() {
            if(this.analysis.isEmpty()) {
                this.transition('measure-only')
            } else if (this.analysis.hasArrayVariables()){
                this.transition('measure-only')
            } else if (this.analysis.hasMeanMeasure()){
                this.transition('group-only')
            } else {
                this.transition('count')
            }
        }

        , $events : [
            'row:link'
            , 'column:link'
            , 'table:link'
            , 'mean:link'
            , 'group:link'
            , 'slice:link'
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

            , 'count' : {
                'row:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 0, getVariableId(data))
                }

                , 'column:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                }

                , 'slice:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'slices'
                    this.transition('sliced')
                }

                , 'group:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'groups'
                    this.transition('grouped')
                }

                , 'mean:link' : function(e, data) {
                    this.analysis.handle('measures-mean', getVariableId(data))
                }

                , 'table:link' : function(e, data) {
                    this.analysis.handle('clean')
                    this.analysis.handle('measures-mean', getVariableId(data))
                    this.transition('measure-only')
                }
            }
            , 'group-only' : {
                'row:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 0, getVariableId(data))
                }

                , 'column:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                }

                , 'group:link' : function(e, data) {
                    this.analysis.handle('replace-variable', 1, getVariableId(data))
                    this.slicesOrGroups.value = 'groups'
                    this.transition('grouped')
                }

                , 'mean:link' : function(e, data) {
                    this.analysis.handle('measures-mean', getVariableId(data))
                }

                , 'table:link' : function(e, data) {
                    this.analysis.handle('clean')
                    this.analysis.handle('measures-mean', getVariableId(data))
                    this.transition('measure-only')
                }
            }
            , 'measure-only' : {
                'row:link' : function(e, data) {
                    this.analysis.handle('measures-count')
                    this.analysis.handle('clean')
                    this.analysis.handle('add-variable', getVariableId(data))
                }

                , 'tabs:link' : function(e, data) {
                    if(this.analysis.dimension > 2) {
                        this.analysis.handle('replace-variable', 0, getVariableId(data))
                    } else {
                        this.analysis.handle('insert-before', 0, getVariableId(data))
                    }
                }

                , 'mean:link' : function(e, data) {
                    this.analysis.handle('measures-mean', getVariableId(data))
                }
            }
        }
    })

    NumericDropZone.prototype.toString = function() {
        return 'numeric-' + this.tableOrGraph.value + '-' + this.state
    }

    return {
        create : function(params) {
            var numericDropZone = new NumericDropZone()
                ;

            numericDropZone.handle('initialize', (params || {}))

            return numericDropZone
        }
    }
}
