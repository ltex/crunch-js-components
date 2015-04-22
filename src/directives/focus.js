'use strict';
module.exports = Focus

Focus.$inject = ['$timeout', 'lodash'];
function Focus($timeout, _) {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('focus', function(newValue) {
                if ( !! newValue) {
                    $timeout(function() {
                        element.focus()
                            .select()
                    }, 150)
                } else {
                    $timeout(function() {
                        element.blur()
                    }, 150)
                }
            })
        }
    }
}
