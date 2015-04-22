'use strict';

module.exports = buildModule
function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,chroma = require('chroma-js')
        ,d3 = require('d3')
    var defaultCfg = {
        deps: []
    };
    var mod = angular.module(moduleName || 'graph-timeplot', []);
    mod.factory('chroma', function() {
        return chroma
    });
    mod.factory('d3', function() {
        return d3
    });

    mod.factory('iFormatTimeplots', require('./i-format-timeplots'))
    mod.directive('graphTimeplot', require('./graph-timeplot-directive'));
    return mod
}
