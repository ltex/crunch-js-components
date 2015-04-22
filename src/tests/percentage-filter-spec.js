var displayFiltersModule = require('../index');
module.exports = (function() {
    'use strict';
    describe('viewFilters module percentage filter', function() {
        beforeEach(function() {
            displayFiltersModule('displayfilters.test');
            angular.mock.module('displayfilters.test')
        });
        describe('given value and a total', function() {
            it('should calculate as percent', function() {
                var result;
                inject(function($filter) {
                    result = $filter('percentage')
                    (1, 2)
                });
                expect(result)
                    .to.equal('50.00%')
            })
        });
        describe('given value, total, and digits', function() {
            it('should round', function() {
                var result;
                inject(function($filter) {
                    result = $filter('percentage')
                    (1, 3, 0)
                });
                expect(result)
                    .to.equal('33%')
            })
        });
        describe('very small nonzero value', function() {
            it('should be displayed as <1%', function() {
                var result;
                inject(function($filter) {
                    result = $filter('percentage')
                    (1, 101, 0)
                });
                expect(result)
                    .to.equal('<1%')
            })
        });
        describe('but if actually exactly 0,', function() {
            it('should be 0%', function() {
                var result;
                inject(function($filter) {
                    result = $filter('percentage')
                    (0, 100, 0)
                });
                expect(result)
                    .to.equal('0%')
            })
        });
        describe('but very small nonzero value', function() {
            it(
                'should be suppressed (and be a number) if suppressFormat is true', function() {
                    var result;
                    inject(function($filter) {
                        result = $filter('percentage')
                        (1, 200, 0, true)
                    });
                    expect(result)
                        .to.equal(0.5)
                })
        })
    })
})
    .call(this);