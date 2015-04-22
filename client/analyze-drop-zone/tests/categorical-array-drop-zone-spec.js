'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , MockMachine = require('../../test-support/mock-machine')
    ;

describe('CategoricalArrayDropZone', function() {
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
        angular.mock.inject(function(CategoricalArrayDropZone) {
            sut = CategoricalArrayDropZone.create({
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

    describe('given a univariate drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)

        describe('when a variable is dropped in the table zone', function() {
            var variable
                ;

            beforeEach(function() {
                variable = variableData('/var/123')
                sut.handle('table:link', {}, variable)
            })

            it('should clean the analysis model', function() {
                analysisMock.handled['clean'].should.be.ok
            })

            it('should add the dropped variable to the analysis model', function() {
                analysisMock.handled['add-variable'].should.be.ok
            })
        })
    })

    describe('when converting to string', function() {
        var stringified
            ;

        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            stringified = sut.toString()
        })

        it('should return the variable type + the current display + the current state', function() {
            stringified.should.be.equal('cat-array-table-univariate')
        })
    })
})
