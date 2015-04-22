'use strict'

var mocks = require('angular-mocks')
    ;

exports.registerModule = function() {
    //Leave for legacy support
}

exports.getShojiObj = function(rawData) {
    var shojiObj
        ;

    angular.mock.inject(function(Shoji) {
        shojiObj = Shoji(rawData.self).parse(rawData)
    })

    return shojiObj
}
