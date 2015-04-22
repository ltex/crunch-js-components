'use strict';

module.exports = GraphTimeplotDirective

GraphTimeplotDirective.$inject = [
    'd3'
    ,'CategoricalPalette'
    ,'chroma'
    ,'iFormatTimeplots'
    ,'d3tip'
]

// refactor part 0: just redo this service in a link fn
// part 1: parent service that prepares the figure (config)
// part 2: other directives to consume similar config

function GraphTimeplotDirective(d3, categoricalPalette, chroma, formatTime, d3tip){
    return {
        restrict: 'AE'
        ,scope: {
            config: '=config'
            ,analysis: '=analysis'
        }
        ,link: function(scope, element, attrs){
            var config = scope.config
            var analysis = config.analysis
            var dateKey = config.data.format.timeaxis
            var data = formatTime(
                config.data
                ,dateKey
                ,config.valueKey
            )
            var chartWidth = config.width
                ,chartHeight = config.height > 300 ? config.height-100 : config.height
                ,el = element[0]

            // sort the data by category
            var nestedData = d3.nest()
                .key(function(d) {
                    return d.key instanceof Array ? d.key.join('–') : d.key
                })
                .entries(data)

            var timeFormats = [
                [".%L", function(d) { return d.getMilliseconds(); }]
                ,[":%S", function(d) { return d.getSeconds(); }]
                ,["%I:%M", function(d) { return d.getMinutes(); }]
                ,["%I %p", function(d) { return d.getHours(); }]
                ,["%b %d", function(d) { return d.getDay() && d.getDate() != 1; }]
                ,["%b %d", function(d) { return d.getDate() != 1; }]
                ,["%b %d", function(d) { return d.getDate() != 1; }]
                ,["%B", function(d) { return d.getMonth(); }]
                ,["%Y", function() { return true; }]
            ]
            var timeVariable = config.data.format.variables[dateKey] // will be dimension in cube
            if(timeVariable.format == "%b %Y"){
                timeFormats = [
                    ["%b", function(d) { return d.getMonth()}]
                    ,["%Y", function() { return true; }]
                ]
            } else {
                var resolutions = ['us','s','m','h','D','W','M','Y']
                var resolution = resolutions.indexOf(timeVariable.resolution)
                //timeFormats[resolution][0] = timeVariable.format
                if(resolution > -1) {
                    timeFormats.splice(0, resolution)
                }
            }

            var uniqueCategories = nestedData.map(function(item){return item.key})
            // setup chart dimensions and margins
            var margin = {top: 20, right: 200, bottom: 50, left: 80},
                width = chartWidth - margin.left - margin.right,
                height = chartHeight - margin.top - margin.bottom

            var legendEl = document.createElement('div')
            el.appendChild(legendEl)

            legendEl.classList.add('legend-container')
            legendEl.style.height = height

            // our time axis
            var xScale = d3.time.scale()
                .range([0, width])

            // our vertical axis
            var yScale = d3.scale.linear()
                .range([height, 0])

            var colors = categoricalPalette(uniqueCategories.length, "diff")
            var catScale = d3.scale.ordinal().range(colors)

            function x(d){ return d.date }
            function y(d){ return d.value }

            // Given a category, this returns a hex color
            function color(d){
                return catScale(d)
            }

            // time ticks
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(5)
                .orient('bottom')
                .tickFormat(d3.time.format.multi(timeFormats))

            // vertical ticks
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .ticks(5)
                .orient('left')
                .tickFormat(d3.format('s'))

            // background grid
            var xGridAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(5)
                .tickSize(height, height, height)
                .orient('bottom')

            var yGridAxis = d3.svg.axis()
                .scale(yScale)
                .ticks(5)
                .tickSize(width, width, width)
                .orient('right')

            var line = d3.svg.line()
                .x(function(d) { return xScale(x(d)) })
                .y(function(d) { return yScale(y(d)) })

            // setup the range of categories
            catScale.domain(uniqueCategories)
            // setup the time range
            xScale.domain(d3.extent(data, x))
            // setup the vertical value range
            yScale.domain(d3.extent(data, y))

            // draw our svg
            var svg = d3.select(el).append('svg')
                .attr('class', 'timeplot')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            var legendTitle = d3.select(legendEl).append('svg')
                .attr('height', 25)
                .attr('width', margin.right)
                .append('g')
                .attr('transform', 'translate(-20, 0)')
            legendTitle.append('text')
                .attr('x',-20).attr('y',20) // -20 because of wrap +20
                .attr('class', 'legend-title column-title')
                .text(analysis.variables.valueOf()[0].name)
                    .call(wrap, margin.right, 1)
            legendTitle.append('line')
                .attr('x',0)
                .attr('y', 0)
                .attr('x2', margin.right)
                .attr('y2', 0)
                .attr('transform', 'translate(0,25)')
                .attr('class', 'legend-rule')

            var legendSVG = d3.select(legendEl).append('svg')
                .attr('height', nestedData.length * 20)
                .attr('width', margin.right)
                .append('g')
                .attr('transform', 'translate(0, 5)')

            legendEl.style.left = width + margin.left + 30
            // draw a legend item's container
            var legend = legendSVG.selectAll('g')
                .data(nestedData)
                .enter()
                .append('g')
                .attr('class', 'legend')

            // tooltip for legend items
            legend.append('title')
                .text(function(d){ return d.key })

            // draw the legend item's little colored square
            legend.append('rect')
                .attr('class', 'legend-square')
                .attr('x', 0)
                .attr('y', function(d, i){ return i *  20})
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', function(d) { return color(d.key) })

            // draw the legend item's text
            legend.append('text')
                .attr('x', 20) // this x is getting overwritten by the tspan that wrap uses
                .attr('y', function(d, i){ return (i *  20) + 9})
                .text(function(d){ return d.key })
                    .call(wrap, 200, 1);

            // invisible box for hovering over a legend item
            legend.append('rect')
                .attr('x', 0)
                .attr('y', function(d, i){ return (i * 20) - 5})
                .attr('width', margin.left + 60)
                .attr('height', 22)
                .style('fill', 'transparent')
                .on('mouseover', selectCategory)
                .on('mouseout', deselectCategories)

            // draw time ticks
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + (height + 10) + ')')
                .call(xAxis)

            // draw vertical ticks
            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(-10,0)')
                .call(yAxis)

            // draw background grid
            svg.append('g')
                .attr('class', 'x axis grid x-grid')
                .call(xGridAxis)
                .selectAll('text').remove()

            svg.append('g')
                .attr('class', 'y axis grid y-grid')
                .call(yGridAxis)
            // this group wraps each category's line and its points
            var category = svg.selectAll('.category')
                .data(nestedData)
                .enter()
                .append('g')
                .attr('class', 'category')
                .attr('d', function(d){ d.category = this}) // referencing itself so that
                                                            // the entire category group
                                                            // can be repositioned on
                                                            // hover (svg has no z-index)
            var valueTip = d3tip()
                .attr('class', 'timeplot-d3-tip')
                .offset([-9, 0])
                .html(function(d){
                    var out = d.key !== undefined ?
                    '<span style="color: '
                    + color(d.key)
                    + '">' + d.key
                    + "</span>: "
                    : ""
                    return out + displayNumber(y(d))
                })

                                            // appending the points before the line
                                            // so that the line can recieve the hover
            category.selectAll('.point')    // because the points loose their reference
                .data(function(d){          // to 'd.category'
                    return d.values         // <-- right here
                })                          // so we can't redraw the g when hovering points
                .enter()
                .append('circle')
                .attr('class', 'point')
                .attr('r', function(d) { return 4 })
                .style('fill', function(d) { return color(d.key) })
                .attr('cx', function(d) { return xScale(x(d)) })
                .attr('cy', function(d) { return yScale(y(d)) })
                .call(valueTip)
                .on('mouseover', valueTip.show)
                .on('mouseout', valueTip.hide)

            // draw the category's line
            category.append('path')
                .attr('class', 'line')
                .attr('d', function(d) { return line(d.values) })
                .attr('fill', 'none')
                .style('stroke', function(d) { return color(d.key) })

            function selectCategory(selected){

                function findColor(d){
                    var originalColor = color(d.key)
                    if (selected.key === d.key) {
                        return originalColor
                    }
                    var fadedColor = chroma.interpolate(originalColor, '#FFF', .75, 'hsl')
                    return fadedColor.hex()
                }

                // color the lines
                category.selectAll('.line')
                    .transition()
                    .style('stroke', function(d){
                        return findColor(d)
                    })
                // color the points
                category.selectAll('.point')
                    .transition()
                    .style('fill', function(d){
                        return findColor(d)
                    })

                // add inactive class to the lengend
                // and color the rect
                legend
                    .classed('inactive', function(d){
                        if (selected.key === d.key) {
                            return false
                        }
                        return true
                    })
                    .selectAll('.legend-square')
                        .transition()
                        .style('fill', function(d) {
                            return findColor(d)
                        })

                // place selected line on top of all the others
                selected.category.parentNode.appendChild(selected.category)

            }

            function deselectCategories(){
                // restore the original colors
                // for the lines, points, and legend
                category.selectAll('.line')
                    .transition()
                    .style('stroke', function(d){
                        return color(d.key)
                    })

                category.selectAll('.point')
                    .transition()
                    .style('fill', function(d){
                        return color(d.key)
                    })

                legend
                    .classed('inactive', false)
                    .selectAll('.legend-square')
                        .style('fill', function(d) {
                            return color(d.key)
                        })

            }
            function displayNumber(value){
                // if(isCount){
                //     return d3.format(',.0f')(value)
                // }
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
                    tspan = text.text(null).append('tspan').attr('x', 20).attr('y', y).attr('dy', dy + 'em');
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
}


/*
    -----------------------------
    Config for drawing Timeplots:
    -----------------------------

    config = {
        // Array of values representing each point on the chart
        data: [
            {
                // A JavaScript date object, representing
                // the points value on the x axis
                date: Date Object

                // Category used for grouping each line
                // a line for each unique key
                ,key: 'string'

                // Value representing the height of the
                // point on the y axis
                ,value: number
            }
        ]

        // A number representing the width in pixels that the
        // chart has available to do its thing
        ,chartWidth: number

        // A number representing the height in pixels that the
        // chart has available to do its thing
        ,chartHeight: number

        // A raw DOM Object for the chart to write to
        ,el: DOM Object
    }

*/
