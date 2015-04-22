'use strict';

module.exports = EmptyAnalysisDirective

EmptyAnalysisDirective.$inject = [
    '$timeout'
]

function EmptyAnalysisDirective($timeout){
    return {
        restrict: 'E'
        ,templateUrl : '/analyze/empty-analysis.html'
        ,link: function(scope, elm, attrs) {
            var showPromise
                ;

            scope.$watch('analyzeContextManager.empty', function(empty) {
                if(empty) {
                    showPromise = $timeout(show, 750)
                } else {
                    hide()
                }
            })

            function show() {
                scope.showEmptyAnalysisMessage = true
            }

            function hide() {
                $timeout.cancel(showPromise)
                scope.showEmptyAnalysisMessage = false
            }
        }
    }
}
