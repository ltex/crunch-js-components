'use strict';
module.exports = KeyupBind

KeyupBind.$inject = ['$parse'];
function KeyupBind($parse) {
    return {
        link: function(scope, el, attrs) {
            var params = scope.$eval(attrs.keyupBind);
            angular.forEach(params, function(exp, key) {
                function keyup(e) {
                    if (e.which == Number(key)) {
                        var expression = $parse(exp);
                        scope.$apply(function() {
                            expression(scope, {
                                '$event': e
                            })
                        })
                    }
                }
                el.on('keyup.shortcut', keyup);
                scope.$on('$destroy', function() {
                    el.off('keyup.shortcut', keyup)
                })
            })
        }
    }
}
