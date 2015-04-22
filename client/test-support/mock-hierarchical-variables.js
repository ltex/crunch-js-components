'use strict'

var mocks = require('angular-mocks')
    , mockShoji = require('./mock-shoji')
    ;

exports.registerModule = function() {
    angular.mock.module('hierarchical-variables')
}

exports.getHierarchicalVariablesObj = function(dataset, catalogs, order) {
    var hierarchicalVariables
        , getShojiObj = mockShoji.getShojiObj
        ;

    catalogs = (catalogs instanceof Array) ? catalogs : [catalogs]

    angular.mock.inject(function(VariableCatalogList, HierarchicalVariables) {
        var varCatalogs = new VariableCatalogList(catalogs.map(getShojiObj))
            ;

        hierarchicalVariables = new HierarchicalVariables(varCatalogs, getShojiObj(order))
    })

    return hierarchicalVariables
}
