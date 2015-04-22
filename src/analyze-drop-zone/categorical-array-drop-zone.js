'use strict'

module.exports = CategoricalArrayDropZoneFactory

CategoricalArrayDropZoneFactory.$inject = [
    'lodash'
    , '$rootScope'
    , 'TypedDropZone'
    , 'dropZoneUtils'
]

function CategoricalArrayDropZoneFactory(_, $rootScope, TypedDropZone, utils) {
    var getVariableId = utils.getVariableId
        ;

    var CategoricalArrayDropZone = TypedDropZone.extend({
        namespace : 'analyzeDropZone'

        , initialState : 'uninitialized'

        , destroy : function() {
            this.off()
            this.analysisListener.off()
        }

        , refreshDropZone : function() {
        }

        , _set : function(data) {
            this.analysis.handle('clean')
            this.analysis.handle('measures-count')
            this.analysis.handle('add-variable', getVariableId(data))
        }

        , $events : [
            , 'table:link'
            , 'slice:link'
            , 'group:link'
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

                    this.transition('univariate')
                }
            }
            , 'univariate' : {

                'table:link' : function(e, data) {
                    this._set(data)
                }

                , 'slice:link' : function(e, data) {
                    this.slicesOrGroups.value = 'slices'
                    this._set(data)
                }

                , 'group:link' : function(e, data) {
                    this.slicesOrGroups.value = 'groups'
                    this._set(data)
                }
            }
        }
    })

    CategoricalArrayDropZone.prototype.toString = function() {
        return 'cat-array-' + this.tableOrGraph.value + '-' + this.state
    }

    return {
        create : function(params) {
            var catArrayDropZone = new CategoricalArrayDropZone()
                ;

            catArrayDropZone.handle('initialize', (params || {}))

            return catArrayDropZone
        }
    }
}
