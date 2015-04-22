'use strict'

function AnalyzeContextCtrl($scope, iFetchHierarchicalVariables, analyzeContextManager, xtabFactory, tableCellColors, signin) {
    this.init = function() {
        var params = {
                datasetId : secrets.dataset
                , primaryVariableId : secrets.variables[0]
            }
            , settings
            ;

        signin.apply(signin, secrets.credentials)
            .then(function() {
                return iFetchHierarchicalVariables({
                    datasetId : secrets.dataset
                })
            })
            .then(function(variables) {
                $scope.variables = variables
                analyzeContextManager.handle('initialize', params)

                $scope.settings = settings = analyzeContextManager.viewSettings
                $scope.scale = settings.colorScale = tableCellColors.getScale()

                $scope.analyzeContextManager = analyzeContextManager
                $scope.analysesTray = analyzeContextManager.analysesTray

                setupEvents()
            })
    }

    this.visible = true

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
        })
    }
}

AnalyzeContextCtrl.$inject = [
    '$scope'
    , 'iFetchHierarchicalVariables'
    , 'analyzeContextManager'
    , 'xtabFactory'
    , 'tableCellColors'
    , 'signin'
]

app.controller('AnalyzeContextCtrl', AnalyzeContextCtrl)