'use strict'

module.exports = AnalyzeTableDirective

function AnalyzeTableDirective(_) {

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