var _ = require('lodash');
module.exports = (function() {
    'use strict';

    return FilterCompiler
    function FilterCompiler() {

         function compile(expressions, junctions, variablePrefix, variableSuffix) {
             junctions = junctions || [];
             expressions = expressions || [];

             var varPrefix = variablePrefix
             var varSuffix = variableSuffix

             expressions = _(expressions)
                 .map(function (exp) {
                     return exp.build(varPrefix, varSuffix)
                 }).reverse().value()


             var expression = NULL

             while (expression === NULL && expression !== undefined) {
                expression = expressions[0]
                expressions = expressions.slice(1, expressions.length)
             }

             if (expression === undefined){
                 return {}
             }

             var i = 0;

             for (i=0; i<expressions.length; i++){
                 var operator = junctions[i]
                 var factor = expressions[i]

                 //factor did not compile
                 if (factor === NULL){
                     continue
                 }

                 expression = {
                     'function': operator,
                     'args': [
                         factor,
                         expression
                     ]
                 }
             }
            return expression
        }
        return compile
    }
})
    .call(this);
