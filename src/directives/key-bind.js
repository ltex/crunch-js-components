'use strict';
module.exports = KeyBind

KeyBind.$inject = ['$parse'];
function KeyBind($parse) {
    return {
        link: function(scope, el, attrs) {
            var params = scope.$eval(attrs.keyBind);
            angular.forEach(params, function(exp, key) {
                el.on('keypress.shortcut', function(e) {
                    if (e.which == Number(key)) {
                        var expression = $parse(exp);
                        scope.$apply(function() {
                            expression(scope, {
                                '$event': e
                            })
                        })
                    }
                });
                scope.$on('$destroy', function() {
                    el.off('keypress.shortcut')
                })
            })
        }
    }
}
