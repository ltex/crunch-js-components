'use strict';

setUserPreferencesHandler.$inject = [
    'bus'
    ,'iResourceUser'
]

module.exports = setUserPreferencesHandler;

function setUserPreferencesHandler(bus, iResourceUser) {
    function raiseEvent(command){
        return function now(res){
            var e = {
                event: 'preferences.saved'
                ,preferences: command.preferences
            }
            return bus.publish(e)
        }
    }
    return function handle(command){
        var raise = raiseEvent(command)
        return iResourceUser.current().then(function(usr){
            usr.patch({
                data: {
                    element: 'shoji:entity'
                    ,body: {
                        preferences: command.preferences
                    }
                }
            }).then(raise)
        })
    }
}
