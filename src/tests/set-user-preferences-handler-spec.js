module.exports = (function() {
    'use strict';
    var mainModule = require('../index')
    var mocks = require('angular-mocks')
    var userUrl = '/api/user/me/'
    var events = []

    describe('Set user preferences handler', function() {
        function buildModule(prefValue) {
            var mod = mainModule('userpref.test');
            mod.factory('iResourceUser', function($q, Shoji) {
                return {
                    current : function() {
                        var userData = {
                            self: userUrl,
                            element: 'shoji:entity',
                            description: 'nope',
                            body: {
                                preferences: {
                                    my_pref: prefValue
                                    ,my_other_pref: prefValue
                                }
                            }
                        }
                        ;

                        return $q.when(Shoji(userUrl).parse(userData))
                    }
                }
            })
            mod.factory('bus', function(){
                return {
                    publish: events.push.bind(events)
                }
            })
            angular.mock.module('userpref.test')
        }

        function flush() {
            angular.mock.inject(function($rootScope){
                $rootScope.$digest()
            })
        }

        beforeEach(function() {
            buildModule()
        });

        describe('when setting preferences', function(){
            var userUrl = '/api/user/me/';
            var prefValue = 'abc'

            it('should update the API user preferences and raise an event', function(){
                inject(function(setUserPreferencesHandler, Shoji, $httpBackend) {
                    Shoji.API = Shoji('/api/');
                    $httpBackend.expectPATCH(userUrl).respond(204, {
                        entity: 'shoji:entity', body: {
                            preferences: {
                                my_pref: prefValue
                            }
                        }
                    }, {
                        'ALLOW': 'GET, PUT, PATCH'
                    });
                    $httpBackend.expectGET(userUrl).respond(200, {
                        self: userUrl,
                        element: 'shoji:entity',
                        description: 'nope',
                        body: {
                            preferences: {}
                        }
                    }, {
                        'ALLOW': 'PUT, PATCH'
                    });
                    setUserPreferencesHandler({
                        command: 'setUserPreferences',
                        preferences: {'my_pref': prefValue}
                    });
                    $httpBackend.flush();
                    events[0].should.eql({
                        event: 'preferences.saved',
                        preferences: {'my_pref': prefValue}
                    })
                })
            })
        });
    })
}).call(this);
