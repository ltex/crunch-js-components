'use strict';

module.exports = buildModule
function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,chroma = require('chroma-js')
        ,d3 = require('d3')
        ;
    var defaultCfg = {
        deps: []
    };
    var mod = angular.module(moduleName || 'graph-colors', []);
    mod.factory('chroma', function() {
        return chroma
    });
    mod.factory('d3', function() {
        return d3
    });

    mod.factory('CategoricalPalette', require('./categorical-palette'));
    mod.factory('tableCellColors', require('./table-cell-colors'))
    mod.directive('cellColorKey', require('./cell-color-key-directive'))
    return mod
}
