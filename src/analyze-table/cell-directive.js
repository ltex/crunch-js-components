'use strict';

module.exports = CellDirective

function CellDirective() {
    return {
        restrict: 'A'
        ,scope: false
        ,link: function(scope, elm, attrs){
            var settings = scope.settings
            scope.$watch('cell', paint)
            function paint(cell){
                if(!settings.showSignif.disabled && settings.showSignif.true) {
                    var scale = settings.colorScale
                    var color = scale(cell.pValue)
                    elm.addClass('show-signif')
                    if(Math.abs(cell.pValue) < settings.alpha){
                        elm.addClass('signif05')
                    }
                    elm.css('background-color', color)
                } else {
                    elm.removeClass('show-signif')
                    elm.removeClass('signif05')
                    elm.css('background-color', '')
                }
            }
        }
    }
}
