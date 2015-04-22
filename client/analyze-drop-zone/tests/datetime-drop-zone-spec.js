'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , MockMachine = require('../../test-support/mock-machine')
    ;

describe('DatetimeDropZone', function() {
    var sut
        , analysisMock
        , slicesOrGroupsMock
        , tableOrGraphMock
        , draggingData
        , variableData
        ;

    function buildModule() {
        var main = mainMod()
            , testSupport = require('./test-support')()
            ;

        analysisMock = testSupport.analysis
        slicesOrGroupsMock = testSupport.slicesOrGroups
        tableOrGraphMock = testSupport.tableOrGraph
        variableData = testSupport.variableData
        draggingData = testSupport.draggingData

        main.factory('cachedHierarchicalVariables', function() {
            return {
                current : {
                    byId : function() {
                        return ''
                    }
                }
            }
        })

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function(DatetimeDropZone) {
            sut = DatetimeDropZone.create({
                analysis : analysisMock
                , tableOrGraph : tableOrGraphMock
                , slicesOrGroups : slicesOrGroupsMock
            })
        })
    }

    describe('when initializing', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)

        it('should transition to the "univariate" state', function() {
            sut.state.should.be.equal('univariate')
        })
    })

    describe('when converting to string', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)

        describe('given the display mode is table', function() {
            var stringified
                ;

            beforeEach(function() {
                stringified = sut.toString()
            })

            it('should call the parent class\'s toString method', function() {
                stringified.should.be.equal('cat-table-univariate')
            })
        })

        describe('given the display mode is graph', function() {
            var stringified
                ;

            beforeEach(function() {
                sut.tableOrGraph.value = 'graph'
                stringified = sut.toString()
            })

            it('should return the variable type + the current display + the current state', function() {
                stringified.should.be.equal('datetime-graph-univariate')
            })
        })
    })
})
