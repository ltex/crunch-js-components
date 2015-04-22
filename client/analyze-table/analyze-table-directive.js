'use strict'

module.exports = AnalyzeTableDirective

function AnalyzeTableDirective() {

    function TableCtrl($scope) {
        this.removeColumn = function() {
            $scope.analysis.handle('remove-variable', 1)
        }

        this.removeRow = function() {
            $scope.analysis.handle('remove-variable', 0)
        }

        this.removeMeanMeasure = function() {
            $scope.analysis.handle('measures-count')
            $scope.analysis.handle('recalculate')
        }
    }

    return {
        restrict : 'E'
        , templateUrl : '/analyze-table/analyze-table.html'
        , controller : TableCtrl
        , controllerAs : 'ctrl'
        , scope : {
            analysis : '='
            , xtab : '='
            , settings : '='
        }
    }
}