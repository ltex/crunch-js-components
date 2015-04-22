'use strict'

module.exports = AnalyzeContextCtrl

function AnalyzeContextCtrl($scope, analyzeContextManager, xtabFactory, tableCellColors, deck, bus, $stateParams) {
    this.init = function() {
        var datasetContext = $scope.datasetContext
            , params = {
                datasetId : datasetContext.currentDatasetId
                , primaryVariableId : datasetContext.primaryVariableId
                , retainPreviousState : $stateParams.retainPreviousState
            }
            , settings
            ;

        deck.handle('initialize', params)
        analyzeContextManager.handle('initialize', params)

        settings = analyzeContextManager.viewSettings

        $scope.analyzeContextManager = analyzeContextManager
        $scope.analysesTray = analyzeContextManager.analysesTray
        $scope.settings = settings

        settings.colorScale = tableCellColors.getScale()
        $scope.scale = settings.colorScale

        $scope.$on('context.changing', function() {
            analyzeContextManager.handle('pause')
            bus.publish({
                event : 'primaryVariableId.update'
                , variableId : analyzeContextManager.primaryVariableId
            })
        })

        $scope.$on('$destroy', function() {
            analyzeContextManager.handle('pause')
            $scope.analysesTray.handle('close')
            analyzeContextManager.off('analysis.changed')
            analyzeContextManager.off('settings.changed')
        })

        setupEvents()
    }

    function setupEvents() {
        analyzeContextManager.on('analysis.changed', initData)
        analyzeContextManager.on('settings.changed', initData)
    }

    function initData() {
        var analysis = $scope.analysis = analyzeContextManager.currentAnalysis

        $scope.xtab = null

        xtabFactory.getXtab({
            analysis : analysis
            , settings : analyzeContextManager.viewSettings
        }).then(function(xtab) {
            $scope.xtab = xtab
            $scope.$broadcast('stickyHeaders.refresh')
        })
    }
}

AnalyzeContextCtrl.$inject = [
    '$scope'
    , 'analyzeContextManager'
    , 'xtabFactory'
    , 'tableCellColors'
    , 'deck'
    , 'bus'
    , '$stateParams'
]
