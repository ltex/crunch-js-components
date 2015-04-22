;
module.exports = (function() {
    'use strict';

    function fancyToggle() {
        return {
            restrict: 'A'
            , replace: true
            , template: '<div class="fancy-toggle" data-ng-class="{checked: toggle, unchecked: !toggle}">' +
                '<span class="checked">Public</span>' +
                '<span class="unchecked">Private</span>' +
                '<input type="checkbox" data-ng-model="toggle" style="display: none"/>' +
                '</div>'
            , scope: {
                toggle: '=fancyToggle'
            }
        }
    }
    return fancyToggle
})
    .call(this);