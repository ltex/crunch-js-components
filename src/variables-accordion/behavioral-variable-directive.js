'use strict';

module.exports = BehavioralVariableDirective

BehavioralVariableDirective.$inject =[
    '$compile'
]

function BehavioralVariableDirective($compile) {
    return {
        restrict: 'C'
        ,scope: {
            behavioral: "=variable"
        }
        ,replace: true
        ,templateUrl: '/variables-accordion/behavioral-variable.html'
        ,link: function(scope, el, attrs) {
            var BASIC_PADDING = 15
                , level
                , padding
                , behavioral = scope.behavioral
                ;

            padding = (behavioral.level - 1) * BASIC_PADDING

            function setPaddingLeft(el, padding) {
                el.css({ paddingLeft : padding })
            }

            setPaddingLeft(el, padding)

            function setPaddingToBehavioralObject() {
                setPaddingLeft(el, 0)
                setPaddingLeft(el.find('.variable-button'), padding)
            }

            scope.$watch('behavioral.behaviors.strategy', function() {
                setPaddingToBehavioralObject()
            })
        }

    }

}
