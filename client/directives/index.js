'use strict';
module.exports = buildModule

function buildModule(moduleName) {
    var angular = require('angular')
        ,_ = require('lodash');

    var deps = {
        blur: require('./blur-directive')
        , toggleButton: require('./button-toggle')
        , clickAnywhereButHere: require('./click-anywhere-but-here')
        , contextMenu: require('./context-menu')
        , dropdown: require('./dropdown-directive')
        , fancyEdit: require('./fancy-edit')
        , fancyToggle: require('./fancy-toggle')
        , fileButton: require('./fileButton')
        , focus: require('./focus')
        , keyBind: require('./key-bind')
        , keyupBind: require('./keyup-bind')
        , multitoggle: require('./multitoggle')
        , rightClick: require('./right-click')
        , shortcutKey: require('./shortcut-key')
        , positionExpCard: require('./position-exp-card')
        , unfocus: require('./unfocus')
        , crEnterKeypress : require('./cr-enter-keypress')
        , crEscKeypress : require('./cr-esc-keypress')
        , crStopPropagation : require('./cr-stop-propagation')
    };
    var componentModule = angular.module(moduleName ||
        'directives', []);

    componentModule.factory('lodash', function() {
        return _
    });

    for (var k in deps) {
        componentModule.directive(k, deps[k])
    }

    return componentModule
}
