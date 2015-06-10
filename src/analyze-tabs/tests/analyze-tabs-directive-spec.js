'use strict'

require('angular-mocks')

var mainMod = require('../index')
    , analyzeTabsTpl = require('../analyze-tabs.html')
    , MockMachine = require('../../test-support/mock-machine')

describe('analyzeTabsDirective', function() {
    var sut
        , scope
        , analyzeTabs
        ;

    function buildModule() {
        var main = mainMod()
            ;

        analyzeTabs = new MockMachine()

        main.factory('AnalyzeTabs', function() {
            return {
                create : function() {
                    return analyzeTabs
                }
            }
        })

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function($templateCache, $rootScope, $compile) {
            scope = $rootScope.$new()
            scope.analysis = {
                data : {
                    cube : {}
                }
            }
            $templateCache.put('/analyze-tabs/analyze-tabs.html', analyzeTabsTpl)
            sut = $compile('<analyze-tabs analysis="analysis"></analyze-tabs>')(scope)
        })
    }

    function flush() {
        scope.$digest()
    }

    beforeEach(buildModule)

    context('when compiling', function() {
        beforeEach(buildSut)

        context('given analyzeTabs is disabled', function() {
            beforeEach(function() {
                analyzeTabs.enabled = false
                flush()
            })

            it('should hide the tabs container', function() {
                expect(sut.find('ul.tabs-container').length).to.equal(0)
            })
        })

        context('given analyzeTabs is enabled', function() {
            beforeEach(function() {
                analyzeTabs.enabled = true
                analyzeTabs.tabs = [
                    { label : 'label 1', active : true }
                    , { label : 'label 2' }
                    , { label : 'label 3' }
                ]
                flush()
            })

            it('should show the tabs container', function() {
                expect(sut.find('ul.tabs-container').length).to.equal(1)
            })

            it('should display the tabs list', function() {
                analyzeTabs.tabs.forEach(function(tab,index) {
                    expect(sut.find('li.tab:nth(' + index + ')').text()).to.contain(tab.label)
                })
            })

            it('should set the active class to the active tab', function() {
                expect(sut.find('li.tab:nth(0)').hasClass('active')).to.be.true
            })
        })
    })


    context('when a tab is clicked', function() {
        beforeEach(buildSut)
        beforeEach(function() {
            analyzeTabs.enabled = true
            analyzeTabs.tabs = [
                { label : 'label 1', active : true }
                , { label : 'label 2' }
                , { label : 'label 3' }
            ]
            flush()
            sut.find('li.tab:first-child a').click()
        })

        it('should send select-tab message to the analyze', function() {
            expect(analyzeTabs.handled['select']).to.be.ok
            expect(analyzeTabs.handled['select'][0][0]).to.deep.contain({ label : 'label 1', active : true})

        })
    })
})