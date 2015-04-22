'use strict'

module.exports = buildModule

function buildModule(moduleName) {
    var angular = require('angular')
        ,_ = require('lodash')
        ,moment = require('moment')

    var mod = angular.module(moduleName || 'datetime-formatter', [])

    mod.factory('lodash', function() {
        return _
    })

    mod.factory('moment', function() {
        return moment
    })

    mod.factory('datetimeFormatter', require('./datetime-formatter'))
    return mod
}