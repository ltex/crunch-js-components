;
module.exports = (function() {
    'use strict';
    var angular = require('angular')
        ,_ = require('lodash');;

    function buildModule(moduleName) {
        var mod = angular.module(moduleName || 'filters', []);
        mod.factory('lodash', function() {
            return _
        });
        mod.controller('eligibleVariable', require(
            './eligible-variable-ctrl'));
        mod.factory('applyFilterHandler', require(
            './apply-filter-handler'));
        mod.factory('removeFilterHandler', require(
            './remove-filter-handler'));
        mod.factory('replaceFilterHandler', require(
            './replace-filter-handler'));
        mod.factory('editFilterHandler', require(
            './edit-filter-handler'));
        mod.factory('expressionBuilders', require(
            './expression-builder-factory'));
        mod.factory('evalFilter', require('./eval-filter-factory'));
        mod.factory('filterCompiler', require(
            './filter-expression-compiler'));
        mod.factory('filterDecompiler', require(
            './filter-expression-decompiler'));

        mod.factory('BaseExpressionBuilder', require('./base-expression-builder'));

        mod.factory('expression', require(
            './expression'
        ))
        mod.factory('categoricalExpressionBuilder', require(
            './categorical-expression-builder'));
        mod.factory('numericExpressionBuilder', require(
            './numerical-expression-builder'));
        mod.factory('textExpressionBuilder', require(
            './text-expression-builder'));
        mod.factory('multipleResponseExpressionBuilder', require(
            './multiple-response-expression-builder'));
        mod.factory('datetimeExpressionBuilder', require(
            './datetime-expression-builder'));


        mod.factory('ShareFilter', require('./share-filter'))
        mod.factory('FilterBuilder', require('./filter-builder'))
        mod.factory('Filter', require('./filter'))
        mod.directive('filterBuilder', require('./filter-builder-directive'))
        mod.directive('shareFilter', require('./share-filter-directive'))

        return mod
    }

    return buildModule
})
    .call(this);
