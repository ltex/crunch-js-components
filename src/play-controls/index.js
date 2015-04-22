;
module.exports = (function() {
    'use strict';
    var angular = require('angular')
        ,_ = require('lodash');;

    function buildModule(moduleName, cfg) {
        var defaultCfg = {
            deps: []
        };;
        cfg = _.extend({}, defaultCfg, cfg);
        var mod = angular.module(moduleName || 'play-controls', cfg.deps)
        mod.directive('multistateButton', require('./multistate-button-directive'))
        mod.directive('playControls', require('./play-controls-directive'))
        mod.controller('playControl', require('./play-ctrl'))
        return mod
    }
    return buildModule
})
    .call(this);