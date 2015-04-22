'use strict';
module.exports = Unfocus
Unfocus.$inject = []
function Unfocus() {
    return {
        restrict: 'A'
        , link: function(scope, element, attribs) {
            var elm = element[0]
            element[0].focus();
            function handle(e){
                scope.$apply(attribs['unfocus'])
            }
            elm.addEventListener('blur', handle)
            scope.$on('$destroy',function(){
                elm.removeEventListener('blur',handle)
            })
        }
    }
}
