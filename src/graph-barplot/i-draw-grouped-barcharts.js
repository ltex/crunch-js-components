'use strict';

IDrawGroupedBarcharts.$inject = [
    'd3'
    ,'chroma'
    ,'CategoricalPalette'
    ,'d3tip'
]

/*
    -----------------------------
    Config for Grouped Barcharts:
    -----------------------------

    config = {
        data: {
            // Array of values that the chart uses to construct
            // its bars and values.
            dataFrameTable: [
                {
                    // Name of the category that is used for the
                    // groupings of the chart, or the 'rows'
                    var0: 'string'

                    // Name of the secondary category, what each
                    // bar is describing, or the 'columns'
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

module.exports = IDrawGroupedBarcharts

function IDrawGroupedBarcharts(d3, chroma, categoricalPalette, d3tip) {
    return function chart(config){

        var data = config.data
            ,valueKey = config.valueKey
            ,isCount = config.isCount
            ,chartWidth = config.width
            ,el = config.el

        el.innerHTML = ''

        var primaryVar = 'var0'
        var secondaryVar = 'var1'
        var dataFrame = data.dataFrameTable.map(function(d){
            if (d[secondaryVar] instanceof Array){
                d[secondaryVar] = d[secondaryVar].join('—')
            }
            return d
        })
        var primaryCats = data.rowLabels

        var nestedData = d3.nest()
            .key(function(d) { return d[primaryVar]})
            .entries(dataFrame)
        var secondaryCats = nestedData[0].values.map(function(d){
            return d[secondaryVar]
        })

        var primaryMaxCharacter = d3.max(dataFrame.map(function(d){
            return d[primaryVar] ? d[primaryVar].length : 0
        }))
        var secondaryMaxCharacter = d3.max(dataFrame.map(function(d){
            return d[secondaryVar] ? d[secondaryVar].length : 0
        }))

        var marginWidth = (primaryMaxCharacter * 9 ) + 15

        if (marginWidth < (secondaryMaxCharacter * 8 ) + 35 ){
            marginWidth = (secondaryMaxCharacter * 8) + 35
        }

        if (marginWidth > chartWidth - 230 ){
            marginWidth = chartWidth - 230
        }

        if (marginWidth < chartWidth * .2){
            marginWidth = chartWidth * .2
        }

        var barHeight = 24
        var band = secondaryCats.length * barHeight
        var bandPadding = (barHeight * 2 ) + 2
        var chartHeight = primaryCats.length * (band + bandPadding)

        var margin = {top: 20, right: 20, bottom: 20, left: marginWidth}
        var width = chartWidth - margin.left - margin.right
        var height = chartHeight - margin.top - margin.bottom

        var xScale = d3.scale.linear()
            .range([0, width])

        var yScale = d3.scale.ordinal()

        var uniqueCategories = nestedData.map(function(item){return item.key})
        var colors = categoricalPalette(secondaryCats.length, "diff")
        var catScale = d3.scale.ordinal().range(colors)
        //chroma.interpolate.bezier(['#6B8028','#CADB90'])

        function x(d){ return d[valueKey] }
        function y(d){ return d[secondaryVar] }

        // Given a category, this returns a hex color
        function color(d){
            return catScale(d)
        }

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(5)
            .tickSize(0, 0, 0)
            .orient('top')

        var xGridAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(5)
            .tickSize(chartHeight, chartHeight, chartHeight)
            .orient('bottom')

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')

        var svg = d3.select(el).append('svg')
            .attr('class','grouped-barchart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', chartHeight + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        xScale.domain([0, d3.max(dataFrame, x)])
        catScale.domain(secondaryCats).range(colors)
        yScale.domain(secondaryCats).rangeRoundBands([0, band])

        svg.append('g')
            .attr('class', 'x axis')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'x grid axis')
            .call(xGridAxis)

        var primaryCategory = svg.selectAll('.primary-cat')
            .data(nestedData)
            .enter().append('g')
                .attr('class', 'g')
                .attr('transform', function(d, i) {
                    return 'translate(0,' + (band + bandPadding) * i + ')' })

        primaryCategory.append('text')
            .attr('class', 'primary-labels')
            .attr('transform', 'translate(-10, '+ bandPadding * .25 +')')
            .text(function(d){ return d.key })

        primaryCategory.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(-10,'+ (bandPadding - barHeight) +')')
            .call(yAxis)

        primaryCategory.selectAll('.g')
            .data(function(d) { return d.values })
            .enter()
            .append('g').attr('class', 'bar')
            .append('rect')
                .attr('width', function(d){ return xScale(x(d))})
                .attr('x', function(d) { return 0 })
                .attr('y', function(d) { return yScale(y(d)) + (bandPadding - barHeight) })
                .attr('height', yScale.rangeBand())
                .style('fill', function(d) { return color(y(d)) })

        var valueTip = d3tip()
            .attr('class', 'h-bar-d3-tip')
            .offset([-10, 9])
            .direction('e')
            .html(function(d){
                var out = d.key !== undefined ?
                '<span style="color: '
                + color(y(d))
                + '">' + x(d)
                + "</span>: "
                : ""
                return out + displayNumber(x(d))
            })
        primaryCategory.selectAll('.bar')
            .call(valueTip)
            .on('mouseover', valueTip.show)
            .on('mouseout', valueTip.hide)

        function displayNumber(value){
            if(isCount){
                return d3.format(',.0f')(value)
            }
            return d3.format(',.2f')(value)
        }

    }
}
