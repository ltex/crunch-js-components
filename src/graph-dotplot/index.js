'use strict';

module.exports = buildModule
function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,chroma = require('chroma-js')
        ,d3 = require('d3')
        ,d3tip = require('d3-tip')
    var defaultCfg = {
        deps: []
    };
    var mod = angular.module(moduleName || 'graph-dotplot', []);
    mod.factory('chroma', function() {
        return chroma
    });
    mod.factory('d3', function() {
        return d3
    });
    mod.factory('d3tip', function(){
        return d3tip
    })
    mod.directive('graphDotplot', require('./graph-dotplot-directive'));
    return mod
}
