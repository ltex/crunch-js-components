'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , analyzeTitleTpl = require('../analyze-title.html')
    ;

describe('analyzeTitleDirective', function() {
    var sut
        , scope
        , analysis
        , settings
        , xtab
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        analysis = {
            hasArrayVariables : function() { return false }
            , isBivariate : function() { return false }
            , hasMeanMeasure : function() { return false }
            , isEmpty : function() { return false }
        }
        settings = { tableOrGraph : {} }
        xtab = {
            title : 'title'
            , subtitle : 'subtitle'
        }

        angular.mock.inject(function($rootScope, $templateCache, $compile) {
            scope = $rootScope.$new()

            scope.analysis = analysis
            scope.settings = settings
            scope.xtab = xtab

            $templateCache.put('/analyze/analyze-title.html', analyzeTitleTpl)

            sut = $compile('<analyze-title analysis="analysis" xtab="xtab" settings="settings"></analyze-title>')(scope)
        })
    }

    function flush() {
        scope.$digest()
        sut.data().$analyzeTitleController.init()
        scope.$digest()
    }

    beforeEach(buildModule)

    context('when compiling', function() {

        context('given an analysis with categorical arrays', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                analysis.hasArrayVariables = function() { return true }
                flush()
            })

            it('should display the analysis title', function() {
                expect(sut.find('.analysis-title').text()).to.contain(xtab.title)
            })
        })

        context('given a bivariate analysis', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                analysis.isBivariate = function() { return true }
                flush()
            })

            it('should display the analysis title', function() {
                expect(sut.find('.analysis-title').text()).to.contain(xtab.title)
            })
        })

        context('given a univariate analysis represented by a barchart', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                settings.tableOrGraph.graph = true
                analysis.graphType = 'barchart'
                flush()
            })

            it('should not display the analysis title', function() {
                expect(sut.find('.analysis-title').text()).to.not.contain(xtab.title)
            })
        })

        context('given an analysis with array variable and means', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                analysis.hasArrayVariables = function() { return true }
                analysis.hasMeanMeasure = function() { return true }
                flush()
            })

            it('should display the remove mean button', function() {
                expect(sut.find('.remove-mean-measure').length).to.equal(1)
            })
        })
    })
})