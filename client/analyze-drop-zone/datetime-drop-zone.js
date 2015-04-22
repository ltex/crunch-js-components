'use strict'

module.exports = DatetimeDropZoneFactory

DatetimeDropZoneFactory.$inject = [
    'lodash'
    , '$rootScope'
    , 'CategoricalDropZone'
]

function DatetimeDropZoneFactory(_, $rootScope, CategoricalDropZone) {

    function getVariableId (data) {
        return (data.droppedData || data.dragged.data).self
    }

    var DatetimeDropZone = CategoricalDropZone.class.extend({

    })

    DatetimeDropZone.prototype.toString = function() {
        if(this.tableOrGraph.value === 'table') {
            return CategoricalDropZone.class.prototype.toString.call(this)
        } else {
            return 'datetime-' + this.tableOrGraph.value + '-' + this.state
        }
    }

    return {
        create : function(params) {
            var datetimeDropZone = new DatetimeDropZone()
                ;

            datetimeDropZone.handle('initialize', (params || {}))

            return datetimeDropZone
        }
    }
}
