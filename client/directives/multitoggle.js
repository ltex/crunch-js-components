'use strict';
module.exports = MultiToggle

MultiToggle.$inject = ['$timeout'];

function MultiToggle($timeout) {
    return {
        restrict: 'A'
        , require: 'ngModel'
        , scope: {
            userModel: '=?multitoggleUserModel'
            , options: '=multitoggleOptions'
            , disabled: '=multitoggleDisabled'
            , hidden: '=multitoggleHidden'
            , onChange: '&'
        }
        , link: function(scope, elm, attr, ngModelCtrl) {
            elm.addClass('multitoggle');
            elm.on('click.multitoggle', setValue);

            function setValue() {
                var current = scope.options[0]
                    , index, next
                    ;

                scope.options.some(function(option) {
                    var found = option.value === ngModelCtrl.$modelValue
                        ;

                    if(found) {
                        current = option
                    }

                    return found
                })
                ;

                index = scope.options.indexOf(current);
                next = (index + 1) % scope.options.length

                elm.html(scope.options[next].display)
                elm.addClass('selected')

                //userModel allows to know if user was the one that set the value, and what it is
                scope.$apply(function() {
                    var newValue = scope.options[next].value
                    scope.userModel = newValue

                    $timeout(function() {
                        ngModelCtrl.$setViewValue(newValue)
                        scope.onChange()
                    }, 30)
                })
            }

            scope.$watch('disabled', function(newVal) {});
            scope.$watch('hidden', function(newVal) {
                if(newVal) elm.hide()
                else elm.show()
            });

            ngModelCtrl.$render = function() {
                var current
                    ;

                scope.options.some(function(option) {
                    var found = option.value === ngModelCtrl.$modelValue
                        ;

                    if(found) {
                        current = option
                    }

                    return found
                })

                if(current) {
                    elm.html(current.display);
                }
            }

            scope.$on('$destroy', function() {
                elm.off('click.multitoggle', setValue)
            })
        }
    }
}
