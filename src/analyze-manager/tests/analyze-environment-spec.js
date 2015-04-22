'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('analyzeEnvironment', function() {
    var sut
        ;

    function buildModule() {
        var main = mainMod()
            ;


        main.factory('bus', function() {
            return {
                events : []
                , publish : function(params) {
                    this.events.push(params)
                }

            }
        })

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function(analyzeEnvironment) {
            sut = analyzeEnvironment
        })
    }

    describe('when initializing', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)


        it('should transition to "listening" state', function() {
            sut.state.should.be.equal('listening')
        })
    })

    describe('when notifying an analysis was loaded', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.handle('analysis.loaded', {
                data: {cube: { query: {}}} // thing it's listening to has this
            })
        })

        it('should publish filter.clobbered event', function() {
            inject(function(bus) {
                bus.events[0].event.should.be.equal('filter.clobbered')
            })
        })


        it('should publish analysis.weight event', function() {
            inject(function(bus) {
                bus.events[1].event.should.be.equal('analysis.weight')
            })
        })
    })
})
