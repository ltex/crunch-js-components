'use strict'

module.exports = CrEscKeypressDirective

function CrEscKeypressDirective() {
    var KEY_ESC = 27
        ;

    return {
        restrict : 'A'
        , scope : {
            'crEscKeypress' : '&'
        }
        , link : function(scope, el) {
            function executeEvent(e) {
                if(e.keyCode === KEY_ESC) {
                    scope.$apply(function() {
                        scope.crEscKeypress()
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
