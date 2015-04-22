;
module.exports = (function() {
    'use strict';
    var _ = require('lodash');

    function IMeasureLabels(svgTextUtil) {
        return {
            getMaxWidth: function(categories) {
                var options
                    , maxWidth
                    , labels;;
                options = {
                    fontSize: '12px'
                    , fontFamily: 'sans-serif'
                };
                maxWidth = svgTextUtil.getMaxTextWidth(categories, options);
                if (maxWidth === 0) {
                    maxWidth = 180
                }
                return maxWidth
            }
        }
    }
    IMeasureLabels.$inject = ['svgTextUtil'];
    return IMeasureLabels
})
    .call(this);