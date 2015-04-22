'use strict';

module.exports = buildModule

function buildModule(moduleName) {

    var angular = require('angular')

    var mod = angular.module(moduleName || 'variables-accordion',[])


    mod.factory('lodash', function() {
        return require('lodash')
    })



    mod.directive('variablesAccordion',require('./variables-accordion-directive'))
    mod.directive('hierarchicalGroup',require('./hierarchical-group-directive'))
    mod.directive('hierarchicalTopLevelItem', require('./hierarchical-top-level-item-directive'))
    mod.directive('hierarchicalItem', require('./hierarchical-item-directive'))
    mod.directive('hierarchicalNestedGroup', require('./hierarchical-nested-group-directive'))
    mod.directive('hierarchicalVariable',require('./hierarchical-variable-directive'))
    mod.directive('scalarVariable',require('./scalar-variable-directive'))
    mod.directive('compositeVariable',require('./composite-variable-directive'))
    mod.directive('behavioralVariable',require('./behavioral-variable-directive'))
    mod.filter('shouldDisplayHeader',require('./display-header-filter'))


    mod.run(function($templateCache){
        var fs = require('fs')

        if (fs.readFile) {
            var fileToTemplateCache = function (key, fn) {

                fs.readFile(fn, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err)
                    }
                    $log.log('here')
                    console.log('here')
                    console.log(data)
                    $templateCache.put(key, '' + data)

                })
            }
            fileToTemplateCache('/variables-accordion/variables-accordion.html', './variables-accordion.html')
            fileToTemplateCache('/variables-accordion/composite-variable.html', './composite-variable.html')
            fileToTemplateCache('/variables-accordion/scalar-variable.html', './scalar-variable.html')
            fileToTemplateCache('/variables-accordion/hierarchical-nested-group.html', './hierarchical-nested-group.html')
        }
        })

    return mod
}
