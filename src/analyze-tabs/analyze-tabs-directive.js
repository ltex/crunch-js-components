'use strict'

module.exports = AnalyzeTabsDirective

function AnalyzeTabsDirective(AnalyzeTabs) {
    return {
        restrict : 'E'
        , templateUrl : '/analyze-tabs/analyze-tabs.html'
        , scope : {
            analysis : '='
        }
        , link : function($scope) {
            $scope.$watch('analysis.data.cube', function(cube) {
                $scope.analyzeTabs = AnalyzeTabs.create({
                    cube : cube
                })
            })
        }
    }
}

AnalyzeTabsDirective.$inject = [
    'AnalyzeTabs'
]