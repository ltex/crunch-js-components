require('angular')
require('angular-mocks')
require('vega')
require('./chai-setup')

var _ = require('lodash')


window.excludes = ['messaging', 'resources', 'current-dataset', 'hierarchical-variables', 'analysis']

require('crunch-js')

window.NULL = null

window.check = function(done, f) {
    try {
        f()
        done()
    } catch( e ) {
        done( e )
    }
}

angular.mock.module = _.wrap(angular.mock.module, function(func) {
    var modules = [].slice.call(arguments, 1)
        ;

    if(modules.indexOf('crunchJS') === -1) {
        modules.unshift('crunchJS')
    }

    func.apply(this, modules)
})
