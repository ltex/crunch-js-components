;
module.exports = (function() {
    'use strict';
    var mainModule = require('../index')
        ,mocks = require('angular-mocks')
        ,fixtures = require('./categorical-expression-builder-fixtures')
        ;



    describe('CategoricalExpressionBuilder', function() {
        var sut
            , $httpBackend
            , headers = {
                ALLOW: 'GET,POST,PUT,DELETE'
            };

        function GET(fixture, params) {
            $httpBackend.expectGET(fixture.self)
                .respond(200, fixture, headers)
        }
        beforeEach(function() {
            var mod = mainModule('filters.test');
            mod.factory('iResourceVariable', function(
                Shoji, $q) {
                return function execute(q) {
                    if (q.datasetId === '123' && q.variableId === '1') {
                        var res = Shoji(fixtures.variable
                            .self)
                            .parse(fixtures.variable);
                        return $q.when(res)
                    }
                    throw new Error('unexpected args', q)
                }
            });
            angular.mock.module('filters.test')
        });
        beforeEach(function() {
            inject(function(categoricalExpressionBuilder) {
                sut = categoricalExpressionBuilder.create()
            })
        });
        beforeEach(function() {
            inject(function(_$httpBackend_) {
                $httpBackend = _$httpBackend_
            })
        });
        describe('when initialized', function() {
            it('should not have source', function() {
                sut.hasSource.should.be.false
            })
        });
        describe('when sourcing', function() {
            describe('given queryobject', function() {
                beforeEach(function() {
                    GET(fixtures.frequencies);
                    var q = {
                        variableId: '1'
                        , datasetId: '123'
                    };
                    inject(function($q, $rootScope) {
                        sut.source(q)
                    });
                    $httpBackend.flush()
                });
                it('should assign attributes', function() {
                        sut.name.should.equal(
                            'myName');
                        sut.id.should.equal('1');
                        sut.categories['1'].isSelected
                            .should.be.false;
                        sut.categories['2'].isSelected
                            .should.be.false
                    })
            });
            describe('given variable', function() {
                it('should assign attributes', function() {
                        var summaryResource = {
                            value: [{
                                    name: 'cat1'
                                    , id: '1'
                                }
                                , {
                                    name: 'cat2'
                                    , id: '2'
                                }
                            ]
                        };
                        var summaryResponse = {
                            then: function(cb) {
                                cb(summaryResource);
                                return summaryResponse
                            }
                        };
                        var variable = {
                            name: 'myName'
                            , id: '1'
                            , urls: {
                                frequencies: {
                                    map: function(
                                        params) {
                                        params.params
                                            .ignore_filter
                                            .should.be
                                            .true;
                                        return summaryResponse
                                    }
                                }
                            }
                        };
                        sut.source(variable);
                        sut.name.should.equal(
                            'myName');
                        sut.id.should.equal('1');
                        sut.categories['1'].isSelected
                            .should.be.false;
                        sut.categories['2'].isSelected
                            .should.be.false
                    })
            })
        });
        describe('when building', function() {
            describe('given no source', function() {
                it('should not produce an expression', function() {
                        var exp = sut.build();
                        expect(exp)
                            .to.be.null
                    })
            });
            describe('given no selected categories', function() {
                    it(
                        'should produce expression without cats', function() {
                            var summaryResource = {
                                value: [{
                                        name: 'cat1'
                                        , id: '1'
                                    }
                                    , {
                                        name: 'cat2'
                                        , id: '2'
                                    }
                                ]
                            };
                            var summaryResponse = {
                                then: function(cb) {
                                    cb(summaryResource);
                                    return summaryResponse
                                }
                            };
                            var variable = {
                                name: 'myName'
                                , id: '1'
                                , urls: {
                                    frequencies: {
                                        map: function() {
                                            return summaryResponse
                                        }
                                    }
                                }
                            };
                            sut.source(variable);
                            var exp = sut.build();
                            exp.should.eql({
                                'function': 'in'
                                , args: [
                                    {variable: '1'}
                                    , {column: [],
                                         type: {
                                          "function": "typeof",
                                          "args": [{"variable": '1'}]
                                    }}]
                            })
                        })
                });
            describe('given a selected category', function() {
                    it(
                        'should produce expression based on category selections', function() {
                            var summaryResource = {
                                value: [{
                                        name: 'cat1'
                                        , id: '1'
                                    }
                                    , {
                                        name: 'cat2'
                                        , id: '2'
                                    }
                                ]
                            };
                            var summaryResponse = {
                                then: function(cb) {
                                    cb(summaryResource);
                                    return summaryResponse
                                }
                            };
                            var variable = {
                                name: 'myName'
                                , id: '1'
                                , urls: {
                                    frequencies: {
                                        map: function() {
                                            return summaryResponse
                                        }
                                    }
                                }
                            };
                            sut.source(variable);
                            sut.toggleCategorySelection('2');
                            var exp = sut.build();
                            exp.should.eql({
                                'function': 'in'
                                , args: [{variable: '1'}
                                    , {column: ['2'],
                                     type: {
                                          "function": "typeof",
                                          "args": [{"variable": '1'}]
                                    }}]
                            })
                        })
                })
        });
        describe('When decompiling', function() {
            it('should source from a raw filter variable', function() {
                    var summaryResource = {
                        value: [{
                                name: 'cat1'
                                , id: '1'
                            }
                            , {
                                name: 'cat2'
                                , id: '2'
                            }
                        ]
                    }
                    var summaryResponse = {
                        then: function(cb) {
                            cb(summaryResource);
                            return summaryResponse
                        }
                    }
                    var variable = {
                        name: 'myName'
                        , id: '1'
                        , type: 'categorical'
                        , urls: {
                            frequencies: {
                                map: function() {
                                    return summaryResponse
                                }
                            }
                        }
                    }
                    sut.source(variable);
                    var decompiled = sut.decompile({
                        'function': 'any'
                        ,'args': [{'variable': '055b14b837d740eaa1aaaed7a3b35be9'}
                                  ,{'column': [2]}
                        ]
                    })

                    decompiled.hasSource.should.be.true
                    decompiled.pickerOption.should.equal('is any of')
                    decompiled.categories[2].isSelected.should.be.true
                    decompiled.categories[1].isSelected.should.be.false
                })
        })
    });
    return
})
    .call(this);