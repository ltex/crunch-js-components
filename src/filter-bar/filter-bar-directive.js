'use strict';

module.exports = FilterBarDirective

FilterBarDirective.$inject = [
    '$state'
    ,'$stateParams'
    ,'filterBar'
    ,'$document'
    ,'$timeout'
]

function FilterBarDirective($state, $stateParams, filterBar, $document, $timeout) {
    return {
        restrict: 'E'
        ,templateUrl: '/filter-bar/filter-bar.html'
        ,scope: true
        ,link: function(scope, el, attrs) {
            var q = {
                    datasetId: $stateParams.datasetId
                }

            scope.$stateParams = $stateParams
            var bar = filterBar
            scope.filterBar = bar

            scope.menuOffset = 0
            scope.replaceFilter = function(filter, $event){
                scope.menuOffset = $event.target.offsetLeft
                scope.filterBar.handle('replace',filter)
                setMenuHeight()
            }
            scope.appendFilter = function($event){
                scope.menuOffset = $event.target.offsetLeft
                scope.filterBar.handle('append')
                setMenuHeight()
            }

            scope.appendIfEmpty = function($event){
                if(bar.isUnfiltered) {
                    scope.appendFilter($event)
                }
            }

            $document[0].addEventListener('click', handle)
            el[0].addEventListener('click', stop)

            function setMenuHeight() {
                $timeout(function() {
                    scope.menuHeight =  isFilterMenuTooLarge() ? calculateFilterMenuHeight() : ''
                }, 20)
            }

            function isFilterMenuTooLarge() {
                var $filterMenu = el.find('.select-filter-menu')
                    , offset = $filterMenu.offset()
                    ;

                return $filterMenu.height() + offset.top > scope.workspace.dimensions.offsetHeight
            }

            function calculateFilterMenuHeight() {
                var filterMenuTop = el.find('.select-filter-menu').offset().top
                    , workspaceHeight = scope.workspace.dimensions.offsetHeight
                    , EXTRA_SPACE = 40
                    ;

                return workspaceHeight - filterMenuTop + EXTRA_SPACE
            }

            function stop(e){
                return e.stopPropagation()
            }
            function handle(e){
                scope.$apply(function(){
                    e.stopPropagation()
                    scope.filterBar.handle('cancel')
                })
            }
            scope.$on('$destroy', function(){
                $document[0].removeEventListener('click',handle)
                el[0].removeEventListener('click',stop)
            })
        }
    }

}
