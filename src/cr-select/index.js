'use strict';
module.exports = buildModule

function buildModule(moduleName) {
    var angular = require('angular')
    ;
    moduleName = moduleName || 'cr-select';
    var mod = angular.module(moduleName, [])

    mod.directive('crSelect', require('./cr-select-directive'))
    return mod
}
