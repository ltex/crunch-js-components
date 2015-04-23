'use strict'

module.exports = FilterFactory

FilterFactory.$inject = [
    'lodash'
    , 'expressionBuilders'
    , 'filterCompiler'
]

function FilterFactory(_, expressionBuilders, filterCompiler) {

    var filterDefaults = {
            name: ''
            , isPublic : false
            , expressions : []
            , junctions : []
        }
        , AND_JUNCTION = 'AND'
        ;

    function expressionOrError(expressionType) {
        var exp = expressionBuilders[expressionType]
            ;

        if(!exp) {
            throw new Error('variable type ' + expressionType + ' is not supported')
        }

        return exp()
    }

    function Filter(filter) {
        var memento = _.isObject(filter) ? _.clone(filter) : _.cloneDeep(filterDefaults)

        _.extend(this, memento)
    }

    Filter.prototype.addExpression = function(dataset, varb) {
        var expression
            , expressions = []
            ;

        if(!varb.type) {
            varb = varb.droppedData || varb.dragged.data || varb
        }

        //something was dropped here that we don't recognize
        if (varb.type === undefined){
            return []
        }

        //composite variable support
        if(varb.categoricalArray) {
            varb.getSubvariables().then(function(subvariables){
                subvariables.forEach(function(sub){
                    expressions.push(this.addExpression(dataset, sub))
                }.bind(this))
            }.bind(this))
        } else {
            expression = expressionOrError(varb.type)
            this.junctions.push(AND_JUNCTION)
            this.expressions.push(expression)

            expression.isActive = true
            expression.source({
                datasetId: dataset.self
                , variableId: varb.self
            })

            expressions.push(expression)
        }

        return expressions
    }

    Filter.prototype.expressionsWithSource = function() {
        return this.expressions.filter(function(exp) {
            return exp.hasSource
        })
    }

    Filter.prototype.lastExpression = function() {
        var lastIndex = this.expressions.length - 1
        return this.expressions[lastIndex]
    }

    Filter.prototype.hiddenExpressions = function() {
        return this.expressions.filter(function(exp) {
            return exp.isHidden === true
        })
    }

    Filter.prototype.getMemento = function() {
        return _.pick(this, 'name', 'isPublic', 'expressions', 'junctions', 'self')
    }


    Filter.prototype.expToString = function(exp){
            var built = exp && exp.build && exp.build()
            if (built === undefined){
                return exp && exp.name
            }
            var categories = []
            var i;

            var columns

            _.each(built.args, function(arg){
                if (arg.column){
                    columns = arg.column
                }
                if (arg.value){
                    columns = arg.value
                }
            })


            for (i=0; i<columns.length; i++){
                var category_name = columns[i]
                //handling for missing, etc.
                if (category_name['?'] !== undefined){
                    category_name = '?' + category_name['?']
                }
                var name = exp.categories[category_name].name
                if (name !== undefined) {
                    categories.push(name)
                }
            }
            var func = built.function

            if (func == 'in'){
                func = 'is'
            }

            if (func == 'any'){
                func = 'is'
            }

            var cats = categories.join(' or ')

           if (categories.length > 2){
                cats = categories.slice(0, categories.length - 1).join(', ')
                cats += ' or ' + categories[categories.length - 1]
            }

            return exp.name + ' ' + func + ' ' + cats
        }

    Filter.prototype.toString = function(){

        var expressions = this.expressions

        if (expressions.length == 0){
            return ''
        }

        var i
        var s = ''
        var junctions = this.junctions

        s += this.expToString(expressions[0])
        for (i=1; i<junctions.length+1; i++){
            if (expressions[i] !== undefined){
                var junction = junctions[i-1]
                if (junction !== undefined){
                    s += (' ' + junction + ' ')
                }

                s += this.expToString(expressions[i])
            }
        }

        return s
    }

    Filter.prototype.compile = function(variablePrefix, variableSuffix){
        return filterCompiler(this.expressions, this.junctions, variablePrefix, variableSuffix)
    }

    return Filter
}
