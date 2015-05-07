var mainMod = require('../index')
var datasetFixture = require('../../test-support/common-test-fixtures/dataset-simple')
var frequenciesCategoricalFixture = require('../../test-support/common-test-fixtures/variable-frequencies-categorical')
var frequenciesMRFixture = require('../../test-support/common-test-fixtures/variable-frequencies-multiple-response')
var categoricalVariableFixture = require('../../test-support/common-test-fixtures/categorical-variable-fixture')
var mrVariableFixture = require('../../test-support/common-test-fixtures/variable-mr')
var datasetFixture = require('../../test-support/common-test-fixtures/dataset-simple')

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
    var compiledRelativeMRFilter = {
        "numeric_value": null,
        "id": 0,
        "name": "mris",
        "missing": false,
        "index": 0,
        "expression": {
            "function": "any",
            "args": [
                {
                    "variable": "../../00000d/"
                },
                {
                    "column": [
                        "000004",
                        "000005"
                    ]
                }
            ]
        }
    }

    beforeEach(function() {

        var mod = mainMod('filterBuilder.test')

        mod.factory('iResourceDataset', function($q, Shoji) {
            return function() {
                var fixture = Shoji(datasetFixture.self).parse(datasetFixture)

                /*
                fixture.urls.summary.map = function(){
                    return {}
                }*/

                return $q.when(fixture)
            }
        });

        mod.factory('currentDataset', function(
                Shoji, $q) {
                return {
                'fetch': function execute(q) {
                    var res = Shoji(datasetFixture.self)
                        .parse(datasetFixture);
                    return $q.when(res)
                }
                }
            })

        mod.factory('iResourceVariable', function($q, Shoji) {
            return function(q) {

                var lookup = {'/api/datasets/123/variables/000000/': categoricalVariableFixture,
                              '/api/datasets/123/variables/00000d/': mrVariableFixture}
                var fixture = lookup[q.variableId]

                //override the variable ids
                var resp = Shoji(q.variableId).parse(fixture)
                resp.id = q.variableId
                resp.self = q.variableId

                resp.urls.frequencies.map = function(){
                    var fixture = {'/api/datasets/123/variables/000000/': frequenciesCategoricalFixture,
                                   '/api/datasets/123/variables/00000d/': frequenciesMRFixture
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

    describe('testing mr decompilation with relative urls', function() {
        it(
            'should decompile the server filter to a filter usable by the ctrl', function() {
                var decompiled = sut(compiledRelativeMRFilter, datasetFixture)

                decompiled.then(function(actual){

                    actual.expressions[0].id.should.equal("00000d")
                    //actual.expressions.length.should.eql(1)
                    //Object.keys(actual.expressions[0].categories).length.should.eq(3)
                    //actual.junctions.should.eql(['AND'])
                })

                flush()
            })
    })
})
