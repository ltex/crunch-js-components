;
module.exports = (function() {
    'use strict';

    function MarkDimensionsHelper() {
        function getBarThickness(barCount, theme) {
            var thickness
                , targetSliceHeight
                , barToMarginRatio
                , min
                , max;;
            targetSliceHeight = theme.slice.height;
            barToMarginRatio = theme.bar.toMarginRatio;
            min = theme.bar.thickness.min;
            max = theme.bar.thickness.max;
            thickness = targetSliceHeight * barToMarginRatio /
                barCount;
            if (thickness < min) {
                thickness = min
            } else if (thickness > max) {
                thickness = max
            }
            return thickness
        }

        function getBarMargin(barThickness, theme) {
            return barThickness * (1 - theme.bar.toMarginRatio)
        }

        function getSliceHeight(barThickness, barMargin, barsPerSlice) {
            var height;
            height = (barThickness + barMargin) * barsPerSlice;
            return height
        }

        function getChartHeight(sliceHeight, sliceCount, theme) {
            var padding
                , chartHeight;;
            padding = theme.slice.padding.y;
            if (sliceCount > 1) {
                chartHeight = (sliceHeight + padding) *
                    sliceCount
            } else {
                chartHeight = sliceHeight
            }
            return chartHeight
        }

        function getPadding(maxLabelWidth, theme) {
            return {
                top: theme.padding.top
                , bottom: theme.padding.bottom
                , left: theme.padding.left + maxLabelWidth
                , right: theme.padding.right
            }
        }

        function getSliceWidth(maxLabelWidth, theme) {
            return theme.chart.width - maxLabelWidth
        }

        function getChartWidth(maxLabelWidth, theme) {
            return theme.chart.width - maxLabelWidth
        }
        return {
            getChartHeight: getChartHeight
            , calculate: function(sliceCount, barsPerSlice, maxLabelWidth, theme) {
                var barThickness
                    , barMargin
                    , sliceHeight
                    , chartHeight;;
                barThickness = getBarThickness(barsPerSlice, theme);
                barMargin = getBarMargin(barThickness, theme);
                sliceHeight = getSliceHeight(barThickness, barMargin, barsPerSlice);
                chartHeight = getChartHeight(sliceHeight, sliceCount, theme);
                return {
                    bar: {
                        count: barsPerSlice
                        , thickness: barThickness
                        , margin: barMargin
                    }
                    , padding: getPadding(maxLabelWidth, theme)
                    , slice: {
                        count: sliceCount
                        , height: sliceHeight
                        , width: getSliceWidth(maxLabelWidth, theme)
                    }
                    , chart: {
                        height: chartHeight
                        , width: getChartWidth(maxLabelWidth, theme)
                    }
                }
            }
        }
    }
    MarkDimensionsHelper.$inject = [];
    return MarkDimensionsHelper
})
    .call(this);
