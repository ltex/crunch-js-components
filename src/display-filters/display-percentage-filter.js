;
module.exports = (function() {
    'use strict';

    function DisplayPercentageFilter(_) {
        return function filter(pct, places) {
            if (_.isUndefined(places)) {
                places = 2
            }
            var multiplier = Math.pow(10, places);
            var pct = Number(pct);
            if (pct === 0) {
                return '0%'
            }
            if (pct < 1) {
                return '<1%'
            }
            if (_.isNaN(pct)) {
                return ''
            }
            var rounded = Math.round(pct * multiplier) /
                multiplier;

            return rounded.toFixed(places) + '%'
        }
    }
    DisplayPercentageFilter.$inject = ['lodash'];
    return DisplayPercentageFilter
})
    .call(this);