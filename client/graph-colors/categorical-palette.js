'use strict';

module.exports = CategoricalPalette

CategoricalPalette.$inject = ['chroma', 'd3', '$log']

function CategoricalPalette(chroma, d3, $log){
    // Given a number of categories, draw from an interleaved
    // array of the 3 base brand colors
    function mediumPalette(n) {
        var result = Array.apply(null, {length: n}).map(Number.call, Number)
        var baseColors = ["#0165a4", "#107f56", "#722580"]
        var each = Math.floor(n/3)
        each += (n % 3 > 0)

        var scales = baseColors.map(function(c) {
            var base = d3.hcl(c)
            if(c=="#722580"){
                base = d3.hcl(base.h+70, base.c-20, base.l+20)
            }
            var target = d3.hcl(base.h+100, base.c+20, base.l+20)
            var scale = d3.scale.linear()
                .domain([0,each])
                .range([c, target.toString()])
                .interpolate(d3.interpolateHcl)
            return scale
        })

        return result.map(function(x) {
            return scales[x % 3](Math.floor(x/3)).toString()
        })
    }
    function largePalette(n){
        var result = Array.apply(null, {length: n}).map(Number.call, Number)
        var c1 = chroma(60,60,20, 'lch')
        var c2 = chroma(60,60,130, 'lch')
        var c3 = chroma(60,60,275, 'lch')
        var c4 = chroma(60,60,310, 'lch')
        var scale=chroma.scale([c1, c2, c3, c4])
            .domain([0,n])
            .out('hex')
            .mode('lch')

        return result.map(function(x){
            return scale(x)
        })
    }
    function blueToOrange(n){
        return chroma.interpolate.bezier(['blue','orange'])
    }
    function getColorDistance(a, b){
        a = d3.lab(a)
        b = d3.lab(b)
        var dl = a.l-b.l
        var da = a.a-b.a
        var db = a.b-b.b
        return Math.sqrt(Math.pow(dl, 2)+Math.pow(da, 2)+Math.pow(db, 2))
    }
    function sortColors(unsorted){
        var sorted = [unsorted.shift()] // start off with first
        while(unsorted.length > 0){
            var index = -1
            var maxDistance = -1
            for(var next=0; next < unsorted.length; ++next){
                var d = 10000000
                for(var i=0; i < sorted.length; ++i){
                    var nextdistance = getColorDistance(unsorted[next], sorted[i])
                    d = Math.min(d, nextdistance)
                }
                if(d > maxDistance){
                    maxDistance = d
                    index = next
                }
            }
            sorted.push(unsorted[index])
            unsorted.splice(index, 1)
        }
        return sorted
    }

    return function(n, opts){
        if(typeof opts === 'Object'){
            return opts.palette(n)
        }
        if(opts === "diff"){
            return sortColors(mediumPalette(n))
        }
        if (n>20){
            return largePalette(n)
        }
        else {
            return mediumPalette(n)
        }
    }
}
