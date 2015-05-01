var expressionCompiler = require('./filter-expression-compiler');



module.exports = (function() {
    'use strict';

    function EvalFilterFactory($q) {
        function evaluate(dataset, args) {
            args = args || {};
            var expressions = args.expressions || [];
            var junctions = args.junctions || [];

            function _eval(expressions, ds) {
                var q = {
                    params: {
                        filter_syntax: {expression: expressionCompiler()(
                            expressions, junctions)}
                        , exclude_applied: true
                        , exclude_exclusion_filter : (args.excludeExclusions || false)
                    }
                    , cache: false
                };
                return ds.urls.summary.map(q, function(summ) {
                    var result = summ.value.rows
                    return result
                })
            }
            //if (expressions.length > 0) {
                return _eval(expressions, dataset)
            //}
            //return $q(function(){return {}})
        }
        return evaluate
    }
    EvalFilterFactory.$inject = ['$q'];
    return EvalFilterFactory
})
    .call(this);
