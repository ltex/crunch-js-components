var displayFiltersModule = require('../index');
module.exports = (function() {
    'use strict';
    describe('viewFilters module', function() {
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
                        'displayNumber')(value, digits)
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
                        'displayNumber')(value, digits)
                });
                result.should.eql('\u2014')
            })
        });
        describe('when value has no digits', function() {
            it('should return the value', function() {
                var result;
                inject(function($filter) {
                    var digits = undefined;
                    var value = 4.564589;
                    result = $filter(
                        'displayNumber')(value, digits)
                });
                result.should.equal('4.564589')
            })
        });
        describe('when value has digits', function() {
            it('should round the value to that digits', function() {
                    var result;
                    inject(function($filter) {
                        var digits = 3;
                        var value = 4.564589;
                        result = $filter(
                            'displayNumber')(value, digits)
                    });
                    result.should.equal('4.565')
                })
        });
        describe('when value >1000', function() {
            it('should have a comma', function() {
                var result;
                inject(function($filter) {
                    var value = 1000;
                    result = $filter(
                        'displayNumber')(value)
                });
                result.should.equal('1,000')
            })
        });
        describe('arbitrary format specifiers work', function() {
            it('such as hex', function() {
                var result;
                inject(function($filter) {
                    var value = 15;
                    result = $filter(
                        'displayNumber')(value, undefined, 'x')
                });
                result.should.equal('f')
            })
        })
    })
})
    .call(this);