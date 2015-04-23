'use strict';

module.exports = CompositeVariableDirective

CompositeVariableDirective.$inject = [
]

function CompositeVariableDirective(){
    return {
        restrict: 'CE'
        ,templateUrl: '/variables-accordion/composite-variable.html'
        ,replace: true
        ,scope: true
        ,link: function(scope,el,attrs){
            scope.$watch('variable',function(variable){
                if(!variable) {
                    return
                }
                var elm = el[0]
                    ;

                var header = elm.querySelector('.composite-header')
                if(variable.behaviors.linkable) {
                    header.setAttribute('dragit','variable')
                    header.setAttribute('dragit-operation','link')
                }
            })
        }
    }
}
