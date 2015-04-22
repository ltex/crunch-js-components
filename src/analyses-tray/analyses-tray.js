'use strict';

module.exports = AnalysesTrayFactory

AnalysesTrayFactory.$inject = [
    'machina'
]

/***
 * Factory for creating instances of an AnalysesTray. These instances are
 * extensions of a machina state machine.
 * ***/
function AnalysesTrayFactory(machina) {
    return machina.Fsm.extend({
        namespace: 'analyses-tray'
        ,initialState: 'uninitialized'
        ,$events: [
            'analysis.saved'
        ]
        ,destroy : function() {
            this.off()
        }
        ,states: {
            uninitialized: {
                initialize: function (params) {
                    params = params || {}

                    if(params.snapshotPreloaded) {
                        this.transition('opened')
                    } else {
                        this.transition('initialized')
                    }
                }
            }
            ,initialized: {
                _onEnter: function () {
                    this.transition('closed')
                }
            }
            ,opened: {
                toggleVisibility: function () {
                    this.transition('closed')
                }

                , close : function() {
                    this.transition('closed')
                }
            }
            ,closed: {
                toggleVisibility: function () {
                    this.transition('opened')
                }
                ,open: function () {
                    this.transition('opened')
                }
                ,'analysis.saved': function(){
                    this.transition('opened')
                }
            }
        }
        ,is: function (state) {
            return this.state === state
        }
        ,open: function () {
            this.handle('open')
        }
    })
}
