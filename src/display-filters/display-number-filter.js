;
module.exports = (function() {
    'use strict';

    function DisplayNumberFilter(_, d3) {
        return function filter(value, digits, format) {
            if (_.isUndefined(value) || !_.isNumber(value) || isNaN(value) || !isFinite(value)) {
                return '\u2014'
            }
            if (!_.isUndefined(format)) {
                return d3.format(format)(value)
            }
            var val = d3.format(',.' + digits + 'f')(value);
            return val
        }
    }
    DisplayNumberFilter.$inject = ['lodash', 'd3'];
    return DisplayNumberFilter
})
    .call(this);
