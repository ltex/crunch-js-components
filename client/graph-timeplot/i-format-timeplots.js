'use strict';
module.exports = IFormatTimeplots

IFormatTimeplots.$inject = []

function IFormatTimeplots(){

    return function(data, dateKey, valueKey){

        var dataFrame = data.dataFrameTable

        var formattedData = []
        function parseDate(dateString){
            return new Date(dateString)
        }
        dataFrame.forEach(function(d, i){
            var date = dateKey
            var key = (dateKey === 'var0') ? 'var1' : 'var0'

            var point = {
                value: d[valueKey]
                ,date: parseDate(d[date])
                ,key: d[key]
            }
            if (!d.var0){
                if (valueKey === 'value' || valueKey === 'value_weighted')
                    point.key = 'Mean'
            }
            if (d[key] === undefined){
                point.key = "Value"
            }

            formattedData.push(point)
        })
        return formattedData

    }

}
