'use strict'

module.exports = buildModule

function buildModule(name, cfg) {
    var angular = require('angular')
        , mod = angular.module((name || 'tables'), [])
        ;

    mod.directive('analyzeTable', require('./analyze-table-directive'))
    mod.directive('titleVariable', require('./title-variable-directive'))
    mod.directive('cell', require('./cell-directive'))
    mod.directive('sort', require('./sort-directive'))

    return mod
}
