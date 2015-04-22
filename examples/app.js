
var app = angular.module('componentsDemo', [
    require('crunch-js-components')().name
])

app.config(function($httpProvider) {
    'use strict'
    $httpProvider.defaults.withCredentials = true
})

/**
 * signin service sends a POST request to the authentication endpoint. This is required
 * in order to consume other services provided by crunch API
 */
app.factory('signin', function($http, Shoji) {
    'use strict'

    return function(email, password) {
        return Shoji(window.secrets.signinUrl).map().then(function(api) {
            return $http({
                url : api.urls.login.self,
                method: 'POST',
                data : {
                    email : email,
                    password : password
                }
            })
        })
    }
})

app.run(function(currentDataset) {
    currentDataset.set(secrets.dataset)
})
