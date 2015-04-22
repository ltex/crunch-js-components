'use strict'

var mocks = require('angular-mocks')

exports.registerModule = function() {
    var editableMod = require('../editable')
        ;

    angular.mock.module(editableMod().name)
}
