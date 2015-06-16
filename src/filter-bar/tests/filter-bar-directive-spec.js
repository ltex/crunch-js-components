'use strict'

var mocks = require('angular-mocks')
    ,mainModule = require('../index')
    ,MockMachine = require('../../test-support/mock-machine')
    ,trigger = require('simulate-event')
    ,filterBarTpl = require('../filter-bar.html')
    ;

describe('FilterBarDirective', function() {
    var sut
        ,filterBarFsm
        ,scope
        ;

    function buildModule() {
        var mod = mainModule()
            ;

        filterBarFsm = new MockMachine()

        filterBarFsm.$scoped = function() {
            return filterBarFsm
        }

        mod.factory('filterBar', function() {
            return filterBarFsm
        })

        mod.factory('$state', function() {
            return {}
        })

        mod.factory('$stateParams', function() {
            return {}
        })

        angular.mock.module(mod.name)
    }

    function buildSut() {
        angular.mock.inject(function($injector) {
            var $rootScope = $injector.get('$rootScope')
                ,$compile = $injector.get('$compile')
                ,$templateCache = $injector.get('$templateCache')
                ;

            $templateCache.put('/filter-bar/filter-bar.html', filterBarTpl)

            scope = $rootScope.$new()

            sut = $compile('<filter-bar></filter-bar>')(scope)
        })
    }

    function flush() {
        scope.$digest()
    }

    describe('When clicking in the "Filters" label', function() {

        describe('given the dataset is unfiltered', function() {

            beforeEach(function() {
                buildModule()
                buildSut()
                flush()
            })

            beforeEach(function() {
                filterBarFsm.isUnfiltered = true
                flush()

                trigger(sut[0].querySelector('h1'), 'click')
                flush()
            })

            it('should send the append message', function() {
                filterBarFsm.handled['append'].should.be.ok
            })
        })

        describe('given the dataset is filtered', function() {

            beforeEach(function() {
                buildModule()
                buildSut()
                flush()
            })

            beforeEach(function() {
                filterBarFsm.isUnfiltered = false
                flush()

                trigger(sut[0].querySelector('h1'), 'click')
                flush()
            })

            it('should not send the append message', function() {
                expect(filterBarFsm.handled['append']).to.not.be.ok
            })
        })


    })
})
