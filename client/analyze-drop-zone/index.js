'use strict'

module.exports = buildModule

function buildModule(modName) {
    var angular = require('angular')
        , mod = angular.module((modName || 'analyze-drop-zone'), [])
        ;

    mod.factory('lodash', function() {
        return require('lodash')
    })

    mod.factory('TypedDropZone', require('./typed-drop-zone'))
    mod.factory('NumericDropZone', require('./numeric-drop-zone'))
    mod.factory('CategoricalArrayDropZone', require('./categorical-array-drop-zone'))
    mod.factory('CategoricalDropZone', require('./categorical-drop-zone'))
    mod.factory('DatetimeDropZone', require('./datetime-drop-zone'))
    mod.factory('AnalyzeDropZone', require('./analyze-drop-zone'))
    mod.factory('dropZoneUtils', require('./drop-zone-utils'))
    mod.factory('dropZoneContentMediator', require('./drop-zone-content-mediator'))

    mod.controller('DropZoneContentCtrl', require('./drop-zone-content-ctrl'))

    mod.directive('dropZone',require('./drop-zone-directive'))
    mod.directive('dropZoneContent', require('./drop-zone-content-directive'))

    return mod
}
