'use strict';

module.exports = HierarchicalGroupDirective

HierarchicalGroupDirective.$inject = [
]

function HierarchicalGroupDirective() {

    return {
        restrict: 'AC'
        ,templateUrl: '/variables-accordion/hierarchical-group.html'
        ,scope: true
        ,replace: true
        ,link: function(scope, el, attrs) {
        }
    }

}
