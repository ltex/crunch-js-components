;
module.exports = (function() {
    'use strict';

    function DatetimeFormatter(_, moment) {
        var strftimeFormats = {};

        function translateStrftimeToMoment(item) {
            var replacements = {
                '%%': '%'
                ,'%a': 'ddd'
                ,'%A': 'dddd'
                ,'%b': 'MMM'
                ,'%B': 'MMMM'
                ,'%c': 'LLLL'
                ,'%d': 'DD'
                ,'%j': 'DDDD'
                ,'%e': 'Do'
                ,'%m': 'MM'
                ,'%p': 'A'
                ,'%P': 'a'
                ,'%S': 'ss'
                ,'%M': 'mm'
                ,'%h': 'hh'
                ,'%H': 'HH'
                ,'%I': 'hh'
                ,'%w': 'd'
                ,'%W': 'WW'
                ,'%U': 'ww'
                ,'%x': 'LL'
                ,'%X': 'LT'
                ,'%y': 'YY'
                ,'%Y': 'YYYY'
                ,'%z': 'ZZ'
                ,'%Z': 'z'
                ,'%f': 'SSS'
            };
            if (item in replacements) {
                return ']' + replacements[item] + '['
            } else {
                return item
            }
        }
        moment.fn.__translateStrftimeToMoment =
            translateStrftimeToMoment;
        moment.fn.strftime = function(format) {
            if (!strftimeFormats[format]) {
                strftimeFormats[format] = '[' + format.replace(
                    /%?.|%%/g, translateStrftimeToMoment) + ']'
            }
            return this.format(strftimeFormats[format])
        };
        return function(value, format) {
            if (_.isUndefined(value) || _.isObject(value)) {
                return '\u2014'
            }
            if (_.isUndefined(format)) {
                return value
            }
            var time = moment.utc(value);
            return time.strftime(format)
        }
    }
    DatetimeFormatter.$inject = ['lodash', 'moment'];
    return DatetimeFormatter
})
    .call(this);
