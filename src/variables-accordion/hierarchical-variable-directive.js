'use strict';

module.exports = HierarchicalVariableDirective

HierarchicalVariableDirective.$inject = [
    '$compile'
]
function HierarchicalVariableDirective($compile) {
    return {
        restrict: 'C'
        ,scope: true
        ,link: function(scope, el, attrs) {
            var elm = el[0]
            scope.$watch('variable',function(variable){
                elm.innerHTML = ''
                var compiled
                    ,type
                    ;

                if(variable.subvariables) {
                    type = 'composite'
                    compiled = $compile('<composite-variable></composite-variable>')(scope)
                } else {
                    compiled = $compile('<scalar-variable></scalar-variable>')(scope)
                    type = 'scalar'
                }

                elm.classList.add(type)
                elm.appendChild(compiled[0])
            })
        }
    }

}
