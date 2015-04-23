module.exports = DatetimeExpressionBuilderProvider

DatetimeExpressionBuilderProvider.$inject = [
        'BaseExpressionBuilder',
        'lodash'
    ]


function DatetimeExpressionBuilderProvider(BaseExpressionBuilder, _) {

    var DatetimeExpressionBuilder = BaseExpressionBuilder.extend({
    })

    DatetimeExpressionBuilder.create = function(isExclusion) {
            var builder =  new DatetimeExpressionBuilder(isExclusion)
            return builder
        }
    return DatetimeExpressionBuilder
}


