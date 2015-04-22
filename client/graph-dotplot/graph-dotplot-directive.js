'use strict';

module.exports = GraphDotplotDirective

GraphDotplotDirective.$inject = [
    'd3'
    ,'CategoricalPalette'
    ,'chroma'
    ,'show'
    ,'d3tip'
    ,'cachedHierarchicalVariables'
]

function GraphDotplotDirective(d3, categoricalPalette, chroma, show, d3tip, cachedHierarchicalVariables){
    // possibly TODO: inject HVL to do fullName for labeling
    return {
        restrict: 'AE'
        ,scope: {
            config: '=config'
        }
        ,link: function(scope, element, attrs){
            var show = show
            var config = scope.config
            var viewportWidth = config.width
                ,chartWidth = config.width
                ,el = config.el
            // this obj location will change; config.data is an 'xtab'
            // its 'analysis' property holds the query, settings, and cube.
            var tab = scope.config.data.analysis.tabulated
            var dataFrame = scope.config.dataFrameTable
            // this is different and poorly named. this is the currentAnalysis fsm:
            var analysis = scope.config.analysis
            var labels = tab.margins.labels
            var isCount = false
            var nDims = analysis.variables.count()
            var hv = cachedHierarchicalVariables.current

            var rowTitle = !!analysis.variables.at(0) ?  hv.byId(analysis.variables.at(0).self).fullName : ''
            var colors = categoricalPalette(nDims > 1 ?
                Math.max(labels[1].length,10) : 1, "diff")

            function x(d) { return d.value }
            function y(d) { return d.var0 }
            function color(d) { return colorScale(d.var1) }
            function group(d) { return d.var1 }

            var points = scope.config.data.dataFrameTable

            points = points.filter(function(d){
                return !isNaN(d.value)
            })
            var data = d3.nest()
                .key(y)
                .entries(points)

            var groupedData = d3.nest()
                .key(group)
                .entries(points)

            var leftSpacing = points.map(function(d){
                return d.var0 ? d.var0.length : 0
            })
            leftSpacing.push(rowTitle ? rowTitle.length : 0)
            var labelMaxChars = d3.max(leftSpacing)
            var groupMaxChars = d3.max(points.map(function(d){
                return d.var1 ? d.var1.length : 0
            }))


            // if (marginWidth < (secondaryMaxCharacter * 8 ) + 35 ){
            //     marginWidth = (secondaryMaxCharacter * 8) + 35
            // }

            if (marginWidth > chartWidth - 230 ){
                marginWidth = chartWidth - 230
            }

            if (marginWidth < chartWidth * .3){
                marginWidth = chartWidth * .3
            }

            var uniqueLabels = data.map(function(item){return item.key})
            var rowHeight = 24
            var chartHeight = uniqueLabels.length * rowHeight
            var viewportHeight = config.height
            var marginWidth = (labelMaxChars * 9 ) + 15 // eep! measure this..
            var marginTop = 20 + 16 * !!rowTitle
            var margin = {top: marginTop, right: 200, bottom: 20, left: marginWidth}
            var width = chartWidth - margin.left - margin.right
            var height = chartHeight - margin.top - margin.bottom

            var xScale = d3.scale.linear().range([0, width])
            var yScale = d3.scale.ordinal()
            var colorScale = d3.scale.ordinal().range(colors)

            function padDomain(array){
                var r = d3.extent(array, x)
                if(array.length===1){
                    var mag = Math.floor(Math.log2(r[0]))
                    var span = mag > 0 ? mag*10 : r[0]
                } else {
                    var span = Math.sqrt(Math.pow(r[1],2) + Math.abs(r[0],2))
                }
                var ext = .03*span
                return [r[0]-ext, r[1]+ext]
            }
            xScale.domain(padDomain(points)).nice()
            colorScale.domain(labels[1]).range(colors)
            yScale.domain(uniqueLabels).rangePoints([0, chartHeight], 1.0)

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(5)
                .tickSize(0, 0, 0)
                .orient('top')

            var yGrid = d3.svg.axis()
                .scale(yScale)
                .tickSize(-width, 0, 0)
                .orient('left')
                .tickFormat('')

            var xGrid = d3.svg.axis()
                .scale(xScale)
                .ticks(5)
                .tickSize(chartHeight, 0, 0)
                .orient('bottom')
                .tickFormat('')

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .tickSize(3,0,0)

            var root = d3.select(el).append('svg')
                .attr('class','dotplot')
                .attr('width', width + margin.left + margin.right)
                .attr('height', chartHeight + margin.top + margin.bottom)

            var svg = root.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            function addRowLabel(){
                var rowtitle = root.append('g')
                    .attr('width', margin.left)
                    .attr('height', margin.top)
                    .attr('transform', 'translate('+15+','+20+')')
                    .attr('class', 'row-labels')

                rowtitle
                    .append('line')
                    .attr('x',0)
                    .attr('y', 0)
                    .attr('x2', margin.left-26)
                    .attr('y2', 0)
                    .attr('transform', 'translate(0,5)')
                    .attr('class', 'legend-rule')
                rowtitle
                    .append('text')
                    .text(rowTitle)
            }
            if(!!rowTitle && !!rowTitle.length){
                addRowLabel()
            }

            svg.append('g')
                .attr('class', 'x-axis')
                .call(xAxis);

            svg.append('g')
                .attr('class', 'x-grid')
                .call(xGrid)

            svg.append('g')
                .attr('class', 'y-axis')
                .attr('transform', 'translate(-8,0)')
                .call(yAxis)
            svg.append('g')
                .attr('class', 'y-grid')
                .call(yGrid)

            var primaryCategory = svg.selectAll('.primary-labels')
                .data(data)
                .enter().append('g')
                    .attr('class', 'g')
                    .attr('transform', function(d, i) {
                        return 'translate(0,0)' })


            var dots = primaryCategory.selectAll('.g')
                .data(function(d) { return d.values })
                .enter()
                .append('g')
                .attr('class', 'group')
                .append('g')
                .append('circle')
                    .attr('cx', function(d){ return xScale(x(d))})
                    .attr('cy', function(d) { return yScale(y(d)) })
                    .attr('r', 4)
                    .style('fill', function(d) { return color(d) })
                    .attr('class', 'points')
                    .attr('d', function(d){ d.self = this}) // referencing itself so that
                                                                // the entire category group
                                                                // can be repositioned on
                                                                // hover (svg has no z-index)
            var valueTip = d3tip()
                .attr('class', 'dotplot-d3-tip')
                .offset([-9, 0])
                .html(function(d){
                    var out = d.var1 !== undefined ?
                    '<span style="color: '
                    + colorScale(d.var1)
                    + '">' + d.var1
                    + "</span>: "
                    : ""
                    return out + displayNumber(x(d))
                })

            primaryCategory.selectAll('.points')
                .call(valueTip)
                .on('mouseover', valueTip.show)
                .on('mouseout', valueTip.hide)
            // .append('title')
            //     .text(function(d) { return displayNumber(x(d)) })

            if(groupedData.length > 1){
                drawLegend()
            }

            function drawLegend(){
                var legendEl = document.createElement('div')
                el.appendChild(legendEl)

                legendEl.classList.add('legend-container')
                legendEl.style.height = Math.max(chartHeight, viewportHeight)

                var legendTitle = d3.select(legendEl).append('svg')
                    .attr('height', 25)
                    .attr('width', margin.right)
                    .append('g')
                    .attr('transform', 'translate(-20, 0)')
                legendTitle.append('text')
                    .attr('x',-20).attr('y',20) // -20 because of wrap +20
                    .attr('class', 'legend-title column-title')
                    .text(analysis.variables.at(1).name)
                        .call(wrap, margin.right, 1)
                legendTitle.append('line')
                    .attr('x',0)
                    .attr('y', 0)
                    .attr('x2', margin.right)
                    .attr('y2', 0)
                    .attr('transform', 'translate(0,25)')
                    .attr('class', 'legend-rule')


                var legendSVG = d3.select(legendEl).append('svg')
                    .attr('height', groupedData.length * 20 +25)
                    .attr('width', margin.right)
                    .append('g')
                    .attr('transform', 'translate(0, 25)')

                legendEl.style.left = width + margin.left + 30
                // draw a legend item's container
                var legend = legendSVG.selectAll('g')
                    .data(groupedData)
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
                    .style('fill', function(d) { return colorScale(d.key) })

                // draw the legend item's text
                legend.append('text')
                    .attr('x', 20) // this x is getting overwritten by the tspan that wrap uses
                    .attr('y', function(d, i){ return (i *  20) + 9})
                    .text(function(d){ return d.key })
                        .call(wrap, margin.right - 40, 1);

                // invisible box for hovering over a legend item
                legend.append('rect')
                    .attr('x', 0)
                    .attr('y', function(d, i){ return (i * 20) - 5})
                    .attr('width', margin.left + 60)
                    .attr('height', 22)
                    .style('fill', 'transparent')
                    .on('mouseover', selectCategory)
                    .on('mouseout', deselectCategories)
            }
            function selectCategory(selected){

                function findColor(d){
                    var originalColor = colorScale(d.var1 || d.key)
                    if (selected.key === (d.var1 || d.key)) {
                        return originalColor
                    }
                    var fadedColor = chroma.interpolate(originalColor, '#FFF', .75, 'hsl')
                    return fadedColor.hex()
                }

                d3.selectAll('.points')
                    .transition()
                    .style('fill', function(d){
                        return findColor(d)
                    })

                // add inactive class to the lengend
                // and color the rect
                var legend = d3.selectAll('.legend')
                    .classed('inactive', function(d){
                        if ((selected.key || selected.var1) === d.key) {
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
                //selected.group.parentNode.appendChild(selected.group)

            }

            function deselectCategories(){
                d3.selectAll('.points')
                    .transition()
                    .style('fill', function(d){
                        return colorScale(d.var1 || d.key)
                    })

                d3.selectAll('.legend')
                    .classed('inactive', false)
                    .selectAll('.legend-square')
                        .transition()
                        .style('fill', function(d) {
                            return colorScale(d.var1 || d.key)
                        })

            }

            function displayNumber(value){
                if(isCount){
                    return d3.format(',.0f')(value)
                }
                return d3.format(',.2f')(value)
            }

            // adapted from bl.ocks.org/mbostock/7555321
            // and copied from timeplot directive
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
