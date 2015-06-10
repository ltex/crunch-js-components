'use strict'

module.exports = buildModule

function buildModule() {
    var angular = require('angular')
        , mod = angular.module('analyze-tabs', [])
        ;

    mod.directive('analyzeTabs', require('./analyze-tabs-directive'))

    return mod
}