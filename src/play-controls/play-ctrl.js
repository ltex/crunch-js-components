'use strict';

/** @exports PlayControl */
module.exports = PlayControl

PlayControl.$inject = [
    '$scope'
    ,'userPreferences'
    ,'analyzeContextManager'
]


/** @class PlayControl
 * @classdesc Provides actions for the play controller in the analysis context
 * @return {Function} The controller to be instantiated by Angular.
 **/
function PlayControl($scope, userPreferences) {
    /** @method init
     * @desc Initializes the state of the play controller. Sets up subscriptions and watches and puts stuff on scope
     * @instance
     * @memberof PlayControl
     */
    this.init = function() {
        var flags = {}
            ;

        flags.user = userPreferences.getAll()

        $scope.percentOptions = [
            {
                display: ''
                , value: 'rowPct'
            }
            , {
                display: ''
                , value: 'colPct'
            }
            , {
                display: ''
                , value: 'cellPct'
            }
        ]

        $scope.defaultAnalysis = {
            name: 'defaultAnalysis'
            ,value: flags.user.defaultAnalysis || userPreferences.get('defaultAnalysis') || 'table'
            ,persistServer: false
        }

        $scope.tableGraphPrefs = {visible:false}
    }
    this.setLocalPreference = function(pref){
        userPreferences.set(pref)
    }
    this.savePreferences = function(){
        userPreferences.set($scope.defaultAnalysis)
        $scope.tableGraphPrefs.visible=false
    }
    this.togglePopup = function(name){
        $scope[name].visible = !!!$scope[name].visible
    }
}
