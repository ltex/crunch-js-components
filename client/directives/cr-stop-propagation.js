'use strict'

module.exports = CrStopPropagation

function CrStopPropagation() {

    return {
        restrict : 'A'
        , scope : {
            'crStopPropagation' : '@'
        }
        , link : function(scope, el, attrs) {
            var event = attrs.crStopPropagation
                ;

            function stopPropagation(e) {
                e.stopPropagation()
            }

            el.on(event, stopPropagation)

            scope.$on('$destroy', function() {
                el.off(event, stopPropagation)
            })
        }
    }
}
