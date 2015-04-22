;
module.exports = (function() {
    'use strict';

    function SVGTextUtil(_, d3) {
        var defaults = {
            fontWeight: 'normal'
            , fontFamily: 'AvenirLTStd'
            , fontSize: '14px'
        };

        function appendSVG() {
            return d3.select('body')
                .append('svg:svg')
                .attr('width', 0)
                .attr('height', 0)
                .style('position', 'absolute')
                .style('left', '-9999px')
                .style('top', '-9999px')
        }

        function getTextStyle(settings) {
            var textStyle = '';
            textStyle += settings.fontWeight;
            textStyle += ' ' + settings.fontSize;
            textStyle += ' ' + settings.fontFamily;
            return textStyle
        }

        function appendText(svg, text, settings) {
            return svg.append('svg:text')
                .attr('x', 0)
                .attr('y', 0)
                .style('font', getTextStyle(settings))
                .text(text)
        }

        function getTextBoundingBox(textNode) {
            return textNode.node()
                .getBBox()
        }

        function renderTextAndGetBoundingBox(svg, text, settings) {
            var text = appendText(svg, text, settings)
                ,bbox = getTextBoundingBox(text);
            text.remove();
            return bbox
        }

        function getTextWidth(svg, text, settings) {
            var bbox = renderTextAndGetBoundingBox(svg, text, settings);
            return bbox.width
        }
        function measure(textArray, options) {
            if(!textArray instanceof Array){
                textArray = [textArray]
            }
            var svg = appendSVG()
            var settings = _.defaults(options || {}, defaults);
            return textArray.map(function(text){
                if (typeof text !== 'string') {
                    throw new Error(
                        'Not all values in the array were strings'
                    )
                }
                return getTextWidth(svg, text, settings)
            })
        }

        return {
            getMaxWidth: function(textArray, options) {
                return d3.max(measure(textArray, options))
            }
            ,measure: measure
        }
    }
    SVGTextUtil.$inject = ['lodash', 'd3'];
    return SVGTextUtil
})
    .call(this);
