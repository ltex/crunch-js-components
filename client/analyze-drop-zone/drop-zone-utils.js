'use strict'

module.exports = DropZoneUtilsFactory

DropZoneUtilsFactory.$inject = ['lodash']

function DropZoneUtilsFactory(_) {

    return {
        getVariableId : function (data) {
            return (data.droppedData || data.dragged.data).self
        }

        , assert : function(assertion, message) {
            if(!assertion) {
                throw new Error(message)
            }
        }

        , assertRequiredParams : function(params) {
            this.assert(_.isObject(params), 'Provide a valid params')
            this.assert(_.isObject(params.analysis), 'Provide a valid analysis object')
            this.assert(_.isObject(params.slicesOrGroups), 'Provide a valid slicesOrGroups object')
            this.assert(_.isObject(params.tableOrGraph), 'Provide a valid tableOrGraph object')
        }
    }
}
