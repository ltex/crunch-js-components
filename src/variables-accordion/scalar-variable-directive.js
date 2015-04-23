'use strict';

module.exports = ScalarVariableDirective

ScalarVariableDirective.$inject = [
    '$compile'
]

function ScalarVariableDirective($compile) {
    return {
        restrict: 'CE'
        //,replace: true
        ,scope: true
        ,templateUrl: '/variables-accordion/scalar-variable.html'
        ,link: function(scope,el,attrs){
            var elm = el[0]
            //noop
        }
    }

}
