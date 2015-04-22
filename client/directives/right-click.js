'use strict';
module.exports = RightClick
RightClick.$inject = ['$parse']
function RightClick($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.rightClick);
        var elm = element[0]
        function show(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {
                    $event: event
                })
            })
        }
        elm.addEventListener('contextmenu', show)
        scope.$on('$destroy',function(){
            elm.removeEventListener('contextmenu',show)
        })

    }
}
