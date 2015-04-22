'use strict';

/**
 * creates a rolledup angular module with all crunch features
 * while allowing ordering of module construction
 * */
module.exports = function(cfg) {
    var angular = require('angular')
        ;

    require('crunch-js')

    var deps = [
          require('../directives')
        , require('../analyze')
        , require('../analyze-xtab')
        , require('../analyze-drop-zone')
        , require('../analyze-settings')
        , require('../analyze-manager')
        , require('../analyze-chart')
        , require('../analyze-table')
        , require('../graph-colors')
        , require('../graph-timeplot')
        , require('../graph-dotplot')
        , require('../graph-barplot')
        , require('../graph-histograms')
        , require('../analyses-tray')
        , require('../svg-helpers')
        , require('../user-preferences')
        , require('../datetime-formatter')
        , require('../display-filters')
    ]
    .map(function(modFactory) {
        return modFactory(undefined, modFactory[cfg.env])
    })
    .map(function(mod) {
        return mod.name
    })

    deps.unshift('crunchJS')

    return angular.module('features', deps)
}
