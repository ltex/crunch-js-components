;
module.exports = (function() {
    'use strict';

    function ExpressionBuilderFactory(
        categoricalExpressionBuilder, numericExpressionBuilder, textExpressionBuilder, multipleResponseExpressionBuilder, datetimeExpressionBuilder) {
        return {
            categorical: categoricalExpressionBuilder.create
            , numeric: numericExpressionBuilder.create
            , text: numericExpressionBuilder.create
            , multiple_response: multipleResponseExpressionBuilder.create
            , datetime: datetimeExpressionBuilder.create
        }
    }
    ExpressionBuilderFactory.$inject = [
        'categoricalExpressionBuilder', 'numericExpressionBuilder', 'textExpressionBuilder', 'multipleResponseExpressionBuilder', 'datetimeExpressionBuilder'
    ];
    return ExpressionBuilderFactory
})
    .call(this);