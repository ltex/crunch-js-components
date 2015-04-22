;
module.exports = (function() {
    'use strict';
    var MultistateButton = function($timeout) {
        return {
            restrict: 'A'
            , scope: {
                multistateButton: '=multistateButton'
                , multistateButtonFn: '&multistateButtonFn'
            }
            , templateUrl: '/play-controls/multistate-button.html'
            , link: function(scope, elem, attrs) {
                var numStates = scope.multistateButton.length;
                var stateCounter = 0;
                var stateNum = 0;
                var stateName = scope.multistateButton[0];
                elem.find('button')
                    .text(scope.multistateButton[stateNum]);
                scope.$watch('multistateButton', function(newval, oldval) {
                    stateNum = stateCounter % numStates;
                    stateName = scope.multistateButton[
                        stateNum];
                    elem.find('button')
                        .text(stateName)
                }, true);
                elem.bind('click', function(e) {
                    stateCounter++;
                    var stateNum = stateCounter % numStates;
                    var stateName = scope.multistateButton[
                        stateNum];
                    elem.find('button')
                        .text(stateName);
                    var fn = scope.multistateButtonFn();
                    fn({
                        stateNum: stateNum
                        , stateName: stateName
                    })
                })
            }
        }
    };
    MultistateButton.inject = ['$timeout'];
    return MultistateButton
})
    .call(this);