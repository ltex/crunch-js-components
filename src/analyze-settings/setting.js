'use strict'

module.exports = SettingFactory

SettingFactory.$inject = [
    'lodash'
    , 'machina'
]

function SettingFactory(_, machina) {
    function assert(assertion, message) {
        if(!assertion) {
            throw new Error(message)
        }
    }

    function assertName(name) {
        assert(_.isString(name), 'Provide a valid name string')
        assert(name.length > 0, 'setting name should not be empty')
    }

    var Setting = machina.Fsm.extend({
        initialize : function(defaults) {
            assertName(defaults.name)
        }

        , notifyChanges : function() {
            this.emit(this.name  + '.changed', this.priorState, this.state)
        }
    })



    Setting.prototype.toJSON = function() {
        return _.pick(this, 'hidden', 'disabled', 'value')
    }

    return Setting
}
