;
module.exports = (function() {
    'use strict';
    var mainModule = require('../index')
    var mocks = require('angular-mocks')
        ;
    var userUrl = '/api/user/me/'
        ,commands = []
        ,prefValue = 'abc'
        ;

    describe('UserPreferences', function() {
        function buildModule(prefValue) {

            var mod = mainModule('userpref.test');
            mod.factory('bus', function(){
                return {
                    send: commands.push.bind(commands)
                }
            })
            angular.mock.module('userpref.test')
        }

        beforeEach(function() {
            buildModule()
        });

        describe('when initialized with a user entity', function() {

            var sut
                ;

            beforeEach(function() {
                inject(function(userPreferences){
                    sut = userPreferences
                })
                prefValue = 'abc'
                var user = {
                    preferences: {
                        my_pref: true
                        ,my_other_pref: false
                    }
                }
                sut.handle('initialize', user)
            })

            it('should have the correct value for individual', function() {
                sut.get('my_pref').should.equal(true)
            })
            it('should have all of them as an object with keys', function() {
                var expected = {
                    my_pref: true
                    ,my_other_pref: false
                }
                sut.getAll().should.eql(expected)
            })
            it('should send a command when handling "save"', function(){
                sut.handle('save')
                commands[0].should.eql({
                    command: 'setUserPreferences'
                    ,preferences: {
                        my_pref: true
                        ,my_other_pref: false
                    }
                })
            })
        })
    })
}).call(this);
