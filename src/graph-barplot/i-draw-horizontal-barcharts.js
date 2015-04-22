'use strict';

IDrawHorizontalBarcharts.$inject = [
    'd3'
    ,'d3tip'
]

/*
    --------------------------------
    Config for Horizontal Barcharts:
    --------------------------------

    config = {
        data: {
            // Array of values that the chart uses to construct
            // its bars and values.
            dataFrameTable: [
                {
                    // Name of the primary category, what each bar
                    // is describing, or the 'rows'
                    var0: 'string'

                    // Name of the secondary category, which is
                    // used for the slices of the chart, or the
                    // 'columns'
                    ,var1: 'string'

                    // Value of the point/bar to display,
                    // see valueKey below for more
                    ,[valueKey]: number
                }
            ]
            // Array of labels for each of the row (var0) variables
            ,rowLabels: ['string', 'other string']

            // Array of arrays, one for each row of column (var1)
            // labels, but this chart only concerns itself with the
            // first array
            ,columnLabelsArray: [
                ['string', 'other string']
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

module.exports = IDrawHorizontalBarcharts

function IDrawHorizontalBarcharts(d3, d3tip) {
    return function chart(config){

        var data = config.data
            ,valueKey = config.valueKey
            ,isCount = config.isCount
            ,chartWidth = config.width
            ,el = config.el
            ,maxNumberOfLines = 1

        el.innerHTML = ''

        var dataFrame = data.dataFrameTable.map(function(d){
            if (d.var1 instanceof Array){
                d.var1 = d.var1.map(displayNumber).join('–')
            }
            return d
        })

        var dataKey = valueKey

        var nestedData = d3.nest()
            .key(function(d) { return d.var1})
            .entries(dataFrame)
        var columnCats = nestedData.map(function(d){
            return d.key
        })

        var rowLabels = nestedData[0].values.map(function(d) {
            return d.var0
        })

        var panelWidth = 250

        var svg = d3.select(el).append('svg')
            .attr('class','horizontal-barchart')

        function findLabelWidth(labels){
            var maxWidth = 0
            labels.forEach(function(label){
                var width = findWidth(label)
                if (maxWidth < width){
                    maxWidth = width
                }
            })
            return maxWidth
        }

        function findWidth(text){
            var width
            var text = svg.append('text')
                .attr("x", 0).attr("y", 0)
                .attr('class', 'label-test')
                .text(text)

            width = text.node().getComputedTextLength()
            text.remove()

            return width
        }

        var marginWidth = findLabelWidth(rowLabels)
        var approxNumberOfLines = Math.ceil(d3.max(columnCats).length/28)
        var extraMarginForMultiLineLabels = approxNumberOfLines * 16
        // Set a max width for the labels so at least one panel
        // and part of the second is visible without scrolling
        if (marginWidth > chartWidth - panelWidth * 1.75 ){
            marginWidth = chartWidth - panelWidth * 1.75
        }
        // Set a minimum width for the label area
        if (marginWidth < chartWidth * .15){
            marginWidth = chartWidth * .15
        }

        var margin = {top: 50, right: 20, bottom: 30, left: marginWidth}

        var chartWidth = margin.left + (nestedData.length * (panelWidth * 1.05)) + margin.right

        var chartHeight = (rowLabels.length * 28 ) + margin.top + margin.bottom

        var width = chartWidth - margin.left - margin.right
        var height = chartHeight - margin.top - margin.bottom

        var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2)

        var xInnerScale = d3.scale.linear()
            .range([0, panelWidth * .85])

        var yScale = d3.scale.ordinal()

        function xInner(d){ return d[dataKey] }
        function y(d){ return d.var0 }

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('top')

        var xInnerAxis = d3.svg.axis()
            .scale(xInnerScale)
            .ticks(5)
            .tickSize(0, 0, 0)
            .orient('top')
            .tickFormat(d3.format('s'))

        var xGridAxis = d3.svg.axis()
            .scale(xInnerScale)
            .ticks(5)
            .tickSize(height, height, height)
            .orient('bottom')
            .tickFormat(d3.format('s'))

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')

        // entering the svg object, setting a proper width
        // and height now that we know the sizes we need
        svg = svg.attr('width', width + margin.left + margin.right)
                .attr('height', height + 20 + margin.top + margin.bottom + extraMarginForMultiLineLabels )
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        xScale.domain(columnCats)
        xInnerScale.domain([0, d3.max(data.dataFrameTable, xInner)])
        yScale.domain(rowLabels).rangeRoundBands([0, height], .1)

        svg.append('g')
            .attr('class', 'y axis row-labels')
            .attr('transform', 'translate(-' + xScale.rangeBand() * .5 + ', -20)')
            .attr('text-anchor', 'start')
            .call(xAxis)
                .selectAll('text')
                    .attr('text-anchor', 'start')
                    .attr('style', 'null')
                    .call(wrap, panelWidth * .85, 4)

        // The vertical labels
        svg.append('g')
              .attr('class', 'y axis')
              .attr('transform', 'translate(30,0)')
              .call(yAxis)
                .selectAll('text')
                    .call(wrap, marginWidth, 1)


        var panel = svg.selectAll('.panel')
            .data(nestedData)
            .enter().append('g')
                .attr('class', 'g')
                .attr('transform', function(d) {
                    return 'translate(' + xScale(d.key) + ', 0)'
                })

        panel.append('rect')
            .attr('class', 'panel-background')
            .style('fill','white')
            .attr('width', function(d){ return panelWidth * .95})
            .attr('height', function(d){ return height + margin.bottom + 20})
            .attr('x', - 12)
            .attr('y', - 20)

        panel.append('g')
            .attr('class', 'x grid axis')
            .call(xGridAxis) // background grid for the panel

        panel.append('g')
            .attr('class', 'x axis')
            .call(xInnerAxis) // horizontal ticks

        var valueTip = d3tip()
            .attr('class', 'h-bar-d3-tip')
            .offset([-10, 9])
            .direction('e')
            .html(function(d){
                return displayNumber(xInner(d))
            })

        panel.selectAll('.bar')
            .data(function(d) {
                return d.values;
            })
            .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('width', function(d){ return xInnerScale(xInner(d))})
                .attr('x', function(d) { return xInnerScale(0) })
                .attr('y', function(d) {
                    return yScale(y(d))
                })
                .attr('height', yScale.rangeBand())
                .call(valueTip)
                .on('mouseover', valueTip.show)
                .on('mouseout', valueTip.hide)

        var approxNumberOfLines = Math.ceil(d3.max(columnCats).length/28)

        var extraMarginForMultiLineLabels = approxNumberOfLines * 16

        svg.attr('height', height + 40 + margin.top + margin.bottom + extraMarginForMultiLineLabels*2)
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top + extraMarginForMultiLineLabels + 20) + ')')

        // adapted from bl.ocks.org/mbostock/7555321
        function wrap(text, width, maxLines) {
          text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr('y'),
                dy = parseFloat(text.attr('dy')),
                tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
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

            if(maxNumberOfLines < lineNumber) {
                maxNumberOfLines = lineNumber
            }

            // 16 here being em * lineHeight?
            text.attr('transform', 'translate(0, -'+ lineNumber * 16 +')')
          })
        }

        function displayNumber(value){
            if(isCount){
                return d3.format(',.0f')(value)
            }
            return d3.format(',.2f')(value)
        }

        return {
            xScale : xScale
            , chartWidth : panelWidth
            , margin : margin
            , rowLabels : rowLabels
            , columns : columnCats
        }
    }
}
