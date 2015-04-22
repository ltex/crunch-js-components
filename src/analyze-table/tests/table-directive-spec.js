'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    , MockMachine = require('../../test-support/mock-machine')
    , analyzeTableTpl = require('../analyze-table.html')
    , tableTpl = require('../table.html')
    , noValidDataTable = require('../no-valid-data-table.html')
    ;

describe('analyzeTableDirective', function() {
    var sut
        , scope
        , xtab
        , analysis
        ;

    function buildModule() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    }

    function buildSut() {
        xtab = { rows : [1,2,3] }
        analysis = new MockMachine()

        angular.mock.inject(function($rootScope, $templateCache, $compile) {
            scope = $rootScope.$new()
            scope.xtab = xtab
            scope.analysis = analysis
            $templateCache.put('/analyze-table/table.html', tableTpl)
            $templateCache.put('/analyze-table/analyze-table.html', analyzeTableTpl)
            $templateCache.put('/analyze-table/no-valid-data-table.html', noValidDataTable)
            $templateCache.put('/analyze-table/title-variable.html', '<div></div>')

            sut = $compile('<analyze-table analysis="analysis" xtab="xtab"></analyze-table>')(scope)
        })
    }

    function flush() {
        scope.$digest()
    }

    beforeEach(buildModule)

    context('when compiling', function() {
        beforeEach(buildSut)
        beforeEach(function() {
            flush()
        })

        it('should display the data crosstab', function() {
            expect(sut.find('table').length).to.equal(1)
        })
    })


    context('when clicking remove row button', function() {
        beforeEach(buildSut)
        beforeEach(flush)
        beforeEach(function() {
            sut.find('.remove-row').trigger('click')
        })

        it('should send remove-variable a index 0 message to the analysis model', function() {
            expect(analysis.handled['remove-variable']).to.be.ok
            expect(analysis.handled['remove-variable'][0][0]).to.equal(0)

        })
    })

    context('given a bivariate table', function() {
        beforeEach(buildSut)
        beforeEach(function() {
            xtab.showColumnTitle = true
            flush()
        })

        context('when clicking remove column button', function() {
            beforeEach(function() {
                sut.find('.remove-column').trigger('click')
            })

            it('should send remove-variable a index 1 message to the analysis model', function() {
                expect(analysis.handled['remove-variable']).to.be.ok
                expect(analysis.handled['remove-variable'][0][0]).to.equal(1)

            })
        })
    })

    context('given a crosstab with means', function() {
        beforeEach(buildSut)
        beforeEach(function() {
            xtab.withMeans = true
            flush()
        })

        context('when clicking remove mean button', function() {
            beforeEach(function() {
                sut.find('.remove-mean-measure').trigger('click')
            })

            it('should send measures-count and recalculate messages to the analysis model', function() {
                expect(analysis.handled['measures-count']).to.be.ok
                expect(analysis.handled['recalculate']).to.be.ok
            })
        })
    })

    context('given a cross with no valid data', function() {
        beforeEach(buildSut)
        beforeEach(function() {
            xtab.rows = []
            flush()
        })

        it('should display the no valid data table', function() {
            expect(sut.find('tr td').text()).to.equal('No valid data')
        })
    })
})