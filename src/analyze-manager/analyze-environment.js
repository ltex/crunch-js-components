'use strict'

module.exports = AnalyzeEnvironmentFactory

AnalyzeEnvironmentFactory.$inject = [
    'bus'
    , 'machina'
]

function AnalyzeEnvironmentFactory(bus, machina) {

    var AnalyzeEnvironment = machina.Fsm.extend({
        initialState : 'listening'
        , namespace : 'analyzeContextManager'

        , destroy : function() {
            this.off()
        }

        , states : {
            listening : {
                'analysis.loaded' : function(analysis) {
                    bus.publish({
                        event:'filter.clobbered'
                        ,filterIds: analysis.data.cube.query.filters
                    })

                    bus.publish({
                        event: 'analysis.weight'
                        ,weight: analysis.data.cube.query.weight
                    })
                }
            }
        }
    })

    return new AnalyzeEnvironment()
}
