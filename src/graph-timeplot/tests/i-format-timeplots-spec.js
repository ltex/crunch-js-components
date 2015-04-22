var IFormatTimeplots = require('../i-format-timeplots')

module.exports = (function() {
    'use strict';
    describe('IFormatTimeplots', function() {
        describe('when given a dataframe', function() {
            var data
                , formattedData;
            beforeEach(function() {
                var data = {dataFrameTable:[
                    {value: 5, var1: '2001-03-14', var0:'test1'}
                    ,{value: 2, var1: '2001-03-14', var0:'test2'}
                    ,{value: 5, var1: '2001-03-15', var0:'test1'}
                    ,{value: 3, var1: '2001-03-15', var0:'test2'}
                ]}
                var dateKey = 'var1'
                var valueKey = 'value'
                var formatter = new IFormatTimeplots()
                formattedData = formatter(data, dateKey, valueKey)

            })
            it('should parse the dates and assign the proper keys and data values'
                , function() {
                var testData = [
                        {value: 5, date: new Date('2001-03-14'), key:'test1'}
                        ,{value: 2, date: new Date('2001-03-14'), key:'test2'}
                        ,{value: 5, date: new Date('2001-03-15'), key:'test1'}
                        ,{value: 3, date: new Date('2001-03-15'), key:'test2'}
                    ]
                formattedData.should.deep.eq(testData)
            })
            // Todo: add more tests for the time axis being var0 etc
        })
    })
}).call(this);