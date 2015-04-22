'use strict'

var MockMachine = require('../../test-support/mock-machine')

function variableData(id) {
    return {
        droppedData : {
            self : id
        }
    }
}

function draggingData(id, type) {
    return {
        inflight : {
            data : {
                self : id
                , type : (type || 'categorical_array')
            }
        }
    }
}

module.exports = function getMockObjects() {
    var analysisMock = new MockMachine()
        , slicesOrGroupsMock = new MockMachine()
        , tableOrGraphMock = new MockMachine()
        ;

    analysisMock.hasArrayVariables = angular.noop
    analysisMock.isBivariate = angular.noop
    analysisMock.isEmpty = angular.noop
    analysisMock.hasMeanMeasure = angular.noop
    analysisMock.hasBinnedRows = angular.noop

    tableOrGraphMock.value = 'table'

    Object.defineProperty(slicesOrGroupsMock, 'value', {
        set : function(value) {
            this.handle(value)
        }

        , get : function() {
            return this.state
        }
    })

    return {
        analysis : analysisMock
        , slicesOrGroups : slicesOrGroupsMock
        , tableOrGraph : tableOrGraphMock
        , draggingData : draggingData
        , variableData : variableData
    }
}
