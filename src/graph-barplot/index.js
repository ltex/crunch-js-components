'use strict';

module.exports = buildModule

function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,d3 = require('d3')
        ,_ = require('lodash')
        ;

    var mod = angular.module(moduleName || 'graph-barplot', []);
    mod.factory('d3', function() { return d3 })
    mod.factory('lodash', function(){ return _ })
    mod.factory('iDrawGroupedBarcharts', require('./i-draw-grouped-barcharts.js'))
    mod.factory('iDrawUngroupedBarcharts', require('./i-draw-ungrouped-barcharts.js'))
    mod.factory('iDrawHorizontalBarcharts', require('./i-draw-horizontal-barcharts.js'))    

    return mod
}
