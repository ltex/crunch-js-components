;
module.exports = (function() {
    'use strict';
    var angular = require('angular')
        ,d3 = require('d3')
        ,_ = require('lodash');;

    function buildModule(moduleName, cfg) {
        var defaultCfg = {
            deps: []
        };;
        cfg = _.extend({}, defaultCfg, cfg);
        var mod = angular.module(moduleName || 'vega-helpers', cfg.deps);
        mod.factory('iMeasureLabels', require(
            './i-measure-labels'));
        mod.factory('svgTextUtil', require('./svg-text-util'));
        mod.factory('markDimensionsHelper', require(
            './mark-dimensions-helper'));
        mod.factory('d3', function() {
            return d3
        });
        mod.factory('lodash', function() {
            return _
        });
        return mod
    }
    return buildModule
})
    .call(this);