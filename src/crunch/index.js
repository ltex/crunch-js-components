'use strict';

module.exports = buildModule

function buildModule(moduleName) {
    var angular = require('angular')
        ,_ = require('lodash')
        ;

    moduleName = moduleName || 'crunch';

    var features = require('./features-list')({})

    return angular.module(moduleName,[
        , features.name
        ,'templates'
    ])
}

