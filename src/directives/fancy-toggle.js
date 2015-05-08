;
module.exports = (function() {
    'use strict';

    function fancyToggle() {
        return {
            restrict: 'A'
            , replace: true
            , template: '<div class="fancy-toggle" data-ng-class="{checked: toggle, unchecked: !toggle}">' +
                '<span class="checked">{{checkedLabel||"Public"}}</span>' +
                '<span class="unchecked">{{uncheckedLabel||"Private"}}</span>' +
                '<input type="checkbox" data-ng-model="toggle" style="display: none"/>' +
                '</div>'
            , scope: {
                toggle: '=fancyToggle'
            },
            link: function(scope, el, attrs) {
                scope.checkedLabel = attrs['checkedLabel']
                scope.uncheckedLabel = attrs['uncheckedLabel']
            }
        }
    }
    return fancyToggle
})
    .call(this);