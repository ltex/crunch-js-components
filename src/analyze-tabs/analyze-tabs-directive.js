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

                recalculate(50)
            })

            $scope.moveBackward = function() {
                var $tabsContainer = $el.find('ul.tabs-container')
                    , x = $tabsContainer.position().left
                    , parentWidth = $tabsContainer.parent().width()
                    , newX = (-x) > parentWidth ? (x + (parentWidth / 2)) : 0
                    ;

                $tabsContainer.css('left', newX)
                recalculate()
            }

            $scope.moveForward = function() {
                var $tabsContainer = $el.find('ul.tabs-container')
                    , x = $tabsContainer.position().left
                    , width = $tabsContainer.width()
                    , parentWidth = $tabsContainer.parent().width()
                    , hiddenSpace = (x + width) - parentWidth
                    , newX = hiddenSpace > parentWidth ? x - (parentWidth / 2) : x - hiddenSpace
                    ;

                $tabsContainer.css('left', newX)
                recalculate()
            }

            function recalculate(timeout) {
                $timeout(function() {
                    calculateCanGoBack()
                    calculateCanGoForward()
                },(timeout || 350))
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