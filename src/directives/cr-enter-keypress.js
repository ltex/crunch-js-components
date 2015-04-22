'use strict'

module.exports = CrEnterKeypressDirective

function CrEnterKeypressDirective() {
    var KEY_ENTER = 13
        ;

    return {
        restrict : 'A'
        , scope : {
            'crEnterKeypress' : '&'
        }
        , link : function(scope, el) {
            function executeEvent(e) {
                if(e.keyCode === KEY_ENTER) {
                    scope.$apply(function() {
                        scope.crEnterKeypress()
                    })
                }
            }

            el.on('keyup', executeEvent)

            scope.$on('$destroy', function() {
                el.on('keyup', executeEvent)
            })
        }
    }
}
