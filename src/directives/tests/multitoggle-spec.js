'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , trigger = require('simulate-event')
    ;

describe('MultitoggleDirective', function() {
    var sut
        , scope
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function($rootScope, $compile) {
            scope = $rootScope.$new()
            scope.options = getOptions()
            sut = $compile('<button data-multitoggle data-multitoggle-user-model="userModel" data-multitoggle-hidden="hidden" ng-model="currentValue" data-on-change="onChange()" data-multitoggle-options="options">multitoggle</button>')(scope)
        })
    }

    function getOptions() {
        return [{
                display: 'row'
                , value: 'rowPct'
            }
            , {
                display: 'col'
                , value: 'colPct'
            }
            , {
                display: 'cell'
                , value: 'cellPct'
            }
        ]
    }

    function flushTimer() {
        angular.mock.inject(function($timeout) {
            $timeout.flush()
        })
    }

    function flush() {
        scope.$digest()
    }

    beforeEach(buildModule)

    describe('when compiling', function() {

        describe('given the initial option is col', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                scope.currentValue = 'colPct'
                flush()
            })

            it('should display the current value display label', function() {
                sut[0].innerText.should.contain('col')
            })
        })

        describe('given the initial option does not exist', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                scope.currentValue = 'rowPct'
                flush()
                scope.currentValue = 'random'
                flush()
            })

            it('should not change the current option', function() {
                sut[0].innerText.should.contain('row')
            })
        })
    })

    describe('when setting a new value', function() {

        describe('given an onChange listener', function() {
            var triggered = false
                ;

            beforeEach(buildSut)
            beforeEach(function() {
                scope.onChange = function() {
                    triggered = true
                }

                flush()
                sut.trigger('click')
                flushTimer()
            })

            it('should call the onChange listener', function() {
                triggered.should.be.true
            })
        })
    })

    describe('when setting hidden', function() {
        beforeEach(buildSut)
        beforeEach(function() {
            scope.hidden = true
            flush()
        })

        it('should hide the control', function() {
            sut[0].style.display.should.equal('none')
        })
    })
})
