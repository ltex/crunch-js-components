;
module.exports = (function() {
    'use strict';
    var angular = require('angular')
        ,_ = require('lodash')
        ,d3 = require('d3');;

    function buildModule(moduleName) {
        var mod = angular.module(moduleName || 'display-filters', []);
        mod.factory('lodash', function() {
            return _
        });
        mod.factory('d3', function() {
            return d3
        });
        mod.filter('percentage', require('./percentage-filter'));
        mod.filter('displayPercentage', require(
            './display-percentage-filter'));
        mod.filter('alwaysRoundCounts', require(
            './always-round-counts-filter'));
        mod.filter('displayNumber', require(
            './display-number-filter'));
        mod.filter('displayLabel', require('./display-label-filter'))
        mod.filter('displayDate', require('./display-date-filter'));
        mod.filter('truncate', require('./truncate-filter'));
        mod.filter('slugify', require('./slugify-filter'))
        return mod
    }
    return buildModule
})
    .call(this);
