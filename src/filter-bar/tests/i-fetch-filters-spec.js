'use strict';


var mainModule = require('../index')
    ,mocks = require('angular-mocks')
    ;



describe('iFetchFilters',function(){
    var $httpBackend
        ,$rootScope
        ,fixtures
        ;
    beforeEach(function(){
        var mod = mainModule()

        mod.factory('currentDataset',function($q, Shoji){
            return {
                fetch : function() {
                    var res = Shoji(fixtures.dataset123.self)
                        .parse(fixtures.dataset123)
                    return $q.when(res)
                }
            }
        })

        mod.factory('iFetchCurrentUserDatasetPermissions', function($q) {
            return function() {
                return $q.when({
                    edit : true
                })
            }
        })

        mod.factory('iResourceUser',function($q){
            return {
                current: function() {
                    var res = { self:'/user001' }
                    return $q.when(res)
                }
            }
        })
        angular.mock.module(mod.name)
    })

    beforeEach(function(){
        inject(function(_$httpBackend_, _$rootScope_){
            $httpBackend = _$httpBackend_
            $rootScope = _$rootScope_
        })
    })
    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest()
    })
    beforeEach(function(){
        fixtures = {}
        fixtures.dataset123={
                self: '/datasets/123/'
                ,element: 'shoji:entity'
                ,urls: {
                    filters_url: '/filters/'
                    ,applied_filters_url: '/applied_filters/'
                }
            }
        fixtures.eligible = {
                self: '/filters/'
                ,element: 'shoji:catalog'
                ,index: {
                    '/f1': {
                        is_public: true
                        ,name: 'f1'
                        ,owner_id: '/user002'
                    }
                    ,'/f2': {
                        is_public: false
                        ,name: 'f2'
                        ,owner_id: '/user001'
                    }
                    ,'/f3': {
                        is_public: false
                        ,name: 'f3'
                        ,owner_id: '/user002'
                    }
                }
            }
        fixtures.applied = {
            self: '/applied_filters/'
            ,element: 'shoji:view'
            ,value: {
                groups: [
                    {
                        entities: ['/f3']
                    }
                ]
            }
        }
    })
    function flush(){
        $httpBackend.flush()
        $rootScope.$digest()
    }
    function GET(fixture){
        $httpBackend.expectGET(fixture.self)
            .respond(200,fixture,{
                ALLOW: 'GET'
            })
    }
    describe('when fetched',function(){
        var result
        beforeEach(function(){
            GET(fixtures.applied)
            GET(fixtures.eligible)

        })
        beforeEach(function(){
            inject(function(iFetchFilters){
                iFetchFilters({
                    datasetId :'/datasets/123/'
                }).then(function(res){
                    result= res
                })
                flush()
            })
        })

        it('should expose eligible filters',function(){
            result.eligible['/f1'].should.be.truthy
        })

        it('should expose applied filters',function(){
            result.applied[0].should.eql('/f3')
        })

        describe('given a filter is public and the current user has editor rights over the dataset', function() {

            it('should set editable to true', function() {
                result.eligible['/f1'].editable.should.be.true
            })
        })

        describe('given a filter is not public but the current user is the filter\'s owner', function() {

            it('should set editable to true', function() {
                result.eligible['/f2'].editable.should.be.true
            })
        })
    })


})
