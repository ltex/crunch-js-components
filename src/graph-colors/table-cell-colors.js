'use strict';

module.exports = TableCellColorFactory

TableCellColorFactory.$inject = ['chroma', 'd3', '$log']

function TableCellColorFactory(chroma, d3, $log){
    var TableCellColors = {
        getScale: function(params){
            // returns a divergent color scale from purple to green
            var params = params || {}
            var table = params.table || []
            var colors = params.colors || 'redGreen'
            colors = colors instanceof Array ?
                colors.map(d3.rgb)
                : this.colors[colors]

            var scalepos = d3.scale.threshold()
                .domain([0.001, 0.01, 0.05, 0.10])
                .range(this.colors.greenpart)
            var scaleneg = scalepos.copy().range(this.colors.redpart)
            return function(x) {
                return Math.sign(1/x) >= 0 ? scalepos(Math.abs(x)) : scaleneg(Math.abs(x))
            }
        }
        , 'colors': {
            purpleWhiteGreen : [
                d3.rgb(56,20,75)
                , d3.rgb("#efefef")
                , d3.rgb("#efefef")
                , d3.rgb(29,64,26)
                ]
            ,greenpart : ['#6e9876','#8dae93','#aec4b1','#ced9cf','#efefef']
            ,redpart : ['#d07975','#db9792','#e3b3b0','#ead1cf','#efefef']


        }
        , getSymmetricDomain: function(values){
            var maxAbs = d3.max(d3.extent(values).map(Math.abs))
            maxAbs = Math.max(15, maxAbs) // reduce emphasis for small values
            return [-maxAbs,-0,0,maxAbs]
        }
    }
    return TableCellColors
}
