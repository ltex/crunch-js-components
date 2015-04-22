'use strict'

module.exports = DropZoneContentDirective

DropZoneContentDirective.$inject = [
    '$timeout'
    , 'dropZoneContentMediator'
]

function DropZoneContentDirective($timeout, dropZoneContentMediator) {

    return {
        restrict: 'EA'
        , templateUrl : '/analyze-drop-zone/drop-zone-content.html'
        , replace : true
        , scope : true
        , controller : 'DropZoneContentCtrl'
        , transclude : true
        ,link: function(scope, $el, attrs, ctrl, transclude) {
            var parent = $el[0].parentElement
                , exclude
                , timeoutId
                , draggedClone
                , currentClone
                , draggedScope
                , currentScope
                ;

            scope.zone = attrs.zone
            scope.zoneLabel = attrs.zoneLabel
            exclude = (attrs.exclude || '').split(',')

            transclude(function(clone, scope) {
                var dragged = clone.filter('span.dragged')
                    ;

                draggedClone = clone
                draggedScope = draggedScope

                if(dragged.length) {
                    $el.find('span.dragged').empty().append(dragged)
                }
            })

            transclude(function(clone, scope) {
                var current = clone.filter('span.current')
                    ;

                currentClone = clone
                currentScope = scope

                if(current.length) {
                    $el.find('span.current').empty().append(current)
                }
            })

            function showDragged() {
                if(!scope.draggedVisible && !timeoutId) {
                    timeoutId = $timeout(function() {
                        dropZoneContentMediator.hide(exclude)
                        scope.draggedVisible = true
                        timeoutId = undefined
                    },30)
                }
            }

            function hideDragged() {
                $timeout(function() {
                    dropZoneContentMediator.showAll()
                    scope.draggedVisible = false
                },30)
            }

            scope.$on('$destroy', function() {
                if(currentScope) {
                    currentClone.remove()
                    draggedClone.remove()
                    currentScope.$destroy()
                }

                if(draggedScope) {
                    draggedScope.$destroy()
                }
            })
            scope.$on('dragover', showDragged)
            scope.$on('dragleave', hideDragged)
            scope.$on('drop', hideDragged)
        }
    }
}
