;
module.exports = (function() {
    'use strict';

    function AlwaysRoundCounts(displayNumberFilter, _) {
        return function filter(input, digits, type) {
            if (_.isUndefined(type) || type === 'count') {
                return displayNumberFilter(input, 0)
            } else if (type === 'hundreds'){
                return 100
            } else if (type === 'emdash'){
                return '\u2014'
            } else {
                return displayNumberFilter(input, digits)
            }
        }
    }
    AlwaysRoundCounts.$inject = ['displayNumberFilter', 'lodash'];
    return AlwaysRoundCounts
})
    .call(this);
