'use strict';

module.exports = iFetchUserPreferences

iFetchUserPreferences.$inject = ['iResourceUser']

function iFetchUserPreferences(iResourceUser) {
    return iResourceUser.current().then(function(usr){
        if(!usr.preferences){
            return false
        } else{
            return usr.preferences
        }
    })
}
