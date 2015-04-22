'use strict'

module.exports = buildModule

function buildModule(name) {
    var angular = require('angular')
        , mod = angular.module((name || 'analyze-xtab'), [])
        ;

    mod.factory('assert', function() {
        return console.assert.bind(console)
    })

    mod.factory('displayCube', require('./display-cube'))
    mod.factory('xtabFactory', require('./xtab-factory'))
    mod.factory('iFetchRelevantComparisons', require('./i-fetch-relevant-comparisons'))

    return mod
}