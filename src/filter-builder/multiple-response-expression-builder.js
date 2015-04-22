module.exports = MultipleResponseExpressionBuilderProvider

MultipleResponseExpressionBuilderProvider.$inject = [
        'BaseExpressionBuilder'
        , 'lodash'
    ]


function MultipleResponseExpressionBuilderProvider(BaseExpressionBuilder, _) {

    var MultipleResponseExpressionBuilder = BaseExpressionBuilder.extend({
            expType: 'multiple response'
            , functionMap : {
                'is any of': 'any',
                'is all of': 'all',
                'is not any of': 'any',
                'is not all of': 'all'
            }
            , functionReverseMap : {
                'any': 'is any of',
                'all': 'is all of',
                'not any': 'is not any of',
                'not all': 'is not all of'
            }
            , pickerItems : [{
                    item: 'is any of'
                }
                , {
                    item: 'is all of'
                }, {
                    item: 'is not any of'
                }
                , {
                    item: 'is not all of'
                }
            ]
            , build : function(variablePrefix, variableSuffix) {
                if (!this.hasSource) {
                    return null
                }

                var cats = _(this.categories)
                    .filter(function(it) {
                        return it.isSelected
                    })
                    .map(function(cat) {
                        return cat.id
                    })
                    .value();

                var func = this.functionMap[this.pickerOption]
                var varUrl = this.variableUrl(variablePrefix, variableSuffix)

                this.negated = this.pickerOption.indexOf('is not') != -1


                var r = {
                    'function': func
                    , args: [{variable: varUrl}
                             ,{column: cats}
                               ]
                    }

                if (this.negated){
                    r = {'function': 'not',
                         'args': [r]
                        }
                }
                return r
            }

            , decompile : function(fVar) {
                var self = this

                this.negated = fVar['function'] === 'not'

                if (this.negated){
                    fVar = fVar['args'][0]
                    this.pickerOption = this.functionReverseMap['not ' + fVar.function]
                }
                else{
                    this.pickerOption = this.functionReverseMap[fVar.function]
                }

                var variable
                var columns
                _.each(fVar.args, function(arg){
                        if (arg.column !== undefined){
                            columns = arg.column
                        }
                        if (arg.variable !== undefined){
                            variable = arg.variable
                        }
                    }
                )

                this.id = variable

                _.each(columns, function(catId) {
                    self.toggleCategorySelection(catId)
                })
                this.updateCases()
                return this
            }
            , negateExpression : function(value) {
                self.pickerOption = functionMap[value] || 'is any of'
                self.updateCases()
            }
    })

    MultipleResponseExpressionBuilder.create = function(isExclusion) {
            var builder =  new MultipleResponseExpressionBuilder(isExclusion)
            return builder
        }
    return MultipleResponseExpressionBuilder
}





