'use strict';

module.exports = HierarchicalNestedGroupDirective

HierarchicalNestedGroupDirective.$inject = []

function HierarchicalNestedGroupDirective() {
    return {
        restrict: 'C'
        ,scope: true
        ,templateUrl : '/variables-accordion/hierarchical-nested-group.html'
        ,link: function(scope, el) {
            var BASIC_PADDING = 15
                , padding = (scope.nestedGroup.level - 1) * BASIC_PADDING
                ;

            function setPaddingLeft(el, padding) {
                el.css({ paddingLeft : padding })
            }

            setPaddingLeft(el, padding)

            setTimeout(function() {
                setPaddingLeft(el, 0)
                setPaddingLeft(el.find('a'), padding)
            }, 10)
        }
    }
}
