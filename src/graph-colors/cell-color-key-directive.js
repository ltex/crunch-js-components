'use strict';
module.exports = CellColorKeyDirective
CellColorKeyDirective.$inject = ['d3', '$filter']

function CellColorKeyDirective(d3, $filter){
    return {
        templateUrl: '/graph-colors/cell-color-key.html'
        ,restrict: 'E'
        ,scope: {
            scale: '&scale'
            ,settings: '='
            ,visible: '@'
        }
        ,link: function($scope, $element, $attrs, ctrl){
            $scope.$watch('settings.showSignif.disabled', drawScale)
            $scope.$watch('settings.showSignif.value', drawScale)
            function updateDirection(){
                var dir = $scope.settings.percentageDirection.value
                var direction
                switch(dir){
                    case 'rowPct':
                        direction = 'row'
                        break
                    case 'colPct':
                        direction = 'column'
                        break
                    default:
                        direction = 'cell'
                }
                $scope.direction = direction
                $scope.otherDirection = direction === 'row' ? 'column' : 'row'
            }
            function drawScale(){
                if($scope.settings.showSignif.disabled){
                    $element.find('ol.cell-color-key')[0].innerHTML = ''
                    return
                }
                var scale = $scope.settings.colorScale
                updateDirection()
                function getValue(d){
                    return d
                }
                function getColor(d){
                    return scale(getValue(d))
                }
                var colorDomain = [
                     -0.0001,-.001, -0.01, -0.05,
                    .10,  0.05, 0.01, 0.001, .00001]
                var labels = [
                    "p<.001","p<.01","p<.05","p<.10","",
                    "p<.10","p<.05","p<.01","p<.001"
                ]
                var legend = d3.select($element.find('ol.cell-color-key')[0])
                    .html('')
                    .append('ol')
                    .attr('class', 'cell-color-key')

                var lis = legend.selectAll('li')
                    .data(colorDomain).enter()
                    .append('li')
                    .style('border-top-color', getColor)
                    .append('p').text(function(d,i){ return labels[i] })
            }
        }
    }
}
