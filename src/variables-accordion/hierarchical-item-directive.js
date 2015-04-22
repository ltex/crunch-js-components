'use strict';

module.exports = HierarchicalItemDirective

HierarchicalItemDirective.$inject = [
    '$compile'
]
function HierarchicalItemDirective($compile) {
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
                    scope.nestedGroup = item
                    compiled = $compile('<div class="hierarchical-nested-group"></div>')(scope)
                }

                el.replaceWith(compiled[0])
            })
        }
    }

}
