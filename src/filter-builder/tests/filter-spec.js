'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('Filter', function() {
    var Sut
        ,dataset
        ;

    function buildModule() {
        var mod = mainMod()
            ;

        mod.factory('expressionBuilders', function() {
            return {
                numeric : function() {
                    return {
                        source : function(s) {
                            this.assignedSource = s
                        }
                    }
                }
            }
        })

        angular.mock.module(mod.name)
    }

    function buildSut() {
        angular.mock.inject(function(Filter) {
            Sut = Filter
        })
    }

    describe('when constructing', function() {
        var filter
            , filterData
            ;

        describe('given existing filter data', function() {
            beforeEach(buildModule)
            beforeEach(buildSut)
            beforeEach(function() {
                filterData = {
                    name : 'filter name'
                }

                filter = new Sut(filterData)
            })

            it('should extend the filter object with existing filter data', function() {
                filter.name.should.equal(filterData.name)
            })
        })
    })

    describe('when adding an expression', function() {
        var filter
            ;

        beforeEach(function() {
            dataset = { self : '/dataset/123' }
        })

        describe('given a simple variable', function() {
            var variable
                ;

            beforeEach(buildModule)
            beforeEach(buildSut)
            beforeEach(function() {
                variable = {
                    self : '/variable/123'
                    , alias: '/variable/123'
                    , type : 'numeric'
                }

                filter = new Sut()
                filter.addExpression(dataset, variable)
            })

            it('should add a new expression to the filter', function() {
                filter.expressions.length.should.equal(1)
            })

            it('should set the expression as active', function() {
                filter.lastExpression().isActive.should.be.true
            })

            it('should set the dataset and variable as the expression source', function() {
                filter.lastExpression().assignedSource.datasetId.should.equal(dataset.self)
                filter.lastExpression().assignedSource.variableId.should.equal('/variable/123')
            })
        })

        describe('given a composite variable', function() {
            var variable
                ;

            beforeEach(buildModule)
            beforeEach(buildSut)
            beforeEach(function() {
                inject(function($q, $rootScope){
                    variable = {
                        type : 'categorical_array'
                        , categoricalArray : true
                        , getSubvariables : function(){
                            return $q.when([
                            { self : '/variables/123', type : 'numeric' }
                            , { self : '/variables/345', type : 'numeric' }
                        ])}
                    }

                    filter = new Sut()
                    filter.addExpression(dataset, variable)
                    $rootScope.$digest()
                })
            })

            it('should add the subvariables', function() {
                filter.expressions.length.should.equal(2)
            })
        })

        describe('when getting hidden expressions', function() {
            var filter
                , filterData
                ;

            describe('given some hidden expressions in existing data', function() {
                beforeEach(buildModule)
                beforeEach(buildSut)
                beforeEach(function() {
                    filterData = {
                        expressions : [
                            {
                                isHidden : true
                            }
                            ,
                            {
                                isHidden : false
                            }
                        ]
                    }

                    filter = new Sut(filterData)
                })

                it('should return expressions objects with isHidden equals true', function() {
                    filter.hiddenExpressions().length.should.equal(1)
                })
            })
        })
    })

})
