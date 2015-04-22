module.exports = (function() {
    'use strict';

    var angular = require('angular')

    return buildModule

    /***
     * Builds the main `AnalysesTray` module.
     * ***/
    function buildModule(moduleName, cfg) {
        var mod

        moduleName = moduleName || 'analyses-tray'
        mod = angular.module(moduleName, [])

        mod.factory('AnalysesTray', require('./analyses-tray'))

        return mod
    }
}).call(this)
