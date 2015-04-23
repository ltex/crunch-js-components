'use strict';

module.exports = HierarchicalTopLevelItemDirective

HierarchicalTopLevelItemDirective.$inject = [
    '$compile'
]
function HierarchicalTopLevelItemDirective($compile) {
    return {
        restrict: 'C'
        ,scope: true
        ,link: function(scope, el, attrs) {
            var elm = el[0]
            scope.$watch('item', function(item){
                elm.innerHTML = ''
                var compiled
                    ;

                if(item.alias) {
                    scope.variable = item
                    compiled = $compile('<div class="hierarchical-variable"></div>')(scope)
                } else {
                    scope.group = item
                    compiled = $compile('<div class="group-item"><div class="hierarchical-group"></div></div>')(scope)
                }

                el.replaceWith(compiled[0])
            })
        }
    }

}
