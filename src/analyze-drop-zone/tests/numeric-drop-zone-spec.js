'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('NumericDropZone', function() {
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
        angular.mock.inject(function(NumericDropZone) {
            sut = NumericDropZone.create({
                analysis : analysisMock
                , slicesOrGroups : slicesOrGroupsMock
                , tableOrGraph : tableOrGraphMock
            })
        })
    }

    describe('when initializing', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)

        it('should transition to the "count" state', function() {
            sut.state.should.be.equal('count')
        })
    })

    describe('given a count drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.transition('count')
        })

        describe('when a variable is dropped in the row zone', function() {
            var variable
                ;

            beforeEach(function() {
                variable = variableData('/var/123')
                sut.handle('row:link', {}, variable)
            })

            it('should replace variable at index 0 in the analysis model', function() {
                analysisMock.handled['replace-variable'][0][0].should.equal(0)
                analysisMock.handled['replace-variable'][0][1].should.equal('/var/123')
            })
        })

        describe('when a variable is dropped in the column zone', function() {
            var variable
                ;

            beforeEach(function() {
                variable = variableData('/var/123')
                sut.handle('column:link', {}, variable)
            })

            it('should replace variable at index 1 in the analysis model', function() {
                analysisMock.handled['replace-variable'][0][0].should.equal(1)
                analysisMock.handled['replace-variable'][0][1].should.equal('/var/123')
            })
        })

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

            it('should add the selected variable as the measure', function() {
                analysisMock.handled['measures-mean'][0][0].should.equal('/var/123')
            })

            it('should transition to "measure-only"', function() {
                sut.state.should.be.equal('measure-only')
            })
        })

        describe('when a variable is dropped in the mean zone', function() {
            var variable
                ;

            beforeEach(function() {
                variable = variableData('/var/456')
                sut.handle('mean:link', {}, variable)
            })

            it('should add the selected variable as the measure', function() {
                analysisMock.handled['measures-mean'][0][0].should.equal('/var/456')
            })
        })

        describe('when a variable is dropped in the slice zone', function() {
            beforeEach(function() {
                sut.handle('slice:link', {}, variableData('/var/123'))
            })

            it('should set the slicesOrGroups setting to slices', function() {
                slicesOrGroupsMock.handled['slices'].should.be.ok
            })

            it('should replace variable at index one in the analysis model', function() {
                analysisMock.handled['replace-variable'][0][0].should.equal(1)
                analysisMock.handled['replace-variable'][0][1].should.equal('/var/123')
            })
        })

        describe('when a variable is dropped in the group zone', function() {
            beforeEach(function() {
                sut.handle('group:link', {}, variableData('/var/123'))
            })

            it('should set the slicesOrGroups setting to groups', function() {
                slicesOrGroupsMock.handled['groups'].should.be.ok
            })

            it('should replace variable at index one in the analysis model', function() {
                analysisMock.handled['replace-variable'][0][0].should.equal(1)
                analysisMock.handled['replace-variable'][0][1].should.equal('/var/123')
            })
        })
    })

    describe('given a measure only drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.transition('measure-only')
        })

        describe('when a variable is dropped in the row zone', function() {
            var variable
                ;

            beforeEach(function() {
                variable = variableData('/var/123')
                sut.handle('row:link', {}, variable)
            })

            it('should reset the analysis and add the new variable', function() {
                analysisMock.handled['clean'].should.be.ok
                analysisMock.handled['add-variable'][0][0].should.equal('/var/123')
            })

            it('should clean aggregated measures', function() {
                analysisMock.handled['measures-count'].should.be.ok
            })
        })

        describe('when a variable is dropped in the mean zone', function() {
            var variable
                ;

            beforeEach(function() {
                variable = variableData('/var/456')
                sut.handle('mean:link', {}, variable)
            })

            it('should add the selected variable as the measure', function() {
                analysisMock.handled['measures-mean'][0][0].should.equal('/var/456')
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
            stringified.should.be.equal('numeric-table-count')
        })
    })

    describe('when refreshing drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)

        describe('given a an analysis with cat arrays', function() {
            beforeEach(function() {
                sut.transition('count')
                sut.analysis.hasArrayVariables = function() {
                    return true
                }
                sut.refreshDropZone()
            })

            it('should transition to measure-only', function() {
                sut.state.should.be.equal('measure-only')
            })
        })

        describe('given a non empty analysis', function() {
            beforeEach(function() {
                sut.transition('measure-only')
                sut.refreshDropZone()
            })

            it('should transition to count', function() {
                sut.state.should.be.equal('count')
            })
        })

        describe('given a empty analysis', function() {
            beforeEach(function() {
                analysisMock.isEmpty = function() {
                    return true
                }

                sut.transition('numeric')
                sut.refreshDropZone()
            })

            it('should transition to measure-only', function() {
                sut.state.should.be.equal('measure-only')
            })
        })
    })
})
