var filtersModule = require('../index')
    ,mocks = require('angular-mocks')
    ;



module.exports = (function() {
    'use strict';

    describe('ApplyFilterHandler', function() {
        var $httpBackend
            , Shoji
            , events;
        beforeEach(function() {
            events = [];
            var mod = filtersModule('filters.test');
            mod.factory('bus', function() {
                return {
                    publish: function(e) {
                        events.push(e)
                    }
                }
            });
            angular.mock.module('filters.test')
        });
        beforeEach(function(){
            inject(function(_$httpBackend_, _Shoji_) {
                $httpBackend = _$httpBackend_;
                Shoji = _Shoji_
            });

        })
        afterEach(function() {
            try {
                inject(function($rootScope) {
                    $rootScope.$destroy();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest()
                })
            } catch (err) {
                console.error(err)
            }
        });
        describe('given duplicate filters',function(){
            describe('when executed', function() {
                beforeEach(function() {
                    var headers = {
                        ALLOW: 'GET,POST,PUT,DELETE'
                    };
                    $httpBackend.expectGET(
                        '/datasets/123/')
                        .respond(200, {
                            element: 'shoji:entity'
                            , self: '/datasets/123/'
                            , body: {
                                id: '123'
                            }
                            , urls: {
                                applied_filters_url: '/datasets/123/applied_filters/'
                            }
                        }, headers);
                    $httpBackend.expectGET(
                        '/datasets/123/applied_filters/')
                        .respond(200, {
                            element: 'shoji:view'
                            , self: '/datasets/123/applied_filters/'
                            ,value:{
                                groups: [
                                    {
                                    entities: [
                                        '/datasets/123/filters/111/'
                                        , '/datasets/123/filters/222/'
                                        , '/datasets/123/filters/456/'
                                    ]
                                    ,group: 'default'
                                    }
                                ]
                            }
                        }, headers);
                    $httpBackend.expectPUT('/datasets/123/applied_filters/',
                        {
                            element: 'shoji:view',
                            value: {
                                groups:[
                                    {
                                        entities: [
                                            '/datasets/123/filters/111/'
                                            , '/datasets/123/filters/222/'
                                            , '/datasets/123/filters/456/'
                                        ]
                                        ,group: 'default'
                                    }
                                ]
                            }
                        }
                    )
                        .respond(204, {}, headers);
                    $httpBackend.expectGET(
                        '/datasets/123/applied_filters/')
                        .respond(200, {
                            element: 'shoji:view'
                            , self: '/datasets/123/applied_filters/'
                            ,value:{
                                groups: [
                                    {
                                    entities: [
                                        '/datasets/123/filters/111/'
                                        , '/datasets/123/filters/222/'
                                        , '/datasets/123/filters/456/'
                                    ]
                                    ,group: 'default'
                                    }
                                ]
                            }
                        }, headers)
                });
                it(
                    'should apply filters to the dataset, with most recent first', function() {
                        inject(function(applyFilterHandler) {
                            var cmd = {
                                id: '/datasets/123/'
                                , command: 'addFilter'
                                , filterId: '/datasets/123/filters/456/'
                            };
                            applyFilterHandler(cmd);
                            $httpBackend.flush()
                        })
                    });
                it('should raise event', function() {
                    inject(function(applyFilterHandler) {
                        var cmd = {
                            id: '/datasets/123/'
                            , command: 'addFilter'
                            , filterId: '/datasets/123/filters/456/'
                        };
                        applyFilterHandler(cmd);
                        $httpBackend.flush()
                    });
                    events.should.include.something.deep.equal({
                        event: 'filter.applied'
                        , datasetId: '123'
                        , filterIds: [
                            '/datasets/123/filters/111/', '/datasets/123/filters/222/', '/datasets/123/filters/456/'
                        ]
                    })
                })
            })

        })
        describe('given unique filters',function(){
            describe('when executed', function() {
                beforeEach(function() {
                    var headers = {
                        ALLOW: 'GET,POST,PUT,DELETE'
                    };
                    $httpBackend.expectGET(
                        '/datasets/123/')
                        .respond(200, {
                            element: 'shoji:entity'
                            , self: '/datasets/123/'
                            , body: {
                                id: '123'
                            }
                            , urls: {
                                applied_filters_url: '/datasets/123/applied_filters/'
                            }
                        }, headers);
                    $httpBackend.expectGET(
                        '/datasets/123/applied_filters/')
                        .respond(200, {
                            element: 'shoji:view'
                            , self: '/datasets/123/applied_filters/'
                            ,value:{
                                groups: [
                                    {
                                    entities: [
                                        '/datasets/123/filters/111/'
                                        , '/datasets/123/filters/222/'
                                    ]
                                    ,group: 'default'
                                    }
                                ]
                            }
                        }, headers);
                    $httpBackend.expectPUT('/datasets/123/applied_filters/',
                        {
                            element: 'shoji:view',
                            value: {
                                groups:[
                                    {
                                        entities: [
                                            '/datasets/123/filters/111/'
                                            , '/datasets/123/filters/222/'
                                            , '/datasets/123/filters/456/'
                                        ]
                                        ,group: 'default'
                                    }
                                ]
                            }
                        }
                    )
                        .respond(204, {}, headers);
                    $httpBackend.expectGET(
                        '/datasets/123/applied_filters/')
                        .respond(200, {
                            element: 'shoji:view'
                            , self: '/datasets/123/applied_filters/'
                            ,value:{
                                groups: [
                                    {
                                    entities: [
                                        '/datasets/123/filters/111/'
                                        , '/datasets/123/filters/222/'
                                        , '/datasets/123/filters/456/'
                                    ]
                                    ,group: 'default'
                                    }
                                ]
                            }
                        }, headers)
                });
                it(
                    'should apply filters to the dataset, with most recent first', function() {
                        inject(function(applyFilterHandler) {
                            var cmd = {
                                id: '/datasets/123/'
                                , command: 'addFilter'
                                , filterId: '/datasets/123/filters/456/'
                            };
                            applyFilterHandler(cmd);
                            $httpBackend.flush()
                        })
                    });
                it('should raise event', function() {
                    inject(function(applyFilterHandler) {
                        var cmd = {
                            id: '/datasets/123/'
                            , command: 'addFilter'
                            , filterId: '/datasets/123/filters/456/'
                        };
                        applyFilterHandler(cmd);
                        $httpBackend.flush()
                    });
                    events.should.include.something.deep.equal({
                        event: 'filter.applied'
                        , datasetId: '123'
                        , filterIds: [
                            '/datasets/123/filters/111/', '/datasets/123/filters/222/', '/datasets/123/filters/456/'
                        ]
                    })
                })
            })

        })
    })
})
    .call(this);
