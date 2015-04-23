'use strict';
module.exports = EligibleVariableCtrl

EligibleVariableCtrl.$inject = [
    '$rootScope'
    ,'$scope'
    ,'Shoji'
];

function EligibleVariableCtrl($rootScope, $scope, Shoji) {
    this.selectVariable = $scope.selectVariable = function($event, variableProjection) {
        $rootScope.$broadcast('eligibleVariable.selected', variableProjection)
    }
    this.init = function(){
        if($scope.variable && $scope.variable.type == 'categorical_array'){
            $scope.variable.hint = "Expand to filter using "
        }
    }
}
