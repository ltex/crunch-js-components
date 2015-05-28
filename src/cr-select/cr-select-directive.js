'use strict';
module.exports = CrSelect

CrSelect.$inject = [
    '$window'
    ,'$document'
];

function CrSelect($window, $document) {
    return {
        restrict: 'AE'
        , templateUrl: '/cr-select/cr-select.html'
        , scope: {
            itemList: '=', //an array with 'item:' in each element containing the option name
            currentValue: '=', //a string showing the current option
            onOptionSelected: '&' // a function that is called whenever 'currentValue' is updated
        }

        , link: function (scope, element, attrs) {
            //hide the dropdown when the menu is closed.
            function closeMenu() {
                var selectMenuElement = element.find("ul")
                selectMenuElement.removeClass('shown')
            }

            // on clicking the object the dropdown is displayed
            scope.expandOptions = function($event) {
                $event.stopPropagation()
                var selectMenuElement = element.find("ul")
                selectMenuElement.addClass('shown')
                var width = element.css("width")
                selectMenuElement.css('width', width)
            }

            // on selecting an item the currentValue is updated to that item
            // and the menu is closed.
            scope.selectOption = function(item,$event) {
                scope.currentValue = item.item
                scope.onOptionSelected({
                    selectedOption : item.item
                })
                $event.stopPropagation()
                closeMenu()
            }

            $document.on('click', function() {
                closeMenu()
            })
        }
    }
}
