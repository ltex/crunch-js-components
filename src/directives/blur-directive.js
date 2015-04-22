'use strict';
module.exports = BlurDirective

BlurDirective.$inject = [];
function BlurDirective() {
    return {
        link: function(scope, elem, attrs) {
            var elm = elem[0]
            function execute(e) {
                scope.$evalAsync(attrs.blur)
            }
            elm.addEventListener('blur', execute)
            scope.$on('$destroy',function(){
                elm.removeEventListener(execute)
            })
        }
    }
}
