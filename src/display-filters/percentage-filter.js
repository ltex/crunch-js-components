;
module.exports = (function() {
    'use strict';

    function PercentageFilter(_, format) {
        return function filter(amt, of, places, suppressFormat) {
            if (_.isUndefined(places)) {
                places = 2
            }
            if (of === 0) {
                return ''
            }

            if(_.isUndefined(of)) {
                of = 1
            }

            var pct = Number(amt) / Number(of) * 100;
            return suppressFormat ? pct : format(pct, places)
        }
    }
    PercentageFilter.$inject = ['lodash', 'displayPercentageFilter'
    ];
    return PercentageFilter
})
    .call(this);
