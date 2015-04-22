'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('ToggleableSetting', function() {
    var ToggleableSetting
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function(_ToggleableSetting_) {
            ToggleableSetting = _ToggleableSetting_
        })
    }

    describe('when initializing', function() {
        var sut
            ;

        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut = ToggleableSetting.create({
                name : 'slicesOrGroups'
                , values : ['slices', 'groups']
                , disabled: true
                , hidden: true
                , value: 'slices'
            })
        })

        it('should transition to the setting default value', function() {
            sut.state.should.be.equal('slices')
        })

        it('should define a state for every option', function() {
            sut.states.slices.should.be.ok
            sut.states.groups.should.be.ok
        })

        it('should have extra properties', function() {
            sut.hidden.should.be.true
        })
    })

    describe('when switching between options', function() {
        var sut
            , triggered = false
            ;

        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut = ToggleableSetting.create({
                name : 'percentageDirection'
                , values : ['colPct', 'rowPct', 'cellPct']
                , disabled: true
                , hidden: true
                , value: 'colPct'
            })

            sut.on('percentageDirection.changed', function(value) {
                triggered = true
            })

            sut.handle('toggle')
        })

        it('should trigger settings.changed event', function() {
            triggered.should.be.equal(true)
        })

        it('should transition to the new value', function() {
            sut.state.should.be.equal('rowPct')
        })
    })

    describe('when switching to a specific option', function() {
        var sut
            , triggered = false
            ;

        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut = ToggleableSetting.create({
                name : 'percentageDirection'
                , values : ['colPct', 'rowPct', 'cellPct']
                , disabled: true
                , hidden: true
                , value: 'colPct'
            })

            sut.on('percentageDirection.changed', function(value) {
                triggered = true
            })

            sut.handle('cellPct')
        })

        it('should trigger settings.changed event', function() {
            triggered.should.be.equal(true)
        })

        it('should transition to the new value', function() {
            sut.state.should.be.equal('cellPct')
        })
    })

    describe('given a setting with numeric or boolean options', function() {
        var decimalPlaces
            , showSignif
            , percentageDirection
            , triggered = false
            ;

        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            decimalPlaces = ToggleableSetting.create({
                name : 'decimalPlaces'
                , values : [0, 1, 2]
                , disabled: true
                , hidden: true
                , value: 0
            })

            showSignif = ToggleableSetting.create({
                name : 'showSignif'
                , values : [true, false]
                , disabled: true
                , hidden: true
                , value: true
            })

            percentageDirection = ToggleableSetting.create({
                name : 'percentageDirection'
                , values : ['colPct', 'rowPct', 'cellPct']
                , disabled: true
                , hidden: true
                , value: 'colPct'
            })
        })

        describe('when getting the setting current value', function() {

            it('should be of the available options data type', function() {
                expect(typeof decimalPlaces.value).to.equal('number')
                expect(typeof showSignif.value).to.equal('boolean')
                expect(typeof percentageDirection.value).to.equal('string')

                showSignif.value = false

                expect(showSignif.false).to.be.true
                expect(showSignif.value).to.be.false

                decimalPlaces.value = 1

                expect(decimalPlaces.value).to.equal(1)
                expect(decimalPlaces[1]).to.be.true
            })
        })
    })
})
