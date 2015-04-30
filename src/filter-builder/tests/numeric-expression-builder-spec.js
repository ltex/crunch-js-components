;
module.exports = (function() {
    'use strict';
    var mainModule = require('../index');
    var mocks = require('angular-mocks');

    describe('NumericExpressionBuilder', function() {
        var sut
            , $httpBackend
            , headers;
        headers = {
            ALLOW: 'GET,POST,PUT,DELETE'
        };
        var fixtures = {
            variable: {
                element: 'shoji:entity'
                , self: '/var/detail/'
                , body: {
                    name: 'someName'
                    , id: 'myid'
                }
                , urls: {
                    frequencies_url: '/var/frequencies/'
                }
            }
            , frequencies_url: '/var/frequencies/'
            , frequencies: [{
                    'count': 21
                    ,'id': 11
                    ,'name': 11
                    ,'missing': false
                }
                , {
                    'count': 88
                    ,'id': 12
                    ,'name': 12
                    ,'missing': false
                }
                , {
                    'count': 131
                    ,'id': 13
                    ,'name': 13
                    ,'missing': false
                }, {
                    'count': 2
                    ,'id': {'?': -1}
                    ,'name': 'No Data'
                    ,'missing': true
                }
            ]
        };
        beforeEach(function() {
            var mod = mainModule('filters.test');
            mod.factory('iResourceVariable', function(
                Shoji, $q) {
                return function execute(q) {
                    if (q.datasetId === '123' && q.variableId ===
                        'myid') {
                        var res = Shoji(fixtures.variable
                            .self)
                            .parse(fixtures.variable);
                        return $q.when(res)
                    }
                    throw new Error('Unexpected args', q)
                }
            });
            angular.mock.module('filters.test')
        });
        beforeEach(function() {
            inject(function(numericExpressionBuilder) {
                sut = numericExpressionBuilder.create()
            });
            inject(function(_$httpBackend_) {
                $httpBackend = _$httpBackend_
            })
        });
        describe('when initialized', function() {
            it('should not have a source', function() {
                sut.hasSource.should.be.false
            })
        });
        describe('when sourcing', function() {
            describe('given a query object', function() {
                beforeEach(function() {
                    $httpBackend.expectGET(
                        fixtures.frequencies_url +
                        '?exclude_exclusion_filter=false&ignore_filter=true')
                        .respond(200, fixtures.frequencies, headers);
                    var q = {
                        variableId: 'myid'
                        , datasetId: '123'
                    };
                    inject(function($q, $rootScope) {
                        sut.source(q)
                    });
                    $httpBackend.flush()
                });
                it('should assign attributes', function() {
                    sut.name.should.equal('someName');
                    sut.id.should.equal('myid');
                    sut.categories['?-1'].entryId['?'].should.equal(-1);
                })
            })
        });
        describe('When building filter', function() {
            beforeEach(function() {
                $httpBackend.expectGET(fixtures.frequencies_url +
                    '?exclude_exclusion_filter=false&ignore_filter=true')
                    .respond(200, fixtures.frequencies, headers);
                var q = {
                    variableId: 'myid'
                    , datasetId: '123'
                };
                inject(function($q, $rootScope) {
                    sut.source(q)
                });
                $httpBackend.flush()
            });
            it('should return a filter based on selected values', function() {
                var build = sut.build();
                build.function.should.equal('in');
                build.args[0].variable.should.equal('myid');
            })
        });
        describe('When decompiling', function() {
            beforeEach(function() {
                $httpBackend.expectGET(fixtures.frequencies_url +
                    '?exclude_exclusion_filter=false&ignore_filter=true')
                    .respond(200, fixtures.frequencies, headers);
                var q = {
                    variableId: 'myid'
                    , datasetId: '123'
                };
                inject(function($q, $rootScope) {
                    sut.source(q)
                });
                $httpBackend.flush()
            });
            it('should source from a raw filter variable', function() {
                var fVar = {
                    'function': 'in'
                    , 'args': [{
                        'variable': 'myid'}
                        , {'column': [
                            11, 12
                        ]}]
                    }

                var decompiled = sut.decompile(fVar);
                decompiled.hasSource.should.be.true;
                decompiled.pickerOption.should.equal('is any of')
                decompiled.categories[11].isSelected.should.be.true;
                decompiled.categories[13].isSelected.should.be.false
                decompiled.categories['?-1'].isSelected.should.be.false
            })
            it('should source from a raw filter variable with missing value', function() {
                var fVar = {
                    'function': 'in'
                    ,'args': [{
                        'variable': 'myid'},
                        {'column': [
                            11, {'?': -1}
                        ]}]
                    }

                var decompiled = sut.decompile(fVar);
                decompiled.hasSource.should.be.true;
                decompiled.categories[11].isSelected.should.be.true;
                decompiled.categories[12].isSelected.should.be.false;
                decompiled.categories[13].isSelected.should.be.false;
                decompiled.categories['?-1'].isSelected.should.be.true;
            })
        })
    })
})
    .call(this);
