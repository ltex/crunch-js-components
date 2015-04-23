'use strict';

module.exports = HierarchicalVariablesListDirective

HierarchicalVariablesListDirective.$inject = [
]

function HierarchicalVariablesListDirective() {

    return {
        restrict: 'E'
        ,templateUrl: '/variables-accordion/variables-accordion.html'
        ,link: function( scope ) {
            var currentHVL
                ;

            console.log('here1')

            scope.$watch('hierarchicalVariablesList', function(hvl) {
                if(hvl === undefined){ return }
                refreshRoot(hvl)

                if(currentHVL !== hvl) {
                    currentHVL = hvl
                    hvl.on('hvl.refreshed', function() {
                        refreshRoot(hvl)
                    })
                }
            })

            function refreshRoot(hvl) {
                scope.root = hvl.root
            }
        }
    }
}
