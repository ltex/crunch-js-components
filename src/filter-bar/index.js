'use strict';
module.exports = buildModule

buildModule.prod = {
    initFilterBar : true
}

function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,_ = require('lodash')
        ;

    cfg = cfg || {}

    var mod = angular.module(moduleName || 'filter-bar', []);
    mod.factory('lodash', function() {
        return _
    })
    mod.directive('filterBar',require('./filter-bar-directive'))
    mod.factory('filterBar',require('./filter-bar'))
    mod.factory('iFetchFilters',require('./i-fetch-filters'))
    mod.factory('setFiltersHandler', require('./set-filters-handler'))

    if(cfg.initFilterBar) {
        mod.run(['filterBar', function (filterBar) {
            filterBar.handle('start')
        }])
    }

    return mod
}
