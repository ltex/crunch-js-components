'use strict'

module.exports = AnalysisTitleDirective

function AnalysisTitleDirective() {

    function AnalysisTitleCtrl($scope) {
        this.init = function() {
            Object.defineProperties(this, {
                visible : {
                    get : function() {
                        var analysis = $scope.analysis
                            , bivariate
                            , hasArray
                            , barchart
                            , graph
                            ;

                        if(analysis) {
                            bivariate = analysis.isBivariate()
                            hasArray = analysis.hasArrayVariables()
                            barchart = analysis.graphType === 'barchart'
                            graph = $scope.settings.tableOrGraph.graph
                        }

                        return analysis && (hasArray || bivariate || !graph || (graph && !barchart))
                    }
                }

                , meanMeasureVisible : {
                    get : function() {
                        return $scope.analysis.hasMeanMeasure()
                            && !$scope.analysis.isEmpty()
                    }
                }
            })

            this.removeMeanMeasure = function() {
                $scope.analysis.handle('measures-count')
                $scope.analysis.handle('recalculate')
            }
        }
    }

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