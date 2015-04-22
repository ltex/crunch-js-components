'use strict';

IDrawStackedHistograms.$inject = [
    'd3'
]

/*
    --------------------------------------
    Config for drawing Stacked Histograms:
    --------------------------------------

    config = {
        data: {
            // Array of values that the chart uses to construct
            // its var0 and values.
            dataFrameTable: [
                {
                    // Value of the point/bar to display,
                    // also the height of each bin
                    // see valueKey below for more
                    ,[valueKey]: number

                    // Array of numbers marking each edge of
                    // the bars bins
                    ,bins: [number, number]

                    // Category used for grouping and labeling
                    // graphs (a histogram for every unique var1)
                    ,var1: 'string'
                }
            ]
        }
        // The key that the chart will use to find what value
        // from the dataFrameTable to use when building the chart
        // ie 'value_weighted' or 'value'
        ,valueKey: 'string'

        // A convenience boolean used for choosing the formatting
        // of displayed chart numbers, could be determined from the
        // valueKey above, but I thought it'd be easier to do this
        // once in the chart-directive and pass it to all the chart types
        ,isCount: boolean

        // A number representing the width in pixels that the
        // chart has available to do its thing, not currently
        // used because a fixed width was decided to be better
        // than calculating one based on the viewport
        ,chartWidth: number

        // A raw DOM Object for the chart to write to
        ,el: DOM Object
    }

*/

module.exports = IDrawStackedHistograms

function IDrawStackedHistograms(d3) {
    return function chart(config){

        var data = config.data
            ,valueKey = config.valueKey
            ,isCount = config.isCount
            ,chartWidth = config.width
            ,el = config.el

        el.innerHTML = ''

        var dataFrame = data.dataFrameTable.map(function(d){
            if(!d.hasOwnProperty('var1')){
                d.var1 = ''
                return d
            }
            return d
        })


        data = d3.nest()
            .key(function(d) { return d.var1 || ''})
            .entries(dataFrame)

        var verticalPadding = 50
            ,margin = {top: 30, right: 50, bottom: 30, left: 50}
            ,width = 700 - margin.left - margin.right
            ,height = (data.length * (200 + verticalPadding) + verticalPadding) - margin.top - margin.bottom
            ,tickHeight = height
            ,xMin = data[0].values[0].var0[0]
            ,xMax = data[0].values[data[0].values.length - 1].var0[1];

        function y(d){ return d[valueKey] }

        var xScale = d3.scale.linear()
            .domain([xMin, xMax])
            .range([0, width])

        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataFrame, y)])
            .range([200, 0])

        var xSliceAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(5)
            .tickSize(200, 200, 200)
            .orient('bottom')

        var ySliceAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(3)
            .tickSize(width, width, width)
            .tickPadding(7)
            .tickFormat(d3.format('s'))
            .orient('right')

        var ySliceLeftAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(3)
            .tickPadding(0)
            .tickFormat(d3.format('s'))
            .orient('left')

        var xTopAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(5)
            .tickFormat(d3.format('s'))
            .orient('top')

        var xBottomAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(5)
            .tickFormat(d3.format('s'))
            .orient('bottom')

        var svg = d3.select(el).append('svg')
            .attr('class', 'histogram')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var histogram = svg.selectAll('.histogram-slice')
            .data(data)
            .enter()
            .append('g')
              .attr('class', 'histogram-slice')
              .attr('transform', function(d, i){
                return 'translate(0,'+ ((200 + verticalPadding) * i + verticalPadding/2 ) +')'
              })

        histogram.append('rect')
            .attr('x', 0)
            .attr('height', 200)
            .attr('width', width)
            .attr('class', 'background')

        histogram.append('g')
            .attr('class', 'x grid axis')
            .call(xSliceAxis)

        histogram.append('g')
            .attr('class', 'y grid axis')
            .call(ySliceAxis)

        histogram.append('g')
            .attr('class', 'y axis')
            .call(ySliceLeftAxis)

        var bar = histogram.selectAll('.bar')
            .data(function(d){
              return d.values
            })
            .enter()
            .append('g')
            .attr('class', 'bar')
            .attr('transform', function(d) {
                return 'translate(' + xScale(d.var0[0]) + ',' + yScale(y(d)) + ')' })

        bar.append('rect')
            .attr('x', 1)
            .attr('width', function(){
              return xScale(data[0].values[0].var0[1]) })
            .attr('height', function(d) {
              return 200 - yScale(y(d)) })

        bar.append('title')
            .text(function(d) { return displayNumber(y(d)) || '' })

        histogram.append('rect')
            .attr('x', 1)
            .attr('y', 200)
            .attr('height', 1)
            .attr('width', width)
            .attr('class', 'baseline')

        svg.append('g')
            .attr('class', 'x axis')
            .call(xTopAxis)

        svg.append('g')
            .attr('class', 'x bottom axis')
            .attr('transform', 'translate(0, '+ (height - 12) +')')
            .call(xBottomAxis)

        histogram
            .append('text')
            .attr('class', 'label')
            .attr('y', 0)
            .attr('transform', 'translate(1, -9)')
            .text(function(d){ return d.key || '' })
                .call(wrap, width - 10, 1)
                .append('title').text(function(d){ return d.key || '' })

        function displayNumber(value){
            if(isCount){
                return d3.format(',.0f')(value)
            }
            return d3.format(',.2f')(value)
        }

        // adapted from bl.ocks.org/mbostock/7555321

        // This is kind of hacked at the moment
        // because we don't want multi-line breaks
        // and we don't want to translate the
        // possibly truncated lines
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
                tspan = text.text('').append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
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

    }
}
