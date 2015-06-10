'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('CategoricalDropZone', function() {
    var sut
        , analysisMock
        , slicesOrGroupsMock
        , tableOrGraphMock
        , variableData
        , draggingData
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
        angular.mock.inject(function(CategoricalDropZone) {
            sut = CategoricalDropZone.create({
                analysis : analysisMock
                , slicesOrGroups : slicesOrGroupsMock
                , tableOrGraph : tableOrGraphMock
            })
        })
    }

    context('when initializing', function() {
        beforeEach(buildModule)
        beforeEach(function() {
            analysisMock.isUnivariate = function() {
                return true
            }
            buildSut()
        })

        context('given an analysis with only one variable', function() {

            it('should transition to the "univariate" state', function() {
                sut.state.should.be.equal('univariate')
            })
        })
    })

    context('given an univariate drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)

        context('when a variable is dropped in the row zone', function() {
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

        context('when a variable is dropped in the column zone', function() {
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

            it('should transition to "bivariate"', function() {
                sut.state.should.be.equal('bivariate')
            })
        })

        context('when a variable is dropped in the slice zone', function() {
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

        context('when a variable is dropped in the group zone', function() {
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

    context('given a bivariate drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.transition('bivariate')
        })

        context('when a variable is dropped in the row zone', function() {
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

        context('when a variable is dropped in the column zone', function() {
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

            it('should transition to "bivariate"', function() {
                sut.state.should.be.equal('bivariate')
            })
        })

        context('when a variable is dropped in the table zone', function() {
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

            it('should transition to univariate', function() {
                sut.state.should.be.equal('univariate')
            })
        })

        context('when a variable is dropped in the slice zone', function() {
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

        context('when a variable is dropped in the group zone', function() {
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

    context('given a new drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.transition('new')
        })

        context('when a variable is dropped in the table zone', function() {
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

    context('given a tabs drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.transition('tabs')
        })

        context('when a variable is dropped in the tabs zone', function() {
            var variable
                ;

            beforeEach(function() {
                variable = variableData('/var/123')
                sut.handle('tabs:link', {}, variable)
            })

            it('should insert the dropped variable at index 0', function() {
                analysisMock.handled['insert-before'].should.be.ok
                expect(analysisMock.handled['insert-before'][0][0]).to.equal(0)
            })
        })

        context('when a variable is dropped in the tabs zone', function() {
            var variable
                ;

            context('given an analysis with three variables', function() {
                beforeEach(function() {
                    variable = variableData('/var/123')
                    sut.analysis.dimension = 3
                    sut.handle('tabs:link', {}, variable)
                })

                it('should insert the dropped variable at index 0', function() {
                    analysisMock.handled['replace-variable'].should.be.ok
                    expect(analysisMock.handled['replace-variable'][0][0]).to.equal(0)
                })
            })
        })
    })

    context('when refreshing drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)

        context('given an empty analysis', function() {
            beforeEach(function() {
                sut.analysis.isEmpty = function() {
                    return true
                }

                sut.refreshDropZone()
            })

            it('should transition to new', function() {
                sut.state.should.be.equal('new')
            })
        })

        context('given an analysis with array variables', function() {
            beforeEach(function() {
                sut.analysis.isEmpty = function() {
                    return false
                }

                sut.analysis.hasArrayVariables = function() {
                    return true
                }

                sut.refreshDropZone()
            })

            it('should transition to tabs', function() {
                sut.state.should.be.equal('tabs')
            })
        })

        context('given a univariate analysis', function() {
            beforeEach(function() {
                sut.analysis.isUnivariate = function() {
                    return true
                }

                sut.refreshDropZone()
            })

            it('should transition to univariate', function() {
                sut.state.should.be.equal('univariate')
            })
        })

        context('given a bivariate analysis', function() {
            beforeEach(function() {
                sut.analysis.isBivariate = function() {
                    return true
                }

                sut.refreshDropZone()
            })

            it('should transition to bivariate', function() {
                sut.state.should.be.equal('bivariate')
            })
        })
    })
})
