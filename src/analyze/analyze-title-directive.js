'use strict'

module.exports = AnalysisTitleDirective

function AnalysisTitleDirective() {

    function AnalysisTitleCtrl($scope) {
        this.$scope = $scope
    }

    AnalysisTitleCtrl.prototype.removeMeanMeasure = function() {
        this.$scope.analysis.handle('measures-count')
        this.$scope.analysis.handle('recalculate')
    }

    Object.defineProperties(AnalysisTitleCtrl.prototype, {
        visible : {
            get : function() {
                var analysis = this.$scope.analysis
                    , bivariate
                    , hasArray
                    , barchart
                    , graph
                    ;

                if(analysis) {
                    bivariate = analysis.isBivariate()
                    hasArray = analysis.hasArrayVariables()
                    barchart = analysis.graphType === 'barchart'
                    graph = this.$scope.settings.tableOrGraph.graph
                }

                return analysis && (hasArray || bivariate || !graph || (graph && !barchart))
            }
        }

        , meanMeasureVisible : {
            get : function() {
                return this.$scope.analysis.hasMeanMeasure()
                    && !this.$scope.analysis.isEmpty()
            }
        }
    })

    AnalysisTitleCtrl.$inject = [
        '$scope'
    ]

    return {
        templateUrl : '/analyze/analyze-title.html'
        , controller : AnalysisTitleCtrl
        , controllerAs : 'ctrl'
        , scope : {
            analysis : '='
            , settings : '='
            , xtab : '='
        }
        , restrict : 'E'
    }
}