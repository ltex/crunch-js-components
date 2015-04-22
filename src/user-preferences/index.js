'use strict';

module.exports = buildModule

var angular = require('angular')
,_ = require('lodash')
;

function buildModule(moduleName, cfg) {
    var mod = angular.module(moduleName || 'user-preferences', []);
    mod.factory('lodash', function() {
        return _
    })
    mod.factory('userPreferences', require('./user-preferences'));
    mod.factory('iFetchUserPreferences', require('./i-fetch-user-preferences'))
    mod.factory('setUserPreferencesHandler', require('./set-user-preferences-handler'))
    return mod
}
