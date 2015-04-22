'use strict';

// MSN TEMPORARY SHIM DIRECTIVE UNTIL WE BUMP VERSIONS
module.exports = ['$parse',function NgFocus($parse){
    return {
        restrict: 'ACE'
        ,compile: function($element, attr){
            var fn = $parse(attr['ngFocus'])
            return function(scope,element,attr){

                var elm = element[0]
                function focus(e){
                    scope.$apply(function(){
                        fn(scope,{$event:e})
                    })
                }
                elm.addEventListener('focus',focus)
                scope.$on('$destroy',function(){
                    elm.removeEventListener('focus',focus)
                })
            }

        }
    }

}]

