'use strict'

var mainMod = require('../index')
    , mocks = require('angular-mocks')
    ;

describe('slugifyFilter', function() {
    var $filter
        ;

    beforeEach(function() {
        var main = mainMod()
            ;

        angular.mock.module(main.name)
    })

    beforeEach(function() {
        angular.mock.inject(function(_$filter_) {
            $filter = _$filter_
        })
    })

    describe('when slugifying', function() {
        it('should remove all the spaces and convert uppercase letters to lowercase', function() {
            $filter('slugify')('Basin_Name Combined').should.equal('basin-name-combined')
        })
    })
})
