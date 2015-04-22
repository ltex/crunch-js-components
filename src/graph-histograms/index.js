'use strict';

module.exports = buildModule

function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,chroma = require('chroma-js')
        ,d3 = require('d3')
        ,d3tip = require('d3-tip')
        ;

    var defaultCfg = {
        deps: []
    };
    var mod = angular.module(moduleName || 'graph-histograms', []);
    mod.factory('chroma', function() {
        return chroma
    });
    mod.factory('d3', function() {
        return d3
    });
    mod.factory('d3tip', function(){
        return d3tip
    })

    mod.factory('iDrawStackedHistograms', require('./i-draw-stacked-histograms'))

    return mod
}
