module.exports=TitleVariableDirective

TitleVariableDirective.$inject = [
]

function TitleVariableDirective(){
    return {
        restrict: 'E'
        ,scope: {
            variable: '='
            ,type: '@'
        }
        ,templateUrl: '/analyze-table/title-variable.html'
        ,link: function($scope){
            $scope.$watch('variable', function(varb){
                if(varb===undefined){return}
                var name = varb.fullName
                $scope.name = !!name ? name : varb.name
                if($scope.type==='mean'){
                    $scope.name = "Average " + $scope.name
                }
                $scope.description  = varb.description
            })
            $scope.showDescription = false
        }
    }
}
