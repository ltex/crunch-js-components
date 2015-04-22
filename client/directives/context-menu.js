;
module.exports = (function() {
    'use strict';

    function contextMenu($document) {
        return {
            link: function(scope, el, attrs) {
                var parent = el.parent();
                el.addClass('context-menu');
                angular.element('body')
                    .append(el);

                function closeMenu() {
                    parent.removeClass('dropdown-open')
                    el.removeClass('shown');
                    el.off('click.contextmenu');
                    $document.off('click.contextmenu')
                }

                function handleOnContextMenu($event) {
                    if (!el.children()
                        .length) {
                        return false
                    }
                    $document.trigger('click');
                    el.addClass('shown');
                    el.css({
                        top: $event.pageY
                        , left: $event.pageX
                    });

                    parent.addClass('dropdown-open')

                    el.on('click.contextmenu', function($event) {
                        $event.stopPropagation();
                        closeMenu()
                    });
                    $document.on('click.contextmenu', function() {
                        closeMenu()
                    })
                }
                scope.handleOnContextMenu = handleOnContextMenu;
                parent.on('contextmenu.contextmenu', function(
                    $event) {
                    $event.preventDefault();
                    handleOnContextMenu($event)
                });
                scope.$on('$destroy', function() {
                    parent.off('contextmenu.contextmenu');
                    el.remove()
                })
            }
        }
    }
    contextMenu.$inject = ['$document'];
    return contextMenu
})
    .call(this);