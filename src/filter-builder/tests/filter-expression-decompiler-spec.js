var mainMod = require('../index')
    , datasetFixture = require('../../test-support/common-test-fixtures/dataset-simple')
    , frequenciesCategoricalFixture = require('../../test-support/common-test-fixtures/variable-frequencies-categorical')
    , categoricalVariableFixture = require('../../test-support/common-test-fixtures/categorical-variable')


describe('FilterExpressionDecompiler', function() {

    var sut
    var filterURL = '/dataset/123/filters/aaa/'

    var compiledFilter = {
        "self": filterURL,
        "expression": {
            "name": 'test filter',
            "function": "AND",
            "args": [
                {
                    "function": "in",
                    "args": [
                        {'variable': '000000'},
                        {
                            "column": [
                                1
                            ],
                             type: {
                              "function": "typeof",
                              "args": [{"variable": '000000'}]
                        }}]
                },
                {
                    "function": "in",
                    "args": [
                        {'variable': '000000'},
                        {
                            "column": [
                                2
                            ],
                            type: {
                              "function": "typeof",
                              "args": [{"variable": '000000'}]
                            }}]
                }
            ]
        }
    }

    beforeEach(function() {

        var mod = mainMod('filterBuilder.test')

        mod.factory('iResourceDataset', function($q, Shoji) {
            return function() {
                return $q.when(Shoji(datasetFixture.self).parse(datasetFixture))
            }
        });

        mod.factory('iResourceVariable', function($q, Shoji) {
            return function(q) {

                //override the variable ids
                var resp = Shoji(categoricalVariableFixture.self).parse(categoricalVariableFixture)
                resp.id = q.variableId
                resp.self = q.variableId

                resp.urls.frequencies.map = function(){
                    var fixture = {'/api/datasets/123/variables/000000/': frequenciesCategoricalFixture
                                   //'/api/datasets/123/variables/000002/':frequenciesNumericFixture,
                                   //'/api/datasets/123/variables/000001/':frequenciesDateFixture
                                  }[q.variableId]

                    var resp = Shoji(fixture.self).parse(fixture)
                    return $q.when(resp)
                }

                return $q.when(resp)
            }
        })


        angular.mock.module(mod.name)

    })

    beforeEach(function(){
           inject(function(filterDecompiler) {
            sut = filterDecompiler
           })


    })

    function flush(){
     angular.mock.inject(function($rootScope) {
            $rootScope.$digest()
        })
    }

    describe('testing decompilation', function() {
        it(
            'should decompile the server filter to a filter usable by the ctrl', function() {
                var decompiled = sut(compiledFilter, datasetFixture)

                decompiled.then(function(actual){

                    actual.self.should.equal(compiledFilter.self)
                    actual.expressions.length.should.eql(2)
                    Object.keys(actual.expressions[0].categories).length.should.eq(7)
                    actual.junctions.should.eql(['AND'])
                })

                flush()
            })
    })
})
