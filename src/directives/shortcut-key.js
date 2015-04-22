;
module.exports = (function() {
    'use strict';

    function shortcutKey($document, $parse) {
        return {
            link: function(scope, el, attrs) {
                var params = scope.$eval(attrs.shortcutKey);
                angular.forEach(params, function(exp, key) {
                    $document.bind('keydown.shortcut', function(e) {
                            if (e.which == Number(key) &&
                                angular.element(e.target)
                                .is('body')) {
                                var expression = $parse(exp);
                                scope.$apply(function() {
                                    expression(scope, {
                                        '$event': e
                                    })
                                })
                            }
                        });
                    scope.$on('$destroy', function() {
                        $document.off('keydown.shortcut')
                    })
                })
            }
        }
    }
    shortcutKey.$inject = ['$document', '$parse'];
    return shortcutKey
})
    .call(this);