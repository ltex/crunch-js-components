var datetimeModule = require('../index');
module.exports = (function() {
    'use strict';
    describe('datetimeFormatter', function() {
        beforeEach(function() {
            var mod = datetimeModule('datetime.test');
            angular.mock.module('datetime.test')
        });
        describe(
            'when given a datestring and a format string', function() {
                it(
                    'should return the correctly formatted date', function() {
                        var result;
                        inject(function(datetimeFormatter) {
                            var value = '2014-04-14';
                            var format = '%m/%d/%Y';
                            result = datetimeFormatter(
                                value, format)
                        });
                        result.should.eql('04/14/2014')
                    })
            });

        function testStrftime(format, formatted_value) {
            var testDate = '2012-01-18T01:54:20.620Z';
            it('should format "' + format + '" as "' +
                formatted_value + '"', function() {
                    var result;
                    inject(function(datetimeFormatter) {
                        result = datetimeFormatter(
                            testDate, format)
                    });
                    result.should.eql(formatted_value)
                })
        }
        describe('when given valid strftime tokens', function() {
            testStrftime('%a', 'Wed');
            testStrftime('%A', 'Wednesday');
            testStrftime('%b', 'Jan');
            testStrftime('%B', 'January');
            testStrftime('%c', 'Wednesday, January 18 2012 1:54 AM');
            testStrftime('%d', '18');
            testStrftime('%H', '01');
            testStrftime('%I', '01');
            testStrftime('%j', '018');
            testStrftime('%m', '01');
            testStrftime('%M', '54');
            testStrftime('%p', 'AM');
            testStrftime('%S', '20');
            testStrftime('%U', '03');
            testStrftime('%w', '3');
            testStrftime('%W', '03');
            testStrftime('%x', 'January 18 2012');
            testStrftime('%X', '1:54 AM');
            testStrftime('%y', '12');
            testStrftime('%Y', '2012');
            testStrftime('%Z', 'UTC');
            testStrftime('%%', '%')
        });
        describe(
            'when given strftime tokens with characters to escape', function() {
                testStrftime('%Y Week %W', '2012 Week 03');
                testStrftime('%Y W%W', '2012 W03');
                testStrftime('Year%Y %mmonth', 'Year2012 01month');
                testStrftime('Words words words  %Y%Ywords', 'Words words words  20122012words')
            });
        describe('when given only a datestring', function() {
            it('should return the original datestring', function() {
                    var result;
                    inject(function(datetimeFormatter) {
                        var value = '2014-04-14';
                        result = datetimeFormatter(
                            value)
                    });
                    result.should.eql('2014-04-14')
                })
        });
        describe('when not given a value', function() {
            it('should return an em dash', function() {
                var result;
                inject(function(datetimeFormatter) {
                    result = datetimeFormatter()
                });
                result.should.eql('\u2014')
            })
        });
        describe('when given a missing object', function() {
            it('should return an em dash', function() {
                var result;
                var missingObj = {
                    '?': -1
                };
                inject(function(datetimeFormatter) {
                    result = datetimeFormatter(
                        missingObj)
                });
                result.should.eql('\u2014')
            })
        })
    })
})
    .call(this);