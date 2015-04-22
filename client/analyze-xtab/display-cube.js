'use strict';

module.exports = DisplayCubeFactory

DisplayCubeFactory.$inject = [
    'cube'
    ,'iResourceVariable'
    ,'ndarray'
    ,'ndarrayUnpack'
    ,'lodash'
    ,'$q'
    ,'$log'
    ,'datetimeFormatter'
    , '$filter'
    , 'tableCellColors'
    , 'svgTextUtil'
    , 'stats'
    , 'ndarrayOps'
    , 'ndarrayScratch'
    , 'Tabulated'
]

function DisplayCubeFactory(Cube
    , iResourceVariable
    , ndarray
    , unpack
    , _
    , $q
    , $log
    , datetimeFormatter
    , $filter
    , tableCellColors
    , svgTextUtil
    , stats
    , ndarrayOps
    , scratch
    , Tabulated
){

    function dtypeToStrf(d){
        var strf = {
            's': ':%S',
            'm': '%H:%M',
            'h': '%H:00',
            'D': '%d %b %Y',
            'W': '%Y W%W',
            'M': '%b %Y',
            'Y': '%Y',
        }
        return strf[d] || "%Y-%m-%d"
    }

    function prepareCrosstab(cube, params){
        var settings = params.settings
        var variables = params.analysis.variables
        var types = variables.getTypes()
        var dimTypes = cube._dimensions.map(function(d){return d.type})
        var comparisons = params.comparisons || []
        var axis =
            settings.percentageDirection.value === 'rowPct' ? 0 :
                settings.percentageDirection.value === 'colPct' ? 1 : undefined

        var colLabels = ['Count']
        var pValues;
        var weighted = !!cube.weightId

        if (settings.countsOrPercents.value === 'percent') {
            colLabels = ['Percent']
        }



        var hasArray = variables.hasArrays()

        var result = {
            id: _.uniqueId("t")
            ,variables: variables
            ,template: '/tables/crosstab.html'
            ,preCols: []
            ,postCols: []
            ,preRows: []
            ,postRows: []
            ,rowLabels: []
            ,colLabels: colLabels
            ,showColumnTitle: !variables.hasArrays() && variables.count() > 1
            ,valid: cube.n
            ,missing: cube.nMissing
            ,'analysis': {
                query: cube.query
                ,cube: cube
                ,filters: cube.appliedFilters
                ,weight: cube.weightId
            }
        }

        var body = createBody(cube, settings)
        var total = stats.margin(cube).get(0,0)
        function marginalize(direction) {
            var counts = stats.margin(cube, direction)
                , marginPct = scratch.clone(counts)
                ;
            ndarrayOps.divseq(marginPct, total)
            marginPct = unpack(formatPercentage(marginPct))
            return {count: unpack(counts), percent: marginPct}
        }
        var addComparisonNames = Array.apply(undefined, Array(body.dimension))
            .map(function(){return []})
        function nest(val){ return [val] }
        function shapeComparisonValues(){
            return comparisons.map(function(c) {
                var out = {}
                var values = new Array(body.dimension)
                cube._dimensions.forEach(function(dim,i){
                    if(c.hasBase(variables.at(i).self)){
                        values[i] = (_.at(c.getValues(), dim.validSubscripts))
                        addComparisonNames[i].push(c.name)
                    }
                }, this)
                out[c.name] = values
                return out
            }, this)
        }


        var margins = [0,1].map(marginalize, this)
        var labels = cube.labels
        if (labels.length === 1) labels.push(colLabels)
        var tabmargins = {
            count: [margins[0].count, margins[1].count[0]]
            ,percent: [margins[0].percent, margins[1].percent[0]]
            ,labels: labels
        }
        if(comparisons.length){
            var evaluated = shapeComparisonValues()
            evaluated.forEach(function(e){
                _.extend(tabmargins, e)
            }, this)
        }
        var tab = new Tabulated(
            {value: body}
            ,tabmargins
        )

        var subscripts = cube.subscripts
        if(subscripts.length==1) subscripts.push([0])
        var filteredSubscripts = stats.filterByMarginThreshold(cube, 0)



        if(settings.showSignif.true && axis >= 0){
            pValues = stats.getPvalues(cube, axis)
            tab.bodies.pValues = pValues
        }

        //////// prune based on marginal counts. Can no longer
        //////// do stats on the Tabulated body after this point

        settings.showEmpty.disabled = _.isEqual(subscripts, filteredSubscripts)

        if(settings.showEmpty.false){
            subscripts = filteredSubscripts
            tab.filterPermute(subscripts)
        }
        if(settings.sortDirection.value !== 0) doSort()

        function doSort(){
            var subscripts = tab.subscripts
            if (settings.sortSource==='labels'){
                subscripts[0] = stats.getSortedSubscripts(tab.margins.labels[0])
            }
            if (settings.sortSource==='bodyCols'){
                var index = labels[1].indexOf(settings.sortKey)
                if(index > -1){
                    var view = scratch.clone(tab.bodies.value.pick(-1, index))
                    var sortThis = Array.prototype.slice.call(view.data)
                    var order = stats.getSortedSubscripts(sortThis)
                    subscripts[0] = order
                }
            }
            if (settings.sortSource==='postCols'){
                // just margin for now, handle benchmark later
                var sortThis = _.flatten(tab.margins.count[0])
                var order = stats.getSortedSubscripts(sortThis)
                subscripts[0] = order
            }
            if(settings.sortDirection.value === -1){
                subscripts[0] = subscripts[0].reverse()
            }
            tab.filterPermute(subscripts)
        }

        result.rows = matrixToTable(
            unpack(tab.bodies.value),
            formatLabels(tab.margins.labels[0], cube._dimensions[0].type.subtype),
            {
                type:settings.countsOrPercents.value
            }
        )
        if(!!tab.bodies['pValues']){
            result.rows = addToCells(result.rows, {pValue: tab.bodies.pValues} )
        }
        result.rowLabels = formatLabels(tab.margins.labels[0], cube._dimensions[0].type.subtype)
        function addMarginRows(){
            result.postRows = []
            result.postRows.push(labelCells(tab.margins.percent[1], 'All (%)',
                {type: marginDisplayCover(1, axis, dimTypes)}))
            result.postRows.push(
                labelCells(tab.margins.count[1],
                    weighted ? 'Total' : 'Valid', {type: 'count'}
                ))
        }
        function addMarginColumns(){
            if(variables.count() > 1){
                result.postCols = []
                result.postCols.push(labelCells(tab.margins.percent[0], 'All (%)',
                    {type: marginDisplayCover(0, axis, dimTypes)}))
                result.postCols.push(
                    labelCells(tab.margins.count[0],
                        weighted ? 'Total' : 'Valid'
                    ))
            }
        }
        if(variables.count()>1 && !hasArray){
            addMarginRows()
            addMarginColumns()
        } else if (variables.count() === 1){
            addMarginRows()
        } else if (hasArray) {
            result.postCols.push(
                labelCells(tab.margins.count[0],
                    weighted ? 'Total' : 'Valid'
                ))
        }
        addComparisonNames[0].forEach(function(name){
            if(variables.at(0).dimension !== 'variable') return
            result.postCols.push(labelCells(tab.margins[name][0], name))
        },this)
        addComparisonNames[1].forEach(function(name){
            if(variables.at(1).dimension !== 'variable') return
            result.postRows.push(labelCells(tab.margins[name][1], name))
        },this)

        if(variables.count() > 1){
            result.colLabels = formatLabels(
                tab.margins.labels[1]
                ,cube._dimensions[1].type.subtype
            )
        }
        function marginDisplayCover(thisAxis, settingAxis, types){
            if(types.length===1){
                return types[0]==='multiresponse' ? 'emdash' : 'percent'
            }
            if(types[1-thisAxis]==='multiresponse'){
                return settings.countsOrPercents.value === 'count' ? 'percent' :
                    thisAxis===settingAxis ? 'emdash' : 'percent'
            }
            if(types[1-thisAxis]==='composite'){
                return thisAxis===settingAxis ? 'emdash' : 'percent'
            }
            return settings.countsOrPercents.value === 'count' ? 'percent' :
                thisAxis===settingAxis ? 'hundreds' : 'percent'
        }
        function createBody(cube, settings) {
            var body
                ;

            if (settings.countsOrPercents.value === 'percent') {
                body = formatPercentage(stats.propTable(cube, axis))
            } else {
                body = cube.count.cube
            }

            return body
        }

        function formatPercentage(matrix) {
            return ndarrayOps.mulseq(matrix, 100)
        }

        //convert a 2 dimensional array [[]...n]
        // surely there is a way to condense these two :/
        function matrixToTable(matrix, labels, annotation) {
            return matrix.map(function(vector, index){
                return _.extend({
                    label : labels[index]
                    , cells : vector.map(function(item) {
                        return { value : item }
                    })
                }, annotation)
            }, this)
        }
        function addToCells(table, addThis){
            var prop = Object.keys(addThis)[0]
            return table.map(function(vector, i){
                vector.cells = vector.cells.map(function(cell, j){
                    cell[prop] = addThis[prop].get(i,j)
                    return cell
                })
                return vector
            })
        }
        function labelCells(vector, label, annotation) {
            return _.extend({
                label : label
                , cells : vector.map(function(item) {
                    // reduced unpacked are wrapped?
                    return _.extend({ value : item instanceof Array ? item[0] : item })
                })
            }, annotation)
        }

        _.forEachRight(types, function(t, i){
            result.graph = "barchart"
            if(t === "numeric" && i==0){
                result.graph = "histogram"
            }
        }, this)
        types.forEach(function(t,i) {
            if (t === "datetime" && i==1){
                result.graph = "timeplot"
                var f = {}
                f.timeaxis = 'var'+i
                f.variables = {}
                f.variables[f.timeaxis] = dtypeToStrf(cube._dimensions[i].data.type.subtype.resolution)
                result.format = f
            }
        }, this)
        result.dataFrameTable = tab.dataFrameTable()
        if(params.analysis.savedSettings){
            result.analysis.display_settings = params.analysis.savedSettings.display_settings
        }
        /////// remove this when title variables are finished
        var rowVariable = variables.at(0)
        result.title = rowVariable.fullName
        result.subtitle = rowVariable.description
        ///////

        return result


    }

    function formatLabels(labels, typeinfo) {
        if (!!!typeinfo){
            typeinfo = {class: 'default'}
        }
        // hack around no numeric subtype for enums
        if(_.every(labels, function(l){
                return l instanceof Array
            })){
            typeinfo = {class: 'numeric'}
        }
        var formatters = {
            'datetime': function(labels) {
                return labels.map(function(each){
                    return datetimeFormatter(each, dtypeToStrf(typeinfo.resolution))
                }.bind(this))
            }
            ,'numeric': function(labels) {
                return labels.map(function(each){
                    return each.map(function(num) {
                        var formatted = $filter('number')(num, 2)
                            ;

                        return num - Math.floor(num) > 0 ? formatted : num
                    }).join('\u202f\u2013\u202f') // thin nbsp around endash
                }.bind(this))
            }
            ,'default': function(labels){
                return labels
            }
        }
        return formatters[typeinfo.class] ?
            formatters[typeinfo.class](labels) :
            labels
    }

    function prepareMeans(cube, params){
        var settings = params.settings
        var analysis = params.analysis
        var nDims = analysis.variables.count()


        function table(tab){
            // internal here; generalized transpose
            if (cube.dimension < 3){
                return unpack(tab)
            }

            if (cube.dimension === 3){
                return unpack(tab).map(_.flatten)
                // // do not show the SDs
                // var means = tab.bodies.value
                // var tr = Array(undefined, means.shape.slice().length)
                //     .map(function(x, i){return i})
                //     .reverse()
                // return unpack(means.transpose.apply(means, tr)).map(_.flatten)
            }
        }
        var types = analysis.variables.getTypes()


        function setupLabels(cube){
            var labels = cube.labels
            if (nDims < 2){
                labels.push(['Mean'])
            } else {
                labels[0] = formatLabels(labels[0], cube._dimensions[0].type.subtype)
            }
            if (nDims == 2){
                labels[1] = formatLabels(labels[1], cube._dimensions[1].type.subtype)
            }
            return labels
        }

        var tab = new Tabulated(
            {value: cube.mean.cube},
            {labels: setupLabels(cube)})

        var subscripts = cube.subscripts
        if(subscripts.length==1) subscripts.push([0])
        var filteredSubscripts = stats.filterByMarginThreshold(cube, 0)
        settings.showEmpty.disabled = _.isEqual(subscripts, filteredSubscripts)
        if(settings.showEmpty.false){
            subscripts = filteredSubscripts
            tab.filterPermute(subscripts)
        }
        if(nDims && settings.sortDirection.value !== 0) doSort()

        function doSort(){
            var subscripts = tab.subscripts
            if (settings.sortSource==='labels'){
                subscripts[0] = stats.getSortedSubscripts(tab.margins.labels[0])
            }
            if (settings.sortSource==='bodyCols'){
                if (nDims === 1) {
                    var sortThis = Array.prototype.slice.call(tab.bodies.value.data)
                    var order = stats.getSortedSubscripts(sortThis)
                    subscripts[0] = order
                } else {
                    var index = tab.margins.labels[1].indexOf(settings.sortKey)
                    if(index > -1){
                        var view = scratch.clone(tab.bodies.value.pick(-1, index))
                        var sortThis = Array.prototype.slice.call(view.data)
                        var order = stats.getSortedSubscripts(sortThis)
                        subscripts[0] = order
                    } else {
                        var view = scratch.clone(tab.bodies.value.pick(-1, 0))
                        var sortThis = Array.prototype.slice.call(view.data)
                        var order = stats.getSortedSubscripts(sortThis)
                        subscripts[0] = order
                    }
                }
            }
            if (settings.sortSource==='postCols'){
                // just margin for now, handle benchmark later
                var sortThis = _.flatten(tab.margins.count[0])
                var order = stats.getSortedSubscripts(sortThis)
                subscripts[0] = order
            }
            if(settings.sortDirection.value === -1){
                subscripts[0] = subscripts[0].reverse()
            }
            tab.filterPermute(subscripts)
        }

        var result = {
            id: _.uniqueId("t")
            ,variables: analysis.variables
            ,withMeans: true
            ,template: '/tables/measures.html'
            ,measureVariable: analysis.measures.getMeasureVariable('mean',0)
            ,rows: table(tab.bodies.value)
            ,cube: cube
            ,rowLabels: tab.margins.labels[0]
            ,colLabels: tab.margins.labels[1]
            ,valid: cube.n
            ,missing: cube.nMissing
            ,graph: 'dotplot'
            ,'analysis': {
                query: cube.query
                ,tabulated: tab
                ,filters: cube.appliedFilters
                ,weight: cube.weightId
            }
        }
        types.forEach(function(t,i) {
            if (t === "datetime"){
                result.graph = "timeplot"
                var f = {}
                f.timeaxis = 'var'+i
                f.variables = {}
                f.variables[f.timeaxis] = dtypeToStrf(cube._dimensions[i].data.type.subtype.resolution)
                result.format = f
            }
        }, this)
        /////// remove this when title variables are finished
        var measureVar = analysis.measures.getMeasureVariable('mean',0)
        result.title = "Average " + measureVar.fullName
        result.subtitle = measureVar.description
        ///////

        result.dataFrameTable = tab.dataFrameTable()
        return result
    }

    return function(cube, params){
        return params.analysis.hasMeanMeasure() ?
            prepareMeans(cube, params) :
            prepareCrosstab(cube, params)
    }
}