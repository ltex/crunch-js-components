'use strict';

module.exports = UserPreferencesFactory

UserPreferencesFactory.$inject = [
    'lodash'
    ,'machina'
    ,'bus'
    ,'$q'
]

function UserPreferencesFactory(_, machina, bus, $q) {

    function assert(obj){
        if (typeof obj !== 'object'){
            throw new Error('preference should be an object')
        }
    }
    var Prefs = machina.Fsm.extend({
        namespace: 'userPreferences'
        ,initialState: 'uninitialized'
        ,clear: function(){
            this.preferences = {}
        }
        ,set: function(pref){
            assert(pref)
            this.preferences[pref.name] = {
                value: pref.value
                ,persistServer: pref.persistServer || false
            }
            if(!!pref.persistServer){
                this.handle('save')
            }
        }
        ,addServerPreferences: function(prefs){
            _.forEach(prefs, function(value, key){
                this.set({
                    name: key
                    ,value: value
                    ,persistServer: true})
            }, this)
        }
        ,get: function(name){
            return this.preferences[name] ? this.preferences[name].value : false
        }
        ,getAll: function(){
            var obj = {}
            _.forEach(this.preferences, function(v,k){
                obj[k] = v.value
            })
            return obj
        }
        ,$events: [
            ,'user.loggedOut'
            ,'preferences.saved'
        ]
        ,states: {
            uninitialized: {
                '_onEnter': function(){
                    this.clear()
                }
                ,initialize: function(cfg) {
                    var prefs = cfg.preferences || {}
                    this.addServerPreferences(prefs)
                    this.transition('initialized')
                }
            }
            ,initialized: {
                initialize: function(cfg){
                    this.clear()
                    var prefs = cfg.preferences || {}
                    this.addServerPreferences(prefs)
                }
                ,save: function(){
                    this.transition('saving')
                }
                ,'user.loggedOut': function(){
                    this.transition('uninitialized')
                }
            }
            ,saving: {
                _onEnter : function(){
                    var bundle = {}
                    _.forEach(this.preferences, function(v,k){
                        if (v.persistServer) { bundle[k] = v.value }
                    }, this)
                    bus.send({command: 'setUserPreferences', preferences: bundle})
                }
                ,'preferences.saved': function(evt){
                    this.transition('initialized')
                }
            }
        }
    })

    var prefs = new Prefs()
    return prefs
}
