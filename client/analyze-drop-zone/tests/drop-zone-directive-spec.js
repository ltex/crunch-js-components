'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , dropZoneTpl = require('../drop-zone.html')
    , MockMachine = require('../../test-support/mock-machine')
    ;

describe('dropZoneDirective', function() {
    var sut
        , scope
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function($rootScope, $templateCache, $compile) {
            $templateCache.put('/analyze-drop-zone/drop-zone.html', dropZoneTpl)
            $templateCache.put('/analyze-drop-zone/table.html', '<div class="table-zone"></div>')
            $templateCache.put('/analyze-drop-zone/graph.html', '<div class="graph-zone"></div>')
            scope = $rootScope.$new()
            buildMockObjects(scope)
            sut = $compile('<drop-zone analysis="analysis" drop-zone-cfg="dropZone" settings="settings"></drop-zone>')
            (scope)
        })
    }

    function buildMockObjects(scope) {
        var acm = scope.analyzeContextManager = new MockMachine()
            ;

        acm.getSetting = function() {
            return new MockMachine()
        }
        acm.currentAnalysis = new MockMachine()
        acm.currentAnalysis.hasArrayVariables = function(){}
        acm.currentAnalysis.isEmpty = function(){return true}

        scope.analysis = acm.currentAnalysis
        scope.settings = {
        }

        scope.dropZone = {
            current : 'table'
            , table : {}
            , graph : {}
        }
    }

    function flush() {
        scope.$digest()
    }

    describe('when dragging a variable', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            flush()
            scope.$broadcast('link:started')
        })

        it('should be visible', function() {
            sut.find('div.container').should.be.ok
        })
    })

    describe('when the display mode changes', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            flush()
            scope.dropZone.current = "graph"
            flush()
        })

        it('should update the drop zone template', function() {
            sut.find('.graph-zone').length.should.be.equal(1)
        })
    })
    describe('when clicking on a variable', function(){
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            flush()
            scope.$broadcast('variable.clicked', {variable: {}})
        })
        it('should add the variable', function(){
            scope.analyzeContextManager.currentAnalysis.handled.clean.should.be.ok
            scope.analyzeContextManager.currentAnalysis.handled['add-variable'].should.be.ok
        })
    })
})
