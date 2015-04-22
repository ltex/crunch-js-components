;
module.exports = (function() {
    'use strict';

    function DisplayDateFilter(datetimeFormatter) {
        return function filter(value, format) {
            if (format !== undefined && format.replace !== undefined) {
                return datetimeFormatter(value, format)
            }
            return value
        }
    }
    DisplayDateFilter.$inject = ['datetimeFormatter'];
    return DisplayDateFilter
})
    .call(this);