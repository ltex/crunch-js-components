'use strict'

module.exports = buildModule

function buildModule(name, cfg) {
    var angular = require('angular')
        , mod = angular.module((name || 'analyze-chart'), [])
        ;

    mod.directive('chart', require('./chart-directive'))

    return mod
}