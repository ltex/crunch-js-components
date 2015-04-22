'use strict';

IDrawUngroupedBarcharts.$inject = [
    'lodash'
    ,'d3'
    ,'d3tip'
    ,'svgTextUtil'
    ,'cachedHierarchicalVariables'
]

/*

    -------------------------------
    Config for Ungrouped Barcharts:
    -------------------------------

    config = {
        data: {
            // Array of values that the chart uses to construct
            // its bars and values.
            dataFrameTable: [
                {
                    // Name of the category that this object is
                    // describing
                    var0: 'string'

                    // Value of the point/bar to display,
                    // see valueKey below for more
                    [valueKey]: number
                }
            ]
        }
        // The key that the chart will use to find what value
        // from the dataFrameTable to use when building the chart
        // ie 'count_weighted' or 'cellPct'
        ,valueKey: 'string'

        // A convenience boolean used for choosing the formatting
        // of displayed chart numbers, could be determined from the
        // valueKey above, but I thought it'd be easier to do this
        // once in the chart-directive and pass it to all the chart types
        ,isCount: boolean

        // A number representing the width in pixels that the
        // chart has available to do its thing
        ,chartWidth: number

        // A raw DOM Object for the chart to write to
        ,el: DOM Object
    }

*/


module.exports = IDrawUngroupedBarcharts

function IDrawUngroupedBarcharts(_, d3, d3tip, textUtil, cachedHierarchicalVariables) {
    return function chart(config){

        var data = config.data
            ,valueKey = config.valueKey
            ,isCount = config.isCount
            ,chartWidth = config.width
            ,el = config.el
            ,settings = config.settings
            ,analysis = config.analysis
        ;
        var hv = cachedHierarchicalVariables.current
        var rowVariable = data.variables.at(0)
        var rowTitle = hv.byId(rowVariable.self).fullName || ''
        var description = rowVariable.description
        el.innerHTML = ''

        var dataFrame = _.cloneDeep(data.dataFrameTable)
        function sortData() {
            var sorting = false
            if (settings.sortDirection.value == 0){
                dataFrame = _.cloneDeep(data.dataFrameTable)
                return
            }
            if (settings.sortVariable === undefined) {
                sorting = 'var0'
            } else if (settings.sortVariable === ""){
                sorting = valueKey
            }
            var comparator = {
                '-1' : d3.descending
                ,'1' : d3.ascending
            }
            if(!!sorting){
                dataFrame = dataFrame.sort(function(a,b){
                    return comparator[settings.sortDirection.value](a[sorting], b[sorting])
                })
            }
        }
        // sortData() // data come in sorted
        var barHeightScale = d3.scale.linear().domain([1,16]).range([36, 16])
        var barHeight = dataFrame.length > 16 ? 16 : barHeightScale(dataFrame.length)
        var chartHeight = dataFrame.length * barHeight


        var category = 'var0'

        function x(d) { return d[valueKey] }
        function y(d) { return d[category] }

        var leftSize = textUtil.getMaxWidth(dataFrame.map(y))
        var titleWidth = textUtil.measure([rowTitle], {fontWeight: 'bold'})
        leftSize = d3.max([leftSize, titleWidth])
        var marginWidth = +leftSize + 26
        var titleHeight = 16

        if (titleWidth > chartWidth / 3 ){
            marginWidth = chartWidth /3
            titleHeight = 32
        }

        if (marginWidth < chartWidth * .2){
            marginWidth = chartWidth * .2
        }

        var margin = {top: 20+titleHeight, right: 20, bottom: 60, left: +marginWidth}

        // Add some margin at the top if there is a special column title
        // if (config.hasOwnProperty('columnTitle')){
        //     margin.top = 60
        // }

        var width = chartWidth - margin.left - margin.right
        var height = chartHeight - margin.top + margin.bottom

        function setupAxes(cfg){
            xTopAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(5)
                .tickSize(0, 0, 0)
                .orient('top')

            xGrid = d3.svg.axis()
                .scale(xScale)
                .ticks(5)
                .tickSize(chartHeight, chartHeight, chartHeight)

            xAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(5)
                .tickSize(0, 0, 0)
                .orient('bottom')

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
        }
        var xAxis, yAxis, xTopAxis, xGrid;

        var root = d3.select(el).append('svg')
            .attr('class', 'ungrouped-barchart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

        var svg = root.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        function addRowLabel(){
            var rowtitle = root.append('g')
                .attr('width', margin.left)
                .attr('height', margin.top)
                .attr('transform', 'translate('+15+','+20+')')
                .attr('class', 'row-labels')
            rowtitle.append('rect')
                .attr('width', margin.left)
                .attr('height', titleHeight)
                .attr('x', -20)
                .attr('y', -titleHeight+5)
                .attr('title', "Sort by value")
            rowtitle
                .append('line')
                .attr('x', 0)
                .attr('y', 0)
                .attr('x2', margin.left-26)
                .attr('y2', 0)
                .attr('transform', 'translate(0,'+(+titleHeight-16+5)+')')
                .attr('class', 'legend-rule')
            rowtitle
                .append('text')
                .text(rowTitle)
                .call(wrap, marginWidth-20, 2)
            rowtitle.on('click', function(){
                var nextDirection = descendingFirstDirection[settings.sortDirection.value]
                    settings.sortVariable = undefined
                    settings.sortSource = 'labels'
                    settings.sortDirection.value = nextDirection
                    //updateSort()
                })
                .on('mouseover',function(){
                    d3.select(this).classed({'hovered':true})
                })
                .on('mouseout',function(){
                    d3.select(this).classed({'hovered':false})
                })

        }
        if(!!rowTitle && !!rowTitle.length){
            addRowLabel()
        }
        var yScale = d3.scale.ordinal()
            .rangeRoundBands([0, chartHeight], .2)
        var yScalePoints = d3.scale.ordinal()
            .rangeRoundPoints([0, chartHeight], .2)

        var xScale = d3.scale.linear()
        .range([0, width])

        xScale.domain([0, d3.max(dataFrame, x)])
        yScale.domain(dataFrame.map(y))
        setupAxes()

        // if there is a column title, add it
        if (config.hasOwnProperty('columnTitle')){
            svg.append('g')
                .attr('class', 'column-label')
                .attr('transform', 'translate(0, -'+ margin.top / 2 +')')
                .append('text')
                    .text(config.columnTitle)
        }

        svg.append('g')
            .attr('class', 'x axis bottom-axis')
            .attr('transform', 'translate(0,' + chartHeight + ')')
            .call(xAxis);
        var grid = svg.append('g')
            .attr('class', 'x axis axis-grid grid')
            .attr('transform', 'translate(0,' + 0 + ')')
            .call(xGrid);
        grid.selectAll('text').remove()
        var topaxisg = svg.append('g')
            .attr('class', 'x axis top-axis')
            .attr('transform', 'translate(0,' + 0 + ')')
        topaxisg.append('rect')
            .attr('width', width)
            .attr('height', 14)
            .attr('opacity', 0)
            .attr('transform', 'translate(-5,-14)')
        topaxisg.call(xTopAxis);

        var descendingFirstDirection = {
                '-1' : 1
                , '0' : -1
                , '1' : 0
            }
        var ascendingFirstDirection = {
            '-1' : 0
            , '0' : 1
            , '1' : -1
        }
        function updateSort(){
            sortData()
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
            yScale.domain(dataFrame.map(y))
            svg.selectAll('.y.axis')
                .transition().duration(250)
                .call(yAxis)
            svg.selectAll('.bar-group')
                .data(dataFrame)
                .transition()
                .duration(250)
                .delay(function(d, i) { return i * 10 })
                .selectAll('rect')
                .attr('y', function(d) {
                    return yScale(y(d))
                })

        }
        svg.selectAll('.x.axis')
            .on('click', function(){
                var nextDirection = descendingFirstDirection[settings.sortDirection.value]
                settings.sortKey = dataFrame[0].var1
                settings.sortSource = 'bodyCols'
                settings.sortDirection.value = nextDirection
                //updateSort()
            })
            .on('mouseover', function(){
                d3.select(this).classed({'hovered':true})
            })
            .on('mouseout', function(){
                d3.select(this).classed({'hovered':false})
            })

        svg.append('g')
            .attr('transform', 'translate(0,' + 0 + ')')
            .attr('class', 'y axis')
            .call(yAxis)

        var valueTip = d3tip()
            .attr('class', 'h-bar-d3-tip')
            .offset([-10, 9])
            .direction('e')
            .html(function(d){
                return displayNumber(x(d))
            })

        var bars = svg.selectAll('.bar-group')
            .data(dataFrame)

        bars.enter().append('g')
            .attr('class', 'bar-group')
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function(d) { return xScale(0) })
            .attr('width', function(d) { return xScale(x(d)) })
            .attr('y', function(d) { return yScale(y(d)) })
            .attr('height', yScale.rangeBand() )


        svg.selectAll('.bar-group')
            .call(valueTip)
            .on('mouseover', valueTip.show)
            .on('mouseout', valueTip.hide)

        function displayNumber(value){
            if(isCount){
                return d3.format(',.0f')(value)
            }
            return d3.format(',.2f')(value)
        }
        function wrap(text, width, maxLines) {
            text.each(function() {
                var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr('y'),
                dy = parseFloat(text.attr('dy')) || 0,
                tspan = text.text('').append('tspan').attr('x', y).attr('y', y).attr('dy', dy + 'em');
                while (word = words.pop()) {
                    line.push(word)
                    tspan.text(line.join(" "))
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop()
                        tspan.text(line.join(" "))
                        line = [word]
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word)
                        if (lineNumber >= maxLines){
                            tspan.remove()
                            text.append('tspan').text('…')
                        }
                    }
                }
                if (lineNumber >= maxLines){
                    lineNumber = maxLines - 1
                }
                // 16 here being em * lineHeight?
                //text.attr('transform', 'translate(0, -'+ lineNumber * 16 +')')
            })
        }

        return {
            margin : margin
            , xScale : xScale
            , chartWidth : width
        }
    }
}
