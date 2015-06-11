'use strict'

module.exports = PlayControlsDirective


function PlayControlsDirective(_, $timeout, $document) {

    function collides(bbox, x, y) {
        return x >= bbox.left &&
            x <= bbox.right &&
            y >= bbox.top &&
            y <= bbox.bottom
    }

    function calculatesBoundingBox($element) {
        var MARGIN = 100
            , controlsOffset = $element.offset()

        return {
            left : controlsOffset.left - MARGIN
            , top : controlsOffset.top - MARGIN
            , right : controlsOffset.left + $element.width() + MARGIN
            , bottom : controlsOffset.top + $element.height() + MARGIN
        }
    }

    function fadeIn($element) {
        $element.fadeIn()
    }

    function scheduleFadeOut($element) {
        return $timeout(function() {
            $element.fadeOut()
        }, 5000)
    }

    function cancelFadeOut(stoppable) {
        $timeout.cancel(stoppable || {})
    }

    return {
        controller : 'playControl'
        , controllerAs : 'ctrl'
        , scope : {
            settings : '='
            , analysis : '='
            , autoHide : '='
        }
        , templateUrl : '/play-controls/play-controls.html'
        , link : function($scope, $el) {
            var $controls = $el.find('form.xtab-controls')
                , controlsBoundingBox = calculatesBoundingBox($controls)
                , stoppable
                , handle
                , hidden = false
                ;

            handle = _.throttle(function(e) {
                if(collides(controlsBoundingBox, e.clientX, e.clientY)) {
                    fadeIn($controls)
                    hidden = false
                    cancelFadeOut(stoppable)
                } else {
                    if(!hidden) {
                        cancelFadeOut(stoppable)
                        stoppable = scheduleFadeOut($controls)
                        hidden = true
                    }
                }
            }, 100)

            function recalculateBoundingBox() {
                controlsBoundingBox = calculatesBoundingBox($controls)
            }

            if($scope.autoHide) {
                stoppable = scheduleFadeOut($controls)
                $document.on('mousemove', handle)
            }

            $scope.$on('$destroy', function() {
                $document.off('mousemove', handle)
                $(window).off('resize', recalculateBoundingBox)
            })
        }
    }
}

PlayControlsDirective.$inject = ['lodash', '$timeout', '$document']