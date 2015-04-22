'use strict'

module.exports = TypedDropZoneFactory

TypedDropZoneFactory.$inject = [
    'machina'
]

function TypedDropZoneFactory(machina) {

    var TypedDropZone = machina.Fsm.extend({})

    TypedDropZone.prototype.getVariableName = function(position) {
        return (this.getVariable(position) || {}).fullName
    }

    TypedDropZone.prototype.isDatetime = function(position) {
        return (this.getVariable(position) || {}).type === 'datetime'
    }

    TypedDropZone.prototype.getVariable = function(position) {
        var variable
            ;

        switch(position) {
            case 'row':
            case 'table':
                variable = this.analysis.variables.at(0)
                variable = this.analysis.variables.at(0)
                break
            case 'column':
            case 'over':
                variable = this.analysis.variables.at(1)
                variable = this.analysis.variables.at(1)
                break
            case 'slice':
                if(this.slicesOrGroups.value !== 'groups') {
                    variable = this.analysis.variables.at(1)
                }
                break
            case 'group':
                if(this.slicesOrGroups.value !== 'slices') {
                    variable = this.analysis.variables.at(1)
                }
                break
            case 'dragged':
                variable = this.dragged
                break
            case 'mean': {
                variable = this.analysis.measures.getMeasureVariable('mean', 0)
                break
            }
        }

        return variable
    }

    return TypedDropZone
}
