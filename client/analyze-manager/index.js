'use strict'

module.exports= buildModule

function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,_ = require('lodash')
        ;

    moduleName = moduleName || 'analyze-state'

    var mod = angular.module(moduleName, [])

    mod.factory('lodash', function() {
        return _
    })

    mod.factory('assert', function() {
        return console.assert.bind(console)
    })

    mod.factory('analyzeContextManager', require('./analyze-context-manager'))
    mod.factory('analyzeEnvironment', require('./analyze-environment'))

    return mod
}
