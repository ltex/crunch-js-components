'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('xtabFactory', function() {
    var sut
        , iFetchRelevantComparisons
        ;

    function buildModule() {
        var main = mainMod()
            ;

        main.factory('iFetchRelevantComparisons', function($q) {
            iFetchRelevantComparisons = function() {
                return iFetchRelevantComparisons.comparisonsAvailable ?
                    $q.when({}) :
                 $q.reject(new Error('comparisons not available'))
            }
            return iFetchRelevantComparisons
        })

        main.factory('displayCube', function() {
            return function displayCube(data, params) {
                return {
                    comparisons : params.comparisons
                    , analysis : params.analysis
                    , settings : params.settings
                }
            }
        })

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function(xtabFactory) {
            sut = xtabFactory
        })
    }

    function flush() {
        angular.mock.inject(function($rootScope) {
            $rootScope.$digest()
        })
    }

    beforeEach(buildModule)
    beforeEach(buildSut)

    context('when building a new xtab', function() {

        context('given comparisons are available', function() {
            var xtab
                , analysis
                ;

            beforeEach(function() {
                iFetchRelevantComparisons.comparisonsAvailable = true
                analysis = {
                    variables : [
                        '/var/123'
                        , '/var/456'
                    ]
                    , data : {}
                }
                sut.getXtab({
                    analysis : analysis
                }).then(function(_xtab) {
                    xtab = _xtab
                })
                flush()
            })

            it('should return an xtab that contains comparisons', function() {
                expect(xtab.comparisons).to.eql({})
            })
        })

        context('given comparisons are unavailable', function() {
            var xtab
                , analysis
                , settings
                ;

            beforeEach(function() {
                iFetchRelevantComparisons.comparisonsAvailable = false
                analysis = {
                    variables : [
                        '/var/123'
                        , '/var/456'
                    ]
                    ,data : {}
                }
                settings = {}

                sut.getXtab({
                    analysis : analysis
                    , settings : settings
                }).then(function(_xtab) {
                    xtab = _xtab
                })
                flush()
            })

            it('should return an xtab that contains the analysis and settings', function() {
                expect(xtab.analysis).to.eql(analysis)
                expect(xtab.settings).to.equal(settings)
            })
        })
    })


})