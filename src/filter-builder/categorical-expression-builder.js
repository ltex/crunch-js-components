module.exports = CategoricalExpressionBuilderProvider

CategoricalExpressionBuilderProvider.$inject = [
        'BaseExpressionBuilder'
    ]


function CategoricalExpressionBuilderProvider(BaseExpressionBuilder) {

    var CategoricalExpressionBuilder = BaseExpressionBuilder.extend({
            expType: 'categorical'
    })

    CategoricalExpressionBuilder.create = function(isExclusion) {
            var builder =  new CategoricalExpressionBuilder(isExclusion)
            return builder
        }
    return CategoricalExpressionBuilder
}
