'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('dropZoneContentMediator', function() {
    var sut
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function(dropZoneContentMediator) {
            sut = dropZoneContentMediator
        })
    }

    function getScope() {
        var scope
            ;

        angular.mock.inject(function($rootScope) {
            scope = $rootScope.$new()
        })

        return scope
    }

    function getDropZoneContentController(scope) {
        var ctrl
            ;

        return {
            zone : 'row'
            , hide : function() {
                scope.hidden = true
            }

            , name : function() {
                return this.zone
            }

            , show : function() {
                scope.hidden = false
            }
        }
    }

    function addZoneContent () {
        var scope = getScope()
            , ctrl = getDropZoneContentController(scope)
            ;

        sut.addZoneContent(ctrl, scope)
    }

    describe('when adding a drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(addZoneContent)

        it('should add the ctrl and scope to the zones array', function() {
            sut.getZones().length.should.equal(1)
        })
    })

    describe('when a drop zone is destroyed', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(addZoneContent)
        beforeEach(function() {
            sut.getZone('row').scope.$emit('$destroy')
        })

        it('should remove the zone from the zones array', function() {
            sut.getZones().length.should.equal(0)
        })
    })

    describe('when hiding a group of zones', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(addZoneContent)
        beforeEach(function() {
            sut.hide(['row'])
        })

        it('should hide all zones with the given name', function() {
            sut.getZone('row').scope.hidden.should.be.true
        })
    })

    describe('when showing all zones', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(addZoneContent)
        beforeEach(function() {
            sut.showAll()
        })

        it('should show all zones with the given name', function() {
            sut.getZones().forEach(function(zone) {
                zone.scope.hidden.should.be.false
            })
        })
    })
})
