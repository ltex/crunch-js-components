'use strict'

module.exports = SortDirective

function SortDirective() {

    return {
        restrict : 'A'
        , scope : true
        , link : function(scope, $el) {
            var current
                , directionClasses = {
                    '-1' : 'up'
                    , '1' : 'down'
                }
                , viewSettings = scope.settings
                ;

            function sortByIndex(e) {
                var sortKey = e.currentTarget.dataset.sortKey
                , sortSource = e.currentTarget.dataset.sortSource
                    ;
                var descendingFirstDirection = {
                        '-1' : 1
                        , '0' : -1
                        , '1' : 0
                    }
                var ascendingFirstDirection = {
                    '-1' : 0
                    , '0' : 1
                    , '1' : -1
                }
                current = sortKey
                var nextDirection = sortSource === 'labels' ?
                    ascendingFirstDirection[viewSettings.sortDirection.value] :
                    descendingFirstDirection[viewSettings.sortDirection.value]
                scope.$apply(function() {
                    viewSettings.sortSource = sortSource
                    viewSettings.sortKey = sortKey
                    viewSettings.sortDirection.value = nextDirection
                    //setCurrentDirection(e.currentTarget) // we're not using arrows
                })
                scope.$broadcast('analyze.refresh.requested')
            }

            function setCurrentDirection() {
                var selector
                    , target
                    ;


                selector = '*[data-sort-key="'+viewSettings.sortKey+'"]'


                target = $sortButtons()
                            .filter(selector)
                            .get(0)

                cleanClasses()
                addClasses(target, viewSettings.sortDirection.value)
            }

            function addClasses(el, direction) {
                if(direction !== 0) {
                    el.classList.add(directionClasses[direction])
                }
            }

            function cleanClasses() {
                $sortButtons().removeClass('up down')
            }

            function $sortButtons() {
                return $el.find('.sort-table')
            }

            $el.on('click', '.sort-table', sortByIndex)

            scope.$on('$destroy', function() {
                $el.off('click', sortByIndex)
            })
        }
    }
}
