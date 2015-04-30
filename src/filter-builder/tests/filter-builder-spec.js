'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('FilterBuilder', function() {
    var sut
        ,fakeStats
        ,dataset
        ;

    function buildModule() {
        var main
            ,scopeable
            ;

        main = mainMod()

        main.factory('Filter', function() {
            return function() {
                var hiddenExpressions = [1,2,3]
                this.expressionsWithSource = angular.noop
                this.expressions = []
                this.addExpression = function(dataset, varb) {
                    this.expressionDataset = dataset
                    this.expressionVarb = varb

                    return [{}]
                }

                this.hiddenExpressions = function() {
                    return hiddenExpressions
                }

                this.hiddenExpressionsCount = hiddenExpressions.length
            }
        })

        fakeStats = {
            filtered : 1
            , total : 2
        }

        main.factory('evalFilter', function($q) {
            return function evalFilter() {
                evalFilter.calls = evalFilter.calls || 0
                evalFilter.calls++
                return $q.when(fakeStats)
            }
        })

        var commands = []
        main.factory('bus',function(){
            return {
                send: commands.push.bind(commands)
            }
        })

        angular.mock.module(main.name)
    }

    dataset = {

    }

    function buildSut(filter, ds) {

        angular.mock.inject(function(FilterBuilder) {
            sut = FilterBuilder.create({
                dataset : ds || dataset
            })
        })
    }

    function flush() {
        angular.mock.inject(function($rootScope) {
            $rootScope.$digest()
        })
    }

    describe('when initializing', function() {
        beforeEach(buildModule)
        beforeEach(function() {
            buildSut()
            flush()
        })

        it('should be initialized', function() {
            sut.state.should.be.equal('initialized')
        })
    })

    describe('when evaluating filters', function() {
        beforeEach(buildModule)
        beforeEach(function() {
            buildSut()
            sut.evaluateFilter()
            flush()
        })

        it('should set the obtained stats to sut', function() {
            sut.stats.should.equal(fakeStats)
        })
    })

    describe('when a variable is selected', function() {
        var variable
            ;

        beforeEach(buildModule)
        beforeEach(function() {
            variable = { }
            buildSut()
            flush()
            sut.handle('eligibleVariable.selected:link', {}, variable)
        })

        it('should add a new expression with the current dataset', function() {
            sut.filter.expressionDataset.should.equal(dataset)
        })

        it('should add a new expression with that variable', function() {
            sut.filter.expressionVarb.should.equal(variable)
        })
    })

    describe('when a variable is clicked', function() {
        var variable
            ;

        beforeEach(buildModule)
        beforeEach(function() {
            variable = { }
            buildSut()
            flush()
            sut.handle('variable.clicked', {}, { variable : variable, behaviors : {} })
        })

        it('should add a new expression with the current dataset', function() {
            sut.filter.expressionDataset.should.equal(dataset)
        })

        it('should add a new expression with that variable', function() {
            sut.filter.expressionVarb.should.equal(variable)
        })
    })

    describe('when deleting an expression', function() {

        describe('given an existing expression', function() {

            beforeEach(buildModule)
            beforeEach(function() {
                buildSut()
                flush()
                sut.addExpression({})
                sut.handle('deleteExpression', 0)
            })

            it('should remove the expression from the filter', function() {
                sut.filter.expressions.length.should.equal(0)
            })

            it('should evaluate the filter', function() {
                angular.mock.inject(function(evalFilter){
                    evalFilter.calls.should.equal(3)
                })
            })
        })
    })
})
