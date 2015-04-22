'use strict'

module.exports = ToggleableSettingFactory

ToggleableSettingFactory.$inject = [
    'lodash'
    , 'Setting'
]

function ToggleableSettingFactory(_, Setting) {
    var ToggleableSetting
        , castStrategies = {
            number : function(value) { return JSON.parse(value) }
            , boolean : function(value) { return JSON.parse(value) }
        }
        ;

    function assert(assertion, message) {
        if(!assertion) {
            throw new Error(message)
        }
    }

    function assertValues(values) {
        assert(_.isArray(values), 'Provide a valid values array')
        assert(values.length >= 2, 'You should only provide at least two possible values')
    }

    function assertValue(values, def) {
        if(_.isString(def)) {
            assert(_.contains(values, def), 'default is not within the list of values')
        }
    }

    function inferSettingType(settingValues) {
        var type
            ;

        settingValues.forEach(function(value) {
            if(_.isString(type) && type !== typeof(value)) {
                throw new Error('all values should belong to the same data type')
            }

            type = typeof(value)
        })

        return type
    }

    function valuesToStates(values) {
        return valueNodesToStates(valuesToCyclicListNodes(values))
        .reduce(function(prev, current, index) {
            prev[values[index]] = current
            return prev
        }, {})
    }

    function valuesToCyclicListNodes(values) {
        return values.map(function(value, index, list) {
            return {
                value : value
                , next : list[index+1] || list[0]
            }
        })
    }

    function valueNodesToStates(valueNodes) {
        return valueNodes.map(valueNodeToMachineState)
    }

    function valueNodeToMachineState(valueNode, index, cyclicList) {
        var state = {}
            ;

        state.toggle = function() {
            this.transition(valueNode.next)
            this.notifyChanges()
        }

        cyclicList.forEach(function(otherValueNode) {
            if(otherValueNode !== valueNode) {
                state[otherValueNode.value] = function() {
                    this.transition(otherValueNode.value)
                    this.notifyChanges()
                }
            }
        })

        return state
    }

    ToggleableSetting = Setting.extend({
        states : {}
    })

    Object.defineProperty(ToggleableSetting.prototype, 'value', {
        set : function(value) {
            this.handle(value)
        }

        , get : function() {
            var cast = castStrategies[this.type]
                ;

            return cast ? cast(this.state) : this.state
        }
    })

    ToggleableSetting.create = function(params) {
        var paramsAndStates
            , setting
            , value
            , values
            ;

        assertValues(params.values)
        assertValue(params.values, params.value)

        value = params.value
        values = params.values

        paramsAndStates = {
            initialState : (_.isUndefined(value) ? values[0] : value).toString()
            , name : params.name
            , states : valuesToStates(params.values)
            , hidden : params.hidden
            , disabled : params.disabled
            , userValue : params.userValue
            , type : inferSettingType(params.values)
        }

        setting = new ToggleableSetting(paramsAndStates)

        params.values.forEach(function(value) {
            Object.defineProperty(setting, value, {
                get : function() {
                    return this.state.toString() === value.toString()
                }
            })
        })

        return setting
    }

    return ToggleableSetting
}
