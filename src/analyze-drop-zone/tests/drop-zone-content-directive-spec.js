'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , dropZoneContentTpl = require('../drop-zone-content.html')
    , trigger = require('simulate-event')
    ;

describe('dropZoneContentDirective', function() {
    var sut
        , scope
        , slice = Array.prototype.slice
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function($rootScope, $templateCache, $compile) {
            $templateCache.put('/analyze-drop-zone/drop-zone-content.html', dropZoneContentTpl)

            scope = $rootScope.$new()
            sut = $compile('<div><drop-zone-content></drop-zone-content></div>')(scope)
        })
    }

    function flush() {
        scope.$digest()
    }

    function timeoutFlush() {
        inject(function($timeout) {
            $timeout.flush()
        })
    }

    describe('when moving the mouse over the drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            flush()
            scope.$broadcast('dragover')
            timeoutFlush()
        })

        it('should show dragged variable', function() {
            expect(slice.call(sut[0].querySelector('span.dragged').classList))
            .to.not.contain('ng-hide')
        })
    })

    describe('when moving the mouse out of the drop zone', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            flush()
            scope.$broadcast('dragover')
            timeoutFlush()
            scope.$broadcast('dragleave')
            timeoutFlush()
        })

        it('should show the current variable', function() {
             expect(slice.call(sut[0].querySelector('span.current').classList))
             .to.not.contain('ng-hide')
             expect(slice.call(sut[0].querySelector('span.dragged').classList))
             .to.contain('ng-hide')
        })
    })
})
