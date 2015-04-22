var angular = require('angular');
module.exports = (function() {
    'use strict';

    function Dropdown($window, $document) {
        return {
            link: function postLink(scope, element, attrs) {
                var parent = element;
                var el = element.next();
                parent.addClass('drop');
                el.addClass('cr-dropdown-menu');
                angular.element('body')
                    .append(el);

                function closeMenu() {
                    parent.removeClass('dropdown-open')
                    el.removeClass('shown');
                    el.off('click.dropdownmenu');
                    $document.off('click.dropdownmenu')
                }

                function handleOnClick($event) {
                    if (!el.children()
                        .length) {
                        return false
                    }
                    $document.trigger('click');
                    var margin = 20;
                    var top = parent.offset()
                        .top + parent.outerHeight();
                    var left = parent.offset()
                        .left + parent.outerWidth() - el.outerWidth();
                    if ($window.innerHeight <= top + el.outerHeight() +
                        margin) {
                        top = parent.offset()
                            .top - el.outerHeight()
                    }
                    if (left <= 0) {
                        left = parent.offset()
                            .left
                    }
                    el.css({
                        top: top
                        , left: left
                    }).addClass('shown')

                    parent.addClass('dropdown-open')

                    el.on('click.dropdownmenu', function($event) {
                        $event.stopPropagation();
                        closeMenu()
                    });
                    $document.on('click.dropdownmenu', function() {
                        closeMenu()
                    })
                }
                scope.handleOnClick = handleOnClick;
                parent.on('click.dropdownmenu', function($event) {
                    $event.stopPropagation();
                    handleOnClick($event)
                });
                scope.$on('$destroy', function() {
                    parent.off('click.dropdownmenu');
                    el.remove()
                })
            }
        }
    }
    Dropdown.$inject = ['$window', '$document'];
    return Dropdown
})
    .call(this);
