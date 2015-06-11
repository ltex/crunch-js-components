'use strict'

module.exports = AnalyzeTabsDirective

function AnalyzeTabsDirective(AnalyzeTabs, $timeout) {
    return {
        restrict : 'E'
        , templateUrl : '/analyze-tabs/analyze-tabs.html'
        , scope : {
            analysis : '='
        }
        , link : function($scope, $el) {
            $scope.$watch('analysis.data.cube', function(cube) {
                $scope.analyzeTabs = AnalyzeTabs.create({
                    analysis : $scope.analysis
                })

                $timeout(function() {
                    calculateCanGoBack()
                    calculateCanGoForward()
                },50)
            })

            $scope.moveBackward = function() {
                var $tabsContainer = $el.find('ul.tabs-container')
                    , x = $tabsContainer.position().left
                    , parentWidth = $tabsContainer.parent().width()
                    , newX = (-x) > parentWidth ? (x + parentWidth) : 0
                    ;

                $tabsContainer.css('left', newX)

                $timeout(function() {
                    calculateCanGoBack()
                    calculateCanGoForward()
                },350)
            }

            $scope.moveForward = function() {
                var $tabsContainer = $el.find('ul.tabs-container')
                    , x = $tabsContainer.position().left
                    , width = $tabsContainer.width()
                    , parentWidth = $tabsContainer.parent().width()
                    , hiddenSpace = (x + width) - parentWidth
                    , newX = hiddenSpace > parentWidth ? parentWidth : hiddenSpace
                    ;

                $tabsContainer.css('left', (-newX))

                $timeout(function() {
                    calculateCanGoBack()
                    calculateCanGoForward()
                },350)
            }

            function calculateCanGoBack() {
                $scope.canGoBack = $scope.analyzeTabs.enabled &&
                        $el.find('ul.tabs-container').position().left < 0
            }

            function calculateCanGoForward() {
                var $tabsContainer = $el.find('ul.tabs-container')
                    , x = ($tabsContainer.position() || {}).left
                    , width = $tabsContainer.width()
                    , parentWidth = $tabsContainer.parent().width()
                    ;

                $scope.canGoForward = $scope.analyzeTabs.enabled &&
                    (x + width) > parentWidth
            }
        }
    }
}

AnalyzeTabsDirective.$inject = [
    'AnalyzeTabs'
    , '$timeout'
]