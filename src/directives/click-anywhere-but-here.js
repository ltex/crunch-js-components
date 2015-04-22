'use strict';
module.exports = clickAnywhereButHere
clickAnywhereButHere.$inject = [
    '$document'
]
function clickAnywhereButHere($document) {
    return {
        restrict: 'A'
        , link: function(scope, elem, attr, ctrl) {
            scope.safeApply = function(fn) {
                var phase = scope.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && typeof fn === 'function') {
                        fn()
                    }
                } else {
                    this.$apply(fn)
                }
            };
            var applyToScopeIfPossible = function() {
                try {
                    scope.$apply()
                } catch (e) {}
            };
            function stop(e){
                return e.stopPropagation()
            }
            function handle(){
                scope.safeApply(function() {
                    scope.$eval(attr.clickAnywhereButHere)
                })
            }
            $document[0].addEventListener('click', handle)
            elem[0].addEventListener('click', stop)
            scope.$on('$destroy',function(){
                $document[0].removeEventListener('click',handle)
                elem[0].removeEventListener('click',stop)
            })
        }

    }
}
