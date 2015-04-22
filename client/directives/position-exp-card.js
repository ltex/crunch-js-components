'use strict';
module.exports = PositionExpCard

PositionExpCard.$inject = ['$timeout', '$window'];

function PositionExpCard($timeout, $window) {
    return {
        link: function(scope, el, attrs) {
            var setPosition = function() {
                return false
                el = angular.element(el);
                el.parent()
                    .parent()
                    .scrollLeft(el.parent()
                        .width());
                var fixedHeight = $window.innerHeight - el.offset().top;
                el.height(fixedHeight);
                el.find('.categories-list')
                    .css({
                        'max-height': fixedHeight
                    })
            };
            $timeout(setPosition, 0)
        }
    }
}
