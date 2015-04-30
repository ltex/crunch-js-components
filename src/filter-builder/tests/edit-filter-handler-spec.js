'use strict';
var buildModule = require('../index')
    ,mocks = require('angular-mocks')
    ;



describe('EditFilterHandler', function() {
    var events = [];
    beforeEach(function() {
        events = [];
        var filtersMod = buildModule('crunch.filters');
        filtersMod.factory('bus', function() {
            return {
                events: events
                , publish: function(e) {
                    events.push(e)
                }
            }
        });
        angular.mock.module('crunch.filters')
    });
    var $httpBackend;
    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_
    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest()
    });
    var filterURL = '/api/some/var/filters/';
    var filterBody = {
        element: 'shoji:entity'
        , self: filterURL
        , body: {
            name: 'my filter'
        }
    };
    var command = {
        command: 'editFilter'
        , id: filterURL
        , name: 'new filter name'
    };
    beforeEach(function() {
        $httpBackend.expectGET(filterURL)
            .respond(200, filterBody, {
                ALLOW: 'GET, PUT'
            });
        $httpBackend.expectPUT(filterURL)
            .respond(201);
        $httpBackend.expectGET(filterURL)
            .respond(200, filterBody, {
                ALLOW: 'GET, PUT'
            });
        $httpBackend.expectGET(filterURL)
            .respond(200, filterBody, {
                ALLOW: 'GET, PUT'
            })
    });
    describe('when issuing a command', function() {
        it('should update the filter', function() {
            inject(function(editFilterHandler) {
                editFilterHandler(command)
            });
            $httpBackend.flush()
        });
        it('fire an event', function() {
            inject(function(editFilterHandler) {
                editFilterHandler(command)
            });
            $httpBackend.flush();
            var evt = events[0];
            evt.id.should.equal(filterURL);
            evt.event.should.equal(
                'filter.edited')
        })
    })
})
