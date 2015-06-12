'use strict'

module.exports = AnalyzeTableDirective

function AnalyzeTableDirective(_) {

    function TableCtrl($scope) {
        this.removeColumn = function() {
            var index = $scope.analysis.data.cube.dimension < 3 ? 1 : 2
                ;
            $scope.analysis.handle('remove-variable', index)
        }

        this.removeRow = function() {
            var index = $scope.analysis.data.cube.dimension < 3 ? 0 : 1
                ;

            $scope.analysis.handle('remove-variable', index)
        }

        this.removeMeanMeasure = function() {
            $scope.analysis.handle('measures-count')
            $scope.analysis.handle('recalculate')
        }
    }

    TableCtrl.$inject = ['$scope']

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
        , link : function($scope, $el) {
            $scope.$watch('xtab.rows.length', function(l) {
                if(l) {
                    _.defer(function() {
                        $el.find('.horizontal-padding')
                        .width($el.find('.xtabs-table > table').outerWidth() + 36)
                    })
                }
            })
        }
    }
}

AnalyzeTableDirective.$inject = ['lodash']