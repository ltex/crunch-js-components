;
module.exports = (function() {
    'use strict';
    var filterModule = require('../index');
    require('angular-mocks');
    describe('truncate filter', function() {
        beforeEach(function() {
            filterModule('filter.test');
            var mod = angular.module('test', [
                'filter.test'
            ]);
            angular.mock.module('test')
        });
        it('should have a truncate filter', inject(function(
            $filter) {
            expect($filter('truncate'))
                .not.to.equal(null)
        }));
        it('should truncate values and add an ellipse', inject(function($filter) {
                var truncator = $filter('truncate');
                expect(truncator('short'))
                    .to.equal('short');
                expect(truncator(
                    'I am very long indeed and should be cut off'
                ))
                    .to.equal('I am very long i\u2026');
                expect(truncator('Cut me off at 4', 4))
                    .to.equal('Cut \u2026')
            }))
    })
})
    .call(this);