var displayFiltersModule = require('../index');
module.exports = (function() {
    'use strict';
    describe('displayPercentageFilter', function() {
        beforeEach(function() {
            displayFiltersModule('displayfilters.test');
            angular.mock.module('displayfilters.test')
        });
        describe('given a value [0,100]', function() {
            it('should format with two decimal places', function() {
                    var result;
                    inject(function($filter) {
                        result = $filter(
                            'displayPercentage')(1.23456)
                    });
                    expect(result)
                        .to.equal('1.23%')
                })
        });
        describe('given value and digits', function() {
            it('should round', function() {
                var result;
                inject(function($filter) {
                    result = $filter(
                        'displayPercentage')(33, 0)
                });
                expect(result)
                    .to.equal('33%')
            })
        });
        describe('very small nonzero value', function() {
            it('should be displayed as <1%', function() {
                var result;
                inject(function($filter) {
                    result = $filter(
                        'displayPercentage')(0.9823, 0)
                });
                expect(result)
                    .to.equal('<1%')
            })
        });
        describe('but if actually exactly 0,', function() {
            it('should be 0%', function() {
                var result;
                inject(function($filter) {
                    result = $filter(
                        'displayPercentage')(0, 0)
                });
                expect(result)
                    .to.equal('0%')
            })
        })
    })
})
    .call(this);