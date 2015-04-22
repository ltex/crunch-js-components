'use strict';

module.exports = buildModule
function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,chroma = require('chroma-js')
        ,d3 = require('d3')
        ,_ = require('lodash')
        ;

    var mod = angular.module(moduleName || 'analyze', []);
    mod.factory('chroma', function() {
        return chroma
    });
    mod.factory('d3', function() {
        return d3
    });
    mod.factory('lodash', function() {
        return _
    })

    mod.directive('analyzeTitle', require('./analyze-title-directive'))
    mod.directive('bivariateContext',require('./bivariate-context-directive'))
    mod.directive('emptyAnalysis', require('./empty-analysis-directive'))

    return mod
}
