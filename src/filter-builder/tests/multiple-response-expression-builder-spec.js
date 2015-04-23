var mainModule = require('../index')

describe('MultipleResponseExpressionBuilder', function() {
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
                , type: 'multiple_response'
                , dataset_id: 111
            }
            , urls: {
                frequencies_url: '/var/frequencies/'
                , dataset_url: '/datasets/111/'
            }
        }
        , datasets_url: '/datasets/'
        , dataset: {
            element: 'shoji:entity'
            , self: '/datasets/111/'
            , id: 111
            , name: 'dataset name'
            , urls: {
                summary_url: '/dataset/111/summary/'
            }
        }
        , summary: {
            'rows': {
                'filtered': 5
                ,'total': 10
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
            }
        ]
    }

    beforeEach(function() {
        var mod = mainModule('filters.test')

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
        mod.factory('iResourceDataset', function(
            Shoji, $q) {
            return function execute(q) {
                var res = Shoji(fixtures.dataset.self)
                    .parse(fixtures.dataset);
                return $q.when(res)
            }
        });
        angular.mock.module('filters.test')
    });
    beforeEach(function() {
        inject(function(
            multipleResponseExpressionBuilder) {
            sut = multipleResponseExpressionBuilder.create()
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
        describe('given a variable', function() {
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
        });
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
                    sut.id.should.equal('myid')
                })
        })
    });
    describe('when selecting an option', function() {
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
        it('should update selectedRows from the server', function() {
            var filter_get_syntax =
                '%7B%22expression%22:%7B%22function%22:%22any%22,%22args%22:%5B%7B%22variable%22:%22myid%22%7D,%7B%22column%22:%5B11,12%5D%7D%5D%7D%7D'
            $httpBackend.expectGET(fixtures.dataset
                .urls.summary_url +
                '?filter_syntax=' +
                filter_get_syntax)
                .respond(200, fixtures.summary, headers);
            sut.categories[11].isSelected = true;
            sut.categories[12].isSelected = true;
            sut.pickerOption.should.equal('is any of')
            sut.updateCases();
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
            build.function.should.equal('any');
            build.args[0].variable.should.equal('myid')
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
                'function': 'any'
                ,'args': [{
                    'variable': 'myid'},
                    {'column': [
                        11, 12
                    ]}]
            }
            var decompiled = sut.decompile(fVar);
            decompiled.hasSource.should.be.true;
            decompiled.categories[11].isSelected.should.be.true;
            decompiled.categories[13].isSelected.should.be.false
        })
        it('should decompile the right function', function() {
            var fVar = {
                'function': 'any'
                ,'args': [{
                    'variable': 'myid'},
                    {'column': [
                        11, 12
                    ]}]
            }
            var decompiled = sut.decompile(fVar);
            decompiled.pickerOption.should.equal('is any of');
            var fVar = {
                'function': 'any'
                ,'args': [{
                    'variable': 'myid'},
                    {'column': [
                        11, 12
                    ]}]
            }
            var decompiled = sut.decompile(fVar);
            decompiled.pickerOption.should.equal('is any of');
            var fVar = {
                'function': 'all'
                ,'args': [{
                    'variable': 'myid'},
                    {'column': [
                        11, 12
                    ]}]
            }
            var decompiled = sut.decompile(fVar);
            decompiled.pickerOption.should.equal('is all of');
            var fVar = {
                'function': 'not',
                args: [{

                'function': 'any'
                ,'args': [{
                    'variable': 'myid'},
                    {'column': [
                        11, 12
                    ]}]
            }]}

            var decompiled = sut.decompile(fVar);
            decompiled.pickerOption.should.equal('is not any of');
            var fVar = {
                'function': 'not',
                args: [{

                'function': 'all'
                ,'args': [{
                    'variable': 'myid'},
                    {'column': [
                        11, 12
                    ]}]
            }]}
            var decompiled = sut.decompile(fVar);
            decompiled.pickerOption.should.equal('is not all of');
        })
    })
})
