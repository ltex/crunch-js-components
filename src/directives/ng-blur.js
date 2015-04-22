'use strict';

// MSN TEMPORARY SHIM DIRECTIVE UNTIL WE BUMP VERSIONS
module.exports = ['$parse',function NgBlur($parse){
    return {
        restrict: 'ACE'
        ,compile: function($element, attr){
            var fn = $parse(attr['ngBlur'])
            return function(scope,element,attr){
                var elm = element[0]
                function blur(e){
                    scope.$apply(function(){
                        fn(scope,{$event:e})
                    })
                }
                elm.addEventListener('blur',blur)
                scope.$on('$destroy',function(){
                    elm.removeEventListener('blur',blur)
                })
            }

        }
    }

}]

