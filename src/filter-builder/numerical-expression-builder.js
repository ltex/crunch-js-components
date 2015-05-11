module.exports = NumericExpressionBuilderProvider

NumericExpressionBuilderProvider.$inject = [
    'BaseExpressionBuilder'
    ,'lodash'
]


function NumericExpressionBuilderProvider(BaseExpressionBuilder, _) {

    var NumericExpressionBuilder = BaseExpressionBuilder.extend({
        expType: 'numeric'
        , valueArg: 'value'
        , build : function(variablePrefix, variableSuffix) {
            if (!this.hasSource) {
                return NULL
            }

            var cats = _(this.categories)
                .filter(function(it) {
                    return it.isSelected
                })
                .map(function(cat) {
                    return cat.entryId
                })
                .value()

            var varUrl = this.variableUrl(variablePrefix, variableSuffix)
            var r = {
                'function': 'in'
                , args: [{variable: varUrl}
                         ,{column: cats
                           , type: {
                                'function': "typeof",
                                args: [ {"variable": varUrl}]
                           }
                      }
                ]
            }
            if (this.negated){
                r = {'function': 'not',
                     'args': [r]
                    }
            }
            return r
        }
    })

    NumericExpressionBuilder.create = function(isExclusion) {
            var builder =  new NumericExpressionBuilder(isExclusion)
            return builder
        }
    return NumericExpressionBuilder
}


