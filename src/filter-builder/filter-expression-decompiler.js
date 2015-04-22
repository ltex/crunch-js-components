'use strict';

module.exports = FilterDecompilerFactory


FilterDecompilerFactory.$inject = ['lodash', 'expressionBuilders', '$q', 'iResourceVariable']

function FilterDecompilerFactory(_, expressionBuilders, $q, iResourceVariable) {
    function baseFilter(compiledFilter) {
        var filter = {
            name: compiledFilter.name
            , self: compiledFilter.self
            , expressions: []
            , junctions: compiledFilter.functions
            , original: compiledFilter
        }

        if (compiledFilter.index !== undefined){
            filter.index = compiledFilter.index
        }

        return filter
    }

    function hiddenExpression(name) {
        var hexp = expressionBuilders.categorical();
        hexp.isHidden = true;
        hexp.name = name;
        return hexp
    }

    function getVarFromExpression(expression){
        if (expression.function && expression.function === 'not'){
            return getVarFromExpression(expression.args[0])
        }
        var i
        var args = expression.args
        for (i=0; i<args.length; i++){
            var arg = args[i]
            if (arg && arg.hasOwnProperty('variable')){
                return extractVariableId(arg.variable)
            }
        }
    }

    function decompileVariable(dataset, allVars, isExclusion) {

        var varUrl = (dataset.urls.variables.self || dataset.urls.variables)

        varUrl = varUrl.split('?')[0]

        return function(fVar) {
            var variable = varUrl + getVarFromExpression(fVar) + '/'
            var dsVar = allVars.value[variable];
            if (!dsVar) {
                return hiddenExpression(fVar.args.variable)
            } else {
                var exp = expressionBuilders[dsVar.type](isExclusion);
                return exp.source(dsVar)
                    .then(function() {
                        return exp.decompile(fVar)
                    })
            }
        }
    }

    function flattenExpression(expression){
        var junctions = []
        var expressions = []

        if (expression === undefined){
            return {'junctions': [], 'expressions': []}
        }


        if (expression.function && (expression.function.toUpperCase() === 'AND' ||
                                    expression.function.toUpperCase() === 'OR')) {
            junctions.push(expression.function)

            var items = []

            _.each(expression.args, function (item){
                var flat = flattenExpression(item)
                expressions.push.apply(expressions, flat.expressions)
                junctions.push.apply(junctions, flat.junctions)
            })
        }
        else{
            expressions.push(expression)
        }

        return {'junctions': junctions, 'expressions': expressions}
    }

    function flattenFilter(filter){
        var flat = flattenExpression(filter.original.expression)
        filter.expressions = flat.expressions
        filter.junctions = flat.junctions
    }

    function buildExpressions(dataset, filter, isExclusion) {
        flattenFilter(filter)
        return function(allVars) {
            var exps = _.map(filter.expressions, decompileVariable(dataset, allVarsById(allVars), isExclusion));
            return $q.all(exps)
                .then(function(results) {
                    filter.expressions = results;
                    return filter
                })
        }
    }

    function allVarsById(vars) {
        var result = {};
        _.each(vars, function(varb) {
            result[varb.self] = varb
        });
        return {
            value: result
        }
    }

    function extractVariableId(varUrl){
        var split = varUrl.split('/')

        //variable id has no positioning
        if (split.length === 1){
            return split
        }

        //variable ends in slash
        if (split[split.length - 1] === ''){
            return split[split.length - 2]
        }

        //variable at end
        return split[split.length - 1]
    }

    function extractVariableIds(dataset, expr) {

        var vars = []

        var varUrl = (dataset.urls.variables.self || dataset.urls.variables)

        varUrl = varUrl.split('?')[0]

        if (expr === undefined){
            return []
        }

        if (expr && expr.hasOwnProperty('variable')){
            var variable = varUrl + extractVariableId(expr.variable) + '/'

            if (variable && vars.indexOf(variable) === -1){
                vars.push(variable)
            }
        }

        if (expr.args){
            var i
            for (i=0; i < expr.args.length; i++){
                var expr_vars = extractVariableIds(dataset, expr.args[i])
                var j
                for (j=0; j<expr_vars.length; j++){
                    var variable = expr_vars[j]
                    if(variable && vars.indexOf(variable) == -1){
                        vars.push(variable)
                    }
                }
            }
        }

        return vars
    }

    function fetchTheseVars(varIds, datasetId) {
        return $q.all(_.map(varIds, function(varId) {
            return iResourceVariable({
                datasetId: datasetId
                , variableId: varId
            })
        }))
    }

    return function decompile(compiledFilter, dataset, isExclusion) {
        var filter = baseFilter(compiledFilter)
        var variableIds = extractVariableIds(dataset, compiledFilter.expression)
        var allVars = fetchTheseVars(variableIds, dataset.self.split('?')[0])
        return allVars.then(buildExpressions(dataset, filter, isExclusion))
    }
}

