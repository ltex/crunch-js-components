'use strict'

module.exports = AnalyzeDropZoneFactory

AnalyzeDropZoneFactory.$inject = [
    'machina'
    , 'CategoricalDropZone'
    , 'NumericDropZone'
    , 'CategoricalArrayDropZone'
    , 'DatetimeDropZone'
]

function AnalyzeDropZoneFactory(machina
    , CategoricalDropZone
    , NumericDropZone
    , CategoricalArrayDropZone
    , DatetimeDropZone) {

    var AnalyzeDropZone = machina.Fsm.extend({
        initialState : 'uninitialized'
        ,$events : [
            'link:started'
        ]

        , initialize : function() {
            this.zoneTypes = {
                'categorical' : CategoricalDropZone
                , 'categorical_array' : CategoricalArrayDropZone
                , 'numeric' : NumericDropZone
                , 'datetime' : DatetimeDropZone
            }

            this.current =  "empty"
        }

        , setCurrent : function(variable) {
            var type = variable.type
                , zoneTypes = this.zoneTypes
                ;
            // Categoricals that can be numeric: are numeric!
            if (variable.scale === 'interval' && variable.type !== 'categorical_array'){
                type = 'numeric'
            }
            if(type !== this.state) {
                if(this.current && this.current.destroy) {
                    this.current.destroy()
                }

                type = !zoneTypes[type] ? 'categorical' : type
                this.current = zoneTypes[type].create(this.cfg)
                this.transition(type)
            }

            this.current.dragged = variable
            this.current.type = type

            if(typeof this.current.refreshDropZone === 'function') {
                this.current.refreshDropZone()
            }

            return type
        }

        , destroy : function() {
            if(this.current && this.current.destroy) {
                this.current.destroy()
            }
            this.off()
        }

        , states : {
            uninitialized : {
                initialize : function(cfg) {
                    this.cfg = cfg
                    this.transition('initialized')
                }
            }

            , initialized : {
                'link:started' : function(e, data) {
                    this.setCurrent(data.inflight.data)
                }
            }

            , categorical : {
                'link:started' : function(e, data) {
                    this.setCurrent(data.inflight.data)
                }
            }

            , numeric : {
                'link:started' : function(e, data) {
                    this.setCurrent(data.inflight.data)
                }
            }

            , categorical_array : {
                'link:started' : function(e, data) {
                    this.setCurrent(data.inflight.data)
                }
            }

            , datetime : {
                'link:started' : function(e, data) {
                    this.setCurrent(data.inflight.data)
                }
            }
        }
    })

    return {
        create : function(params) {
            var dropZone = new AnalyzeDropZone()
                ;

            dropZone.handle('initialize', (params || {}))

            return dropZone
        }
    }
}
