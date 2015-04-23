var mainModule = require('../index')
    ,mocks = require('angular-mocks')

module.exports = (function() {
    'use strict';


    var builder
    var compiler

    describe('FilterExpressionCompiler', function() {

        beforeEach(function() {
            var mod = mainModule('filters.test');
            mod.factory('iResourceVariable', function(
                Shoji, $q) {
                return function execute(q) {
                    if (q.datasetId === '123' && q.variableId === '1') {
                        var res = Shoji(fixtures.variable
                            .self)
                            .parse(fixtures.variable);
                        return $q.when(res)
                    }
                    throw new Error('unexpected args', q)
                }
            })
        angular.mock.module('filters.test')
        })

        beforeEach(function() {
            inject(function(categoricalExpressionBuilder, filterCompiler) {
                builder = categoricalExpressionBuilder.create()
                compiler = filterCompiler()
            })
        })

        it(
            'should compile a filter into a server payload', function() {
                var exp1 = builder.create()

                exp1.decompile({
                    function: 'in',
                    args: [{variable: '1'},
                        {column: [1, 2],
                         type: {
                            "function": "typeof",
                            "args": [{"variable": '2'}]
                         }}]
                })

                exp1.hasSource = true
                exp1.categories = [{
                    isSelected: true,
                    id: 1
                }]

                var exp2 = builder.create()

                exp2.decompile({
                    function: 'in',
                    args: [{variable: '2'},
                        {column: [1, 2],
                        type: {
                            "function": "typeof",
                            "args": [{"variable": '2'}]
                        }}]
                })

                exp2.hasSource = true
                exp2.categories = [{
                    isSelected: true,
                    id: 2
                }]

                var expressions = [exp1, exp2]
                var junctions = ['AND', 'AND', 'AND']
                var compiled = compiler(expressions, junctions)

                var expected = {
                    "expression": {
                        "function": "AND",
                        "args": [
                            {
                                "function": "in",
                                "args": [
                                    {'variable': '1'},
                                    {
                                        "column": [
                                            1
                                        ],
                                         type: {
                                          "function": "typeof",
                                          "args": [{"variable": '1'}]
                                    }}]
                            },
                            {
                                "function": "in",
                                "args": [
                                    {'variable': '2'},
                                    {
                                        "column": [
                                            2
                                        ],
                                        type: {
                                          "function": "typeof",
                                          "args": [{"variable": '2'}]
                                    }}]
                         }
                        ]
                    }
                }

                compiled.should.eql(expected)

            })
        it('should ignore bogus expressions and filter junctions correctly', function(){
                var builder = ExpressionBuilder(lodash)
                var exp1 = builder.create()
                exp1.decompile({
                    function: 'in',
                    args: [{variable: '1'},
                        {column: [1, 2]}]
                })

                var exp2 = builder.create()
                exp2.decompile({
                    function: 'in',
                    args: [{variable: '2'},
                        {column: []}]
                })

                exp1.hasSource = true
                exp1.categories = [{
                    isSelected: true,
                    id: 1
                }]
                exp2.categories = []

                var expressions = [exp1, exp2]
                var junctions = ['AND', 'AND']
                var compiler = FilterCompiler()
                var compiled = compiler(expressions, junctions)

                var expected ={expression: {function: "in", args: [{'variable': '1'},
                                                                    {'column': [1],
                                                                         type: {
                                                                         "function": "typeof",
                                                                         "args": [{"variable": '1'}]}}]}}
                compiled.should.eql(expected)
        })
    })
})