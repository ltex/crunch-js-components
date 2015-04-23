module.exports = NumericExpressionBuilderProvider

NumericExpressionBuilderProvider.$inject = [
        'BaseExpressionBuilder'
    ]


function NumericExpressionBuilderProvider(BaseExpressionBuilder) {

    var NumericExpressionBuilder = BaseExpressionBuilder.extend({
        expType: 'numeric'
        , valueArg: 'value'
    })

    NumericExpressionBuilder.create = function(isExclusion) {
            var builder =  new NumericExpressionBuilder(isExclusion)
            return builder
        }
    return NumericExpressionBuilder
}


