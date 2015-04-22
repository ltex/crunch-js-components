'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('dropZoneUtils', function() {
    var sut
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function(dropZoneUtils) {
            sut = dropZoneUtils
        })
    }

    beforeEach(buildModule)
    beforeEach(buildSut)

    describe('when getting the variable id from a drop event', function() {
        var id
            ;

        beforeEach(function() {
            id = sut.getVariableId({ dragged : { data : { self : '/var/123' } } })
        })

        it('should extract it from the drop event data', function() {
            id.should.be.equal('/var/123')
        })
    })
})
