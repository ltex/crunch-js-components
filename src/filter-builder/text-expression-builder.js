module.exports = TextExpressionBuilderProvider

TextExpressionBuilderProvider.$inject = [
        'BaseExpressionBuilder'
    ]


function TextExpressionBuilderProvider(BaseExpressionBuilder) {

    var TextExpressionBuilder = BaseExpressionBuilder.extend({
        expType: 'text'
    })

    TextExpressionBuilder.create = function(isExclusion) {
            var builder =  new TextExpressionBuilder(isExclusion)
            return builder
        }
    return TextExpressionBuilder
}


