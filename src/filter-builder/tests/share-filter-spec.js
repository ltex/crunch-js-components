'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('ShareFilter', function() {
    var sut
        , permissions
        ;

    function buildModule() {
        var mod = mainMod()
            ;

        permissions = {
            edit : true
        }

        mod.factory('iFetchCurrentUserDatasetPermissions', function($q) {
            return function() {
                return $q.when(permissions)
            }
        })

        angular.mock.module(mod.name)
    }

    function buildSut() {
        angular.mock.inject(function(ShareFilter) {
            sut = ShareFilter
        })
    }

    function flush() {
        angular.mock.inject(function($rootScope) {
            $rootScope.$digest()
        })
    }

    describe('when creating', function() {
        var sutInstance
            ;

        beforeEach(buildModule)
        beforeEach(buildSut)

        describe("given the current user has edit permissions on the current dataset", function() {

            beforeEach(function() {
                sutInstance = sut.create()
                flush()
            })

            it('should set allowToEdit property to true', function() {
                sutInstance.allowToEdit.should.be.true
            })
        })

        describe('given the share constructor parameter is provided', function() {
            var defaultShare = true

            beforeEach(function() {
                permissions.edit = false
                sutInstance = sut.create({ share : defaultShare })
                flush()
            })

            it('should set share property to the constructor parameter', function() {
                sutInstance.share.should.be.equal(defaultShare)
            })
        })

        describe('given the share constructor parameter is not provided', function() {
            var defaultShare = true

            beforeEach(function() {
                permissions.edit = false
                sutInstance = sut.create()
                flush()
            })

            it('should set share property equals to allowToEdit property', function() {
                sutInstance.share.should.be.equal(sutInstance.allowToEdit)
            })
        })
    })

})
