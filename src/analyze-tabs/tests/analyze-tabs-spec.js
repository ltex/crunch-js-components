'use strict'

require('angular-mocks')

var mainMod = require('../index')
    , mockBus = require('../../test-support/mock-bus')
    , MockMachine = require('../../test-support/mock-machine')
    ;

describe('AnalyzeTabs', function() {
    var AnalyzeTabs
        , bus
        ;

    function buildModule() {
        var main = mainMod()
            ;

        bus = mockBus()

        main.factory('bus', function() {
            return bus
        })

        angular.mock.module(main.name)
    }

    function buildSut(){
        angular.mock.inject(function(_AnalyzeTabs_) {
            AnalyzeTabs = _AnalyzeTabs_
        })
    }

    beforeEach(buildModule)
    beforeEach(buildSut)

    context('when initializing', function() {

        context('given a cube with 3 dimensions', function() {
            var sut
                ;

            beforeEach(function() {
                sut = AnalyzeTabs.create({
                    analysis : {
                        data : {
                            cube : {
                                dimension : 3
                                , _dimensions : [
                                    {
                                        labels : [
                                            'label 1'
                                            , 'label 2'
                                            , 'label 3'
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                })
            })

            it('should transition to enabled', function() {
                expect(sut.enabled).to.be.true
            })

            it('should initialize the tabs collection from the first dimension labels', function() {
                expect(sut.tabs).to.deep.equal([
                    {
                        label : 'label 1'
                        , active : true
                    }

                    , {
                        label : 'label 2'
                        , active : false
                    }

                    , {
                        label : 'label 3'
                        , active : false
                    }
                ])
            })
        })

        context('given a cube with less than 3 dimensions', function() {
            var sut
                ;

            beforeEach(function() {
                sut = AnalyzeTabs.create({
                    analysis : {
                        data : {
                            cube : {
                                dimension : 2
                            }
                        }
                    }
                })
            })

            it('should transition to disabled', function() {
                expect(sut.enabled).to.be.false
            })
        })
    })

    context('when selecting a tab', function() {
        var sut
            ;

        beforeEach(function() {
            sut = AnalyzeTabs.create({
                analysis : {
                    data : {
                        cube : {
                            dimension : 3
                            , _dimensions : [
                                {
                                    labels : [
                                        'label 1'
                                        , 'label 2'
                                        , 'label 3'
                                    ]
                                }
                            ]
                        }
                    }
                }
            })

            sut.handle('select', sut.tabs[1])
        })

        it('should set all other tabs as inactive', function() {
            expect(sut.tabs[0].active).to.be.false
        })

        it('should set the selected tab as active', function() {
            expect(sut.tabs[1].active).to.be.true
        })

        it('should publish analyzeTabs.selectionChanged event', function() {
            expect(bus.assertEventPublished('analyzeTabs.selectionChanged', { selectedTab : 1 }))
                .to.be.true
        })
    })

    context('when removing', function() {
        var sut
            , analysis
            ;
        beforeEach(function() {
            analysis = new MockMachine()
            analysis.data = { cube : { dimension : 3, _dimensions : [{ labels : [] }] } }

            sut = AnalyzeTabs.create({
                analysis : analysis
            })

            sut.handle('remove')
        })

        it('should send remove-variable message to the analysis model', function() {
            expect(analysis.handled['remove-variable']).to.be.ok
            expect(analysis.handled['remove-variable'][0][0]).to.equal(0)
        })
    })
})