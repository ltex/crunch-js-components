;
module.exports = (function() {
    'use strict';

    function buttonToggle() {
        return {
            restrict: 'A'
            , replace: true
            , template: '<div class="btn toggle"' +
                'data-ng-click="toggle = !toggle"' +
                'data-ng-class="{checked: toggle || alwaysSelected, unchecked: !toggle && !alwaysSelected, flipped: flipped, small: small}"' +
                'data-ng-style="{width: width + \'em\'}">' +
                '<input type="checkbox" data-ng-model="toggle" style="display: none"/>' +
                '<span data-ng-show="toggle" class="selected">{{selected}}</span>' +
                '<span data-ng-show="!toggle" class="unselected">{{unselected}}</span>' +
                '</div>'
            , scope: {
                toggle: '=toggleButton'
                , selected: '=toggleSelected'
                , unselected: '=toggleUnselected'
                , flipped: '=toggleFlipped'
                , alwaysSelected: '=toggleAlwaysSelected'
                , small: '=toggleSmall'
            }
            , link: function(scope, element, attrs) {
                var items = [
                    scope.selected.length, scope.unselected.length
                ];
                Array.max = function(array) {
                    return Math.max.apply(Math, array)
                };
                scope.maxChar = Array.max(items);
                scope.width = scope.maxChar
                if (scope.small === true) {
                    scope.width = scope.maxChar - 3
                }
            }
        }
    }
    return buttonToggle
})
    .call(this);
