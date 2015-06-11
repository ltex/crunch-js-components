'use strict'

module.exports = AnalyzeTabsFactory

function AnalyzeTabsFactory(machina, bus) {

    var AnalyzeTabs = machina.Fsm.extend({
        states : {
            uninitialized : {
                initialize : function(cfg) {
                    if(!cfg.analysis) {
                        throw new Error('provide an analysis object')
                    }

                    this.analysis = cfg.analysis
                    this.cube = this.analysis.data.cube
                    this.transition((this.cube.dimension > 2 ? 'enabled' : 'disabled'))
                }
            }

            , enabled : {
                _onEnter : function() {
                    this.tabs = this.cube._dimensions[0].labels.map(function(l, i) {
                        return {
                            label : l
                            , active : i === 0
                        }
                    })
                }

                , select : function(tab) {
                    var index = this.tabs.indexOf(tab)
                        ;

                    if(index !== -1) {
                        this.tabs.forEach(function(t) {
                            t.active = false
                        })
                        tab.active = true
                        bus.publish({
                            event : 'analyzeTabs.selectionChanged'
                            , selectedTab : index
                        })
                    }
                }

                , remove : function() {
                    this.analysis.handle('remove-variable', 0)
                }
            }
            , disabled : true
        }
    })

    Object.defineProperties(AnalyzeTabs.prototype, {
        enabled : {
            get : function() {
                return this.state === 'enabled'
            }
        }

        , dimensionName : {
            get : function() {
                return this.cube._dimensions[0].name
            }
        }
    })

    AnalyzeTabs.create = function(cfg) {
        var analyzeTabs
            ;

        cfg = cfg || {}

        analyzeTabs = new AnalyzeTabs()
        analyzeTabs.handle('initialize', cfg)

        return analyzeTabs
    }

    return AnalyzeTabs
}

AnalyzeTabsFactory.$inject = [
    'machina'
    , 'bus'
]