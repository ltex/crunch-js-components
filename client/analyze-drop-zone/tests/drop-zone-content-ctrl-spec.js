'use strict'

var mocks = require('angular-mocks')
    , mainMod = require('../index')
    ;

describe('DropZoneContentCtrl', function() {
    var sut
        , scope
        ;


    function buildModule() {
        var main = mainMod()
            ;

        main.factory('dropZoneContentMediator', function() {
            return {
                addZoneContent : function(ctrl) {
                    this.ctrl = ctrl
                }
            }
        })

        angular.mock.module(main.name)
    }

    function buildSut() {
        angular.mock.inject(function($rootScope, $controller) {
            scope = $rootScope.$new()
            sut = $controller('DropZoneContentCtrl', {
                $scope : scope
            })
        })
    }

    describe('when hiding', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.hide()
        })

        it('should set hidden to true', function() {
            scope.hidden.should.be.true
        })
    })

    describe('when showing', function() {
        beforeEach(buildModule)
        beforeEach(buildSut)
        beforeEach(function() {
            sut.show()
        })

        it('should set hidden to false', function() {
            scope.hidden.should.be.false
        })
    })
})
