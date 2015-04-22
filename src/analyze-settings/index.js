'use strict'

module.exports= buildModule

function buildModule(moduleName, cfg) {
    var angular = require('angular')
        ,_ = require('lodash')
        ;

    moduleName = moduleName || 'analyze-settings'

    var mod = angular.module(moduleName, [])

    mod.factory('lodash', function() {
        return _
    })

    mod.factory('ToggleableSetting', require('./toggleable-setting'))
    mod.factory('Setting', require('./setting'))
    mod.factory('AnalyzeSettingsMediator', require('./analyze-settings-mediator'))

    return mod
}
