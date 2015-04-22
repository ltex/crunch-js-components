'use strict';

ChartDirective.$inject = [
    '$window'
    ,'$compile'
    ,'iDrawUngroupedBarcharts'
    ,'iDrawGroupedBarcharts'
    ,'iDrawHorizontalBarcharts'
    ,'iDrawStackedHistograms'
]

module.exports = ChartDirective

function ChartDirective($window, $compile, drawUngroupedBarcharts, drawGroupedBarcharts, drawHorizontalBarcharts, drawStackedHistograms) {
    return {
        restrict: 'E'
        ,scope: {
            data: '=xtab' // the xtab object, maybe pruned
            ,settings: '='
            ,analysis: '='
        }
        ,templateUrl : '/analyze-chart/chart.html'
        ,link: function(scope, element, attrs) {
            var $elm = $('<div></div>').appendTo(element.find('.bivariate-graph'))
                , elm = $elm.get(0)
                ;

            $elm.addClass('chart')

            draw()

            function draw(){
                if (!!!scope.data){ return false }
                    var valueKey = 'value'
                    var height = $window.innerHeight - element.offset().top - 150
                    var config = {
                        data: scope.data
                        ,valueKey: 'value'
                        ,isCount: scope.settings.countsOrPercents.value === 'count'
                        ,width: elm.offsetWidth - 60
                        ,height: height > 300 ? height : 300
                        ,el: elm
                        ,analysis: scope.analysis
                    }
                    //console.log($window.innerHeight, element.offset().top)
                ;

                if (config.data.graph === 'timeplot') {
                    var dateKey = config.data.format.timeaxis
                    config.analysis = scope.analysis
                    // if all the data is at only one point in time,
                    // show a univariate bar graph
                    if (dateKey === 'var1' && config.data.colLabels.length === 1
                        || dateKey === 'var0' && config.data.rowLabels.length === 1) {
                        config.columnTitle = config.data.colLabels[0]
                        drawUngroupedBarcharts(config)

                    } else {
                        // otherwise just show the usual timeplot
                        scope.config=config
                        elm.innerHTML = ''
                        var timeplot = $elm.append('<graph-timeplot config="config"></graph-timeplot>')
                        $compile(timeplot)(scope)
                    }
                }
                if (config.data.graph === 'dotplot') {
                    scope.config=config
                    elm.innerHTML = ''
                    var dotplot = $elm.append('<graph-dotplot config="config"></graph-dotplot>')
                    $compile(dotplot)(scope)
                }
                if (config.data.graph === 'barchart') {
                    config.settings = scope.settings
                    if(config.data.variables.count() === 1){
                        drawUngroupedBarcharts(config)
                    } else {
                        // otherwise show a sliced or grouped barchart
                        if (scope.settings.slicesOrGroups.value === 'slices') {
                            drawHorizontalBarcharts(config)
                        }
                        if (scope.settings.slicesOrGroups.value === 'groups') {
                            drawGroupedBarcharts(config)
                        }
                    }

                }
                if (config.data.graph === 'histogram') {
                    drawStackedHistograms(config)
                }
            } // draw

            scope.$on('settings.changed', draw)
            scope.$watch('data', function(){
                draw()
            })

        }
    }
}
