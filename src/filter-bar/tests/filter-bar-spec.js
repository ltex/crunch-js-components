'use strict';

var mainModule = require('../index')
    ,mocks = require('angular-mocks')
    ;
// WDC TODO test for managing applied/removed/created events from bus
describe('filterBar',function(){

    var sut
        ,fixtures
        ,commands
        ,events
        ;

    function buildModule(filters){
        commands = []
        events = []
        filters = filters || fixtures.havingAppliedFilters
        var mod = mainModule()
        mod.factory('iFetchFilters',function($q){
            return function execute(q){
                    //TODO we need a toObject
                return $q.when(filters)
            }
        })
        mod.factory('bus',function(){
            return {
                send:  commands.push.bind(commands)
                ,publish: events.push.bind(events)
            }
        })
        mod.factory('$state',function(){
            return true
        })
        angular.mock.module(mod.name)
    }

    function flush(){
        inject(function($rootScope){
            $rootScope.$digest()
        })
    }
    beforeEach(function(){
        fixtures = {
            havingAppliedFilters: {
                catalogId: '/filters/123/'
                ,datasetId: '/a'
                //this comes from the 'eligible_filters' endpoint
                ,eligible: {
                    '/f1': {
                        is_public: false
                        ,name: 'f1'
                        ,self: '/f1'
                    }
                    ,'/f2': {
                        is_public: true
                        ,name: 'f2'
                        ,self: '/f2'
                    }
                    ,'/f3': {
                        is_public: false
                        ,name: 'f3'
                        ,self: '/f3'
                    }
                }
                ,applied: ['/f3']
            }
            ,havingNoAppliedFilters: {
                catalogId: '/filters/123/'
                ,datasetId: '/a'
                ,eligible: {
                    '/f1': {
                        is_public: false
                        ,name: 'f1'
                    }
                    ,'/f2': {
                        is_public: true
                        ,name: 'f2'
                    }
                    ,'/f3': {
                        is_public: false
                        ,name: 'f3'
                    }
                }
                ,applied: []
            }
        }
    })


    describe('when created',function(){
        describe('given no applied filters',function(){
            beforeEach(function(){
                buildModule(fixtures.havingNoAppliedFilters)
            })
            beforeEach(function(){
                inject(function(filterBar){
                    filterBar.handle('initialize', {
                        datasetId: '/a'
                    })
                    sut = filterBar
                    flush()
                })

            })
            it('should be unfiltered',function(){
                sut.state.should.equal('unfiltered')
            })
        })

        describe('when dataset.opened event is received', function() {
            beforeEach(function(){
                buildModule(fixtures.havingAppliedFilters)
            })
            beforeEach(function(){
                inject(function(filterBar){
                    filterBar.handle('dataset.opened', {
                        datasetId: '/a'
                    })
                    sut = filterBar
                    flush()
                })
            })

            it('should initialize the filterBar',function(){
                sut.appliedFilters.length.should.equal(1)
            })
        })

        describe('given applied filters',function(){
            beforeEach(function(){
                buildModule(fixtures.havingAppliedFilters)
            })
            beforeEach(function(){
                inject(function(filterBar){
                    filterBar.handle('initialize', {
                        datasetId: '/a'
                    })
                    sut = filterBar
                    flush()
                })
            })
            it('should expose appliedFilters',function(){
                sut.appliedFilters.length.should.equal(1)
            })
        })

    })
    describe('given filtered',function(){
        beforeEach(function(){
            buildModule(fixtures.havingAppliedFilters)
        })
        beforeEach(function(){
            inject(function(filterBar){

                filterBar.handle('initialize', {
                    datasetId: '/a'
                })
                sut = filterBar
                flush()
                sut.state.should.equal('filtered')
            })

        })
        describe('when replacing an applied filter',function(){
            beforeEach(function(){
                sut.handle('replace', {self: '/f3'})
                sut.state.should.equal('replacing')
            })
            beforeEach(function(){
                sut.handle('apply', {
                    self: '/f2'
                })
            })

            it('should send the replaceFilter command',function(){
                commands[0].should.eql({
                    command: 'replaceFilter'
                    ,id: '/a'
                    ,'previousFilterId': '/f3'
                    ,'filterId': '/f2'
                })

            })

            it.skip('should update eligibleFilters',function(){
                sut.eligibleFilters.should.not.contain
                    .something.with.property('self','/f2')
            })
            it.skip('should update appliedFilters',function(){
                sut.appliedFilters.should.contain.something
                    .with.property('self','/f2')

            })
            it('should be filtered',function(){
                sut.state.should.equal('filtered')
            })
        })
        describe('when appending an eligible filter',function(){
            beforeEach(function(){
                sut.handle('append')
                sut.state.should.equal('appending')
            })
            beforeEach(function(){
                sut.handle('apply', {
                    self: '/f2'
                })
            })

            it('should send the applyFilter command',function(){
                commands[0].should.eql({
                    command: 'applyFilter'
                    ,id: '/a'
                    ,filterId: '/f2'
                })

            })
            it.skip('should update eligibleFilters',function(){
                sut.eligibleFilters.should.not.contain
                    .something.with.property('self','/f2')
            })
            it.skip('should update appliedFilters',function(){
                sut.appliedFilters.should.contain.something
                    .with.property('self','/f2')

            })
            it('should be filtered',function(){
                sut.state.should.equal('filtered')
            })
            it('should return the name of a filter by id', function(){
                var name = sut.getFilterName('/f2')
                name.should.equal('f2')
            })
        })
        describe.skip('when appending reaching the max number of filters',function(){
            beforeEach(function(){
                sut.handle('append')
                sut.state.should.equal('appending')
                sut.handle('apply', {
                    self: '/f2'
                })
            })
            beforeEach(function(){
                sut.handle('append')
                sut.state.should.equal('appending')
                sut.handle('apply', {
                    self: '/f1'
                })
            })

            it('should be max',function(){
                sut.limitReached.should.be.true
                sut.state.should.equal('max')
            })
        })
        describe('when removing a filter while in replacement',function(){
            beforeEach(function(){
                sut.handle('replace', {self: '/f3'})
                sut.state.should.equal('replacing')
            })
            beforeEach(function(){
                sut.handle('unapply')
            })
            it('should send unapplyFilter',function(){
                commands[0].should.eql({
                    command: 'removeFilter'
                    ,id: '/a'
                    ,filterId: '/f3'
                })
            })
        })
        describe('when loading a saved analysis (clobber)', function(){
            describe('even when no filters are applied', function(){
                beforeEach(function(){
                    sut.handle('filter.clobbered', 'filter.clobbered', {filterIds: []})
                })
                it('should "set" the empty array it receives to the dataset', function(){
                    commands[0].filters.should.eql([])
                })
            })
        })

    })

})
