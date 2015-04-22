;
module.exports = (function() {
    'use strict';
    describe.skip('Label Helper', function() {
        describe('#getMaxLabelWidth', function() {
            describe(
                'when a categories array is provided', function() {
                    it('should return a max width', function() {
                            var categories = ['a', 'ab', 'abc'
                            ];
                            var width = labelHelper.getMaxWidth(
                                categories);
                            expect(width)
                                .to.be.a('number')
                        })
                });
            describe(
                'special case for numeric variable workaround', function() {
                    it('should return a max width of 180', function() {
                            var categories = [];
                            var width = labelHelper.getMaxWidth(
                                categories);
                            expect(width)
                                .to.equal(180)
                        })
                })
        })
    })
})
    .call(this);