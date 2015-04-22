'use strict'

module.exports = ShareFilterDirective

ShareFilterDirective.$inject = [

]

function ShareFilterDirective() {
    return {
        restrict : 'EA'
        , replace : true
        , templateUrl : '/filter-builder/share-filter.html'
    }
}
