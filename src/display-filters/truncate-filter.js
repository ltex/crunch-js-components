;
module.exports = (function() {
    'use strict';

    function TruncateFilter() {
        var defaultLength = 16;
        return function(input, length) {
            var cutoff = length ? length : defaultLength;
            var out = input.substring(0, cutoff);
            if (input.length > cutoff) {
                out += '\u2026'
            }
            return out
        }
    }
    TruncateFilter.$inject = [];
    return TruncateFilter
})
    .call(this);