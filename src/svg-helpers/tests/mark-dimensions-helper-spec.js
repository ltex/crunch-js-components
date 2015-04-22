;
module.exports = (function() {
    'use strict';
    describe.skip('Vega Barchart Spec Generator', function() {
        var subject
            , themeGenerator
            , theme;;
        beforeEach(function() {
            subject = new BarchartSpecGenerator();
            themeGenerator = new ThemeGenerator('default');
            theme = themeGenerator.create()
        });
        describe('#getVegaConfig', function() {
            describe(
                'the marks property of the returned Vega spec', function() {
                    describe(
                        'when passed data for a 1d chart', function() {
                            var config
                                , marks;;
                            beforeEach(function() {
                                var viewSettings = {
                                    viewMode: 'graph'
                                    , countOrPercent: 'percent'
                                    , weightedOrUnweighted: 'unweighted'
                                    , includeZero: true
                                    , decimalPlaces: 0
                                };
                                config = subject.getVegaConfig(
                                    data_1d, theme, viewSettings);
                                marks = config.marks
                            });
                            it(
                                'should be an array of one object', function() {
                                    expect(marks)
                                        .to.be.an('array');
                                    expect(marks)
                                        .to.have.length(1)
                                });
                            describe(
                                'the first object in the marks array', function() {
                                    var markObject;
                                    beforeEach(function() {
                                        markObject =
                                            marks[0]
                                    });
                                    it(
                                        'should have the right structure', function() {
                                            expect(
                                                markObject
                                            )
                                                .to.have.keys(
                                                    [
                                                        'type', 'from', 'properties', 'marks', 'axes'
                                                    ])
                                        });
                                    it(
                                        'should get its data from g_slice', function() {
                                            expect(
                                                markObject
                                                .from.data
                                            )
                                                .to.equal(
                                                    'g_slice'
                                            )
                                        });
                                    describe(
                                        'the nested marks object', function() {
                                            it(
                                                'should be an array of 3 objects', function() {
                                                    expect(
                                                        markObject
                                                        .marks
                                                    )
                                                        .to
                                                        .be
                                                        .an(
                                                            'array'
                                                    );
                                                    expect(
                                                        markObject
                                                        .marks
                                                    )
                                                        .to
                                                        .have
                                                        .length(
                                                            3
                                                    )
                                                })
                                        })
                                })
                        });
                    describe(
                        'when passed data for a 2d chart', function() {})
                })
        })
    })
})
    .call(this);