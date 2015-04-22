'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , testSupport = require('./test-support')()
    ;

describe('AnalyzeDropZone', function() {
    var sut
        , draggingData
        ;

    function buildModule() {
        var main = mainMod()
            ;

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
        angular.mock.inject(function(AnalyzeDropZone) {
            sut = AnalyzeDropZone.create({
                analysis : testSupport.analysis
                , slicesOrGroups : testSupport.slicesOrGroups
                , tableOrGraph : testSupport.tableOrGraph
            })
        })
    }

    beforeEach(buildModule)
    beforeEach(buildSut)

    describe('when creating', function() {

        it('should transition to initialized', function() {
            sut.state.should.be.equal('initialized')
        })
    })

    describe('when a variable is dragged', function() {

        describe('given the variable type is "categorical"', function() {
            beforeEach(function() {
                sut.handle('link:started', {}, draggingData('/var/123', 'categorical'))
            })

            it('should transition to the "categorical" state', function() {
                sut.state.should.be.equal('categorical')
            })

            it('should return the type drop zone for the dragged variable', function() {
                sut.current.type.should.be.equal('categorical')
            })
        })

        describe('given the variable type is "numeric"', function() {
            beforeEach(function() {
                sut.handle('link:started', {}, draggingData('/var/123', 'numeric'))
            })

            it('should transition to the "numeric" state', function() {
                sut.state.should.be.equal('numeric')
            })

            it('should return the type drop zone for the dragged variable', function() {
                sut.current.type.should.be.equal('numeric')
            })
        })

        describe('given the variable type is "categorical_array"', function() {
            beforeEach(function() {
                sut.handle('link:started', {}, draggingData('/var/123', 'categorical_array'))
            })

            it('should transition to the "categorical_array" state', function() {
                sut.state.should.be.equal('categorical_array')
            })

            it('should return the type drop zone for the dragged variable', function() {
                sut.current.type.should.be.equal('categorical_array')
            })
        })

        describe('given the variable type is "datetime"', function() {
            beforeEach(function() {
                sut.handle('link:started', {}, draggingData('/var/123', 'datetime'))
            })

            it('should transition to the "datetime" state', function() {
                sut.state.should.be.equal('datetime')
            })

            it('should return the type drop zone for the dragged variable', function() {
                sut.current.type.should.be.equal('datetime')
            })
        })

        describe('given a variable without a typed dropzone', function() {
            beforeEach(function() {
                sut.handle('link:started', {}, draggingData('/var/123', 'string'))
            })

            it('should transition to the "categorical" state', function() {
                sut.state.should.be.equal('categorical')
            })

            it('should return the categorical drop zone model', function() {
                sut.current.type.should.be.equal('categorical')
            })
        })

    })
})
