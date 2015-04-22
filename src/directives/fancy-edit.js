'use strict';
module.exports = fancyEdit

fancyEdit.$inject = ['$timeout', '$compile'];

/**
 * @todo UNTESTED
 * */
function fancyEdit($timeout, $compile) {
    return {
        restrict: 'A'
        , link: function(scope, elm, attr) {
            var input = elm;
            var displayText = angular.element('<div>{{' +
                attr.ngModel + '}}</div>');
            var compiled = $compile(displayText);
            elm.after(displayText);
            elm.add(elm.next())
                .wrapAll('<div class="fancy-edit"></div>');
            $compile(elm);
            compiled(scope);

            function startEditing() {
                elm.parent()
                    .addClass('editing');
                input.focus()
                    .select();
                input.on('blur.fancyedit', stopEditing);
                input.on('keypress.fancyedit', function(e) {
                    if (e.which === 13) {
                        stopEditing()
                    }
                });
                input.on('keyup.fancyedit', function(e) {
                    if (e.which === 27) {
                        stopEditing()
                    }
                })
            }

            function stopEditing() {
                elm.parent()
                    .removeClass('editing');
                displayText.on('click.fancyedit', startEditing);
                input.off('blur.fancyedit');
                input.off('keypress.fancyedit');
                input.off('keyup.fancyedit')
            }
            displayText.on('click.fancyedit', startEditing);
            scope.$on('$destroy', function() {
                displayText.off('click.fancyedit');
                input.off('blur.fancyedit');
                input.off('keypress.fancyedit');
                input.off('keyup.fancyedit')
            })
        }
    }
}
