'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , testSupport = require('./test-support')()
    ;

describe('TypedDropZone', function() {
    var sut
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }


    function createAnalysisMock() {
        var analysis = {
                variables : {}
                , measures : {}
            }
            ;

        analysis.variables.at = function(index) {
            switch(index) {
                case 0: return { fullName : 'bar' }
                case 1: return { fullName : 'foo' }
                case 2: return { fullName : 'foobar' }
            }
        }

        analysis.measures.getMeasureVariable = function() {
            return { self : '/var/101112', fullName : 'barfoo' }
        }

        return analysis
    }

    function buildSut() {
        angular.mock.inject(function(TypedDropZone) {
            sut = new TypedDropZone()
            sut.analysis = createAnalysisMock()
            sut.slicesOrGroups = testSupport.slicesOrGroups
        })
    }

    beforeEach(buildModule)
    beforeEach(buildSut)

    describe('when initializing', function() {

        it('should be initialized', function() {
            sut.should.be.ok
        })
    })

    describe('when getting variable name for "row" zone', function() {
        var name
            ;

        beforeEach(function() {
            name = sut.getVariableName('row')
        })

        it('should return the name of the variable at index 0', function() {
            name.should.be.equal('bar')
        })
    })

    describe('when getting variable name for "column" zone', function() {
        var name
            ;

        beforeEach(function() {
            name = sut.getVariableName('column')
        })

        it('should return the name of the variable at index 1', function() {
            name.should.be.equal('foo')
        })
    })

    describe('when getting variable name for "mean" zone', function() {
        var name
            ;

        beforeEach(function() {
            name = sut.getVariableName('mean')
        })

        it('should return the name of the variable used as mean', function() {
            name.should.be.equal('barfoo')
        })
    })

    describe('when getting variable name for "table" zone', function() {
        var name
            ;

        beforeEach(function() {
            name = sut.getVariableName('table')
        })

        it('should return the name of the variable at index 0', function() {
            name.should.be.equal('bar')
        })
    })

    describe('when getting variable name for "slice" zone', function() {

        describe('given the slicesOrGroups setting equals groups', function() {
            var name
                ;

            beforeEach(function() {
                sut.slicesOrGroups.state = 'groups'
                name = sut.getVariableName('slice')
            })

            it('should return undefined', function() {
                expect(name).to.be.undefined
            })
        })

    })

})
