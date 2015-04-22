;
module.exports = (function() {
    'use strict';
    var mainModule = require('../index')
        ,mocks = require('angular-mocks');;
    describe('SVG Text Util', function() {
        var svg;
        beforeEach(function() {
            mainModule('svg.test');
            angular.mock.module('svg.test')
        });
        describe('#getMaxWidth', function() {
            var textArray1;
            var textArray2;
            beforeEach(function() {
                textArray1 = ['a', 'abc'];
                textArray2 = ['abc', 'abcabc'];
                inject(function(svgTextUtil) {
                    svg = svgTextUtil
                })
            });
            it('should return max width as a number', function() {
                    var maxWidth1 = svg.getMaxWidth(
                        textArray1);
                    expect(maxWidth1)
                        .to.be.a('number')
                });
            xit(
                'should calculate max width based on string lengths', function() {
                    var maxWidth1 = svg.getMaxWidth(
                        textArray1);
                    var maxWidth2 = svg.getMaxWidth(
                        textArray2);
                    expect(2 * Math.round(maxWidth1),1)
                        .to.equal(Math.round(maxWidth2,1))
                });
            it(
                'should use the options provided in teh calculation', function() {
                    var maxWidth1 = svg.getMaxWidth(
                        textArray1);

                    function testOptions(options) {
                        var maxWidth2 = svg.getMaxWidth(
                            textArray1, options);
                        expect(maxWidth2)
                            .not.to.equal(maxWidth1)
                    }
                    testOptions({
                        fontSize: '18px'
                    });
                    testOptions({
                        fontWeight: 'bold'
                    });
                    testOptions({
                        fontFamily: 'monospace'
                    })
                });
            it(
                'should throw an error if not given an array of strings', function() {
                    var mixedArray = [{}
                        , 'abc', 123
                    ];
                    var fn = function() {
                        svg.getMaxWidth(mixedArray)
                    };
                    expect(fn)
                        .to.
                    throw (
                        'Not all values in the array were strings'
                    )
                })
        })
    })
})
    .call(this);
