'use strict';

module.exports = BivariateContextDirective

BivariateContextDirective.$inject = [
    '$timeout'
]

function BivariateContextDirective($timeout){
    return {
        restrict: 'C'
        ,link: function(scope, elm, attrs) {
            scope.showSpinner = false
            var el = elm[0]
            var spinnerEl = document.createElement('div')
            el.appendChild(spinnerEl)

            var overlayTimer
            var spinnerTimer

            scope.$on('spinner.on',function(){
                scope.showSpinner = true
            })
            scope.$on('spinner.off',function(){
                scope.showSpinner = false
            })

            scope.$watch('showSpinner', function(showSpinner){

                if (showSpinner){
                    overlayTimer = $timeout(function(){turnOnOverlay()}, 500)
                    spinnerTimer = $timeout(function(){turnOnSpinner()}, 1500)
                } else {
                    $timeout.cancel(overlayTimer)
                    $timeout.cancel(spinnerTimer)
                    turnOffOverlay()
                    turnOffSpinner()
                }
            })

            function turnOnOverlay(){
                spinnerEl.classList.add('spinner-overlay')
            }

            function turnOffOverlay(){
                spinnerEl.classList.remove('spinner-overlay')
            }

            function turnOnSpinner(){
                spinnerEl.classList.add('spinner-active')
            }

            function turnOffSpinner(){
                spinnerEl.classList.remove('spinner-active')
            }

            scope.$on('$destroy',function() {
                $timeout.cancel(overlayTimer)
                $timeout.cancel(spinnerTimer)
                turnOffOverlay()
                turnOffSpinner()
                spinnerEl.remove()
            })
        }
    }
}
