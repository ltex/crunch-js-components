;
module.exports = (function() {
    'use strict';

    function DisplayLabelFilter() {
        return function filter(text) {
            // NOTE return to this and do a proper search for \u2013
            // currently this doesn't work and 202f is added elsewhere.
            return text.replace('\u2013', '\u202f\u2013\u202f')
        }
    }
    DisplayLabelFilter.$inject = []
    return DisplayLabelFilter
}).call(this);
