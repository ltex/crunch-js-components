'use strict'

module.exports = PlayControlsDirective


function PlayControlsDirective() {

    return {
        controller : 'playControl'
        , controllerAs : 'ctrl'
        , scope : {
            settings : '='
            , analysis : '='
        }
        , templateUrl : '/play-controls/play-controls.html'
    }
}