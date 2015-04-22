var displayFiltersModule = require('../index');
module.exports = (function() {
    'use strict';
    describe('always round counts', function() {
        beforeEach(function() {
            displayFiltersModule('displayfilters.test');
            angular.mock.module('displayfilters.test')
        });
        describe('when value is undefined', function() {
            it('should return the value', function() {
                var result;
                inject(function($filter) {
                    var digits = undefined;
                    var value = undefined;
                    result = $filter(
                        'alwaysRoundCounts')(
                        value, digits)
                });
                result.should.eql('\u2014')
            })
        });
        describe('when value is object', function() {
            it('should return the value', function() {
                var result;
                inject(function($filter) {
                    var digits = undefined;
                    var value = {
                        '?': 1
                    };
                    result = $filter(
                        'alwaysRoundCounts')(
                        value, digits)
                });
                result.should.eql('\u2014')
            })
        });
        describe('when value is count', function() {
            it('should be integer', function() {
                var result;
                inject(function($filter) {
                    var digits = undefined;
                    var value = 4.564589;
                    result = $filter(
                        'alwaysRoundCounts')(
                        value, 'count')
                });
                result.should.equal('5')
            })
        });
        describe('when value is not a count', function() {
            it('should round the value to that digits', function() {
                    var result;
                    inject(function($filter) {
                        var digits = 3;
                        var value = 4.567;
                        result = $filter(
                            'alwaysRoundCounts')(
                            value, 'value', digits)
                    });
                    result.should.equal('4.567')
                })
        });
        describe('when value >1000', function() {
            it('should be int with a comma', function() {
                var result;
                inject(function($filter) {
                    var value = 1000.1;
                    result = $filter(
                        'alwaysRoundCounts')(
                        value, 'count')
                });
                result.should.equal('1,000')
            })
        })
    })
})
    .call(this);