'use strict'

module.exports = DropZoneContentCtrl

DropZoneContentCtrl.$inject = [
    '$scope'
    , 'dropZoneContentMediator'
]

function DropZoneContentCtrl($scope, dropZoneContentMediator) {

    dropZoneContentMediator.addZoneContent(this, $scope)

    $scope.hidden = false

    this.hide = function() {
        $scope.hidden = true
    }

    this.show = function() {
        $scope.hidden = false
    }

    this.name = function() {
        return $scope.zone
    }
}
