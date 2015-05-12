module.exports = MultipleResponseExpressionBuilderProvider

MultipleResponseExpressionBuilderProvider.$inject = [
        'BaseExpressionBuilder'
        , 'lodash'
        , 'currentDataset'
    ]


function MultipleResponseExpressionBuilderProvider(BaseExpressionBuilder, _, currentDataset) {

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
            , updateCases : function() {
                var self = this
                var filter = this.build()

                if (filter == null){
                    return
                }

                function updateSelectedRows(dataset) {
                    dataset.urls.summary.map({
                        params: {
                            filter_syntax: {
                                expression: filter
                            }
                        }
                        , cached: false
                    }).then(function (summary){
                        self.selectedRows = summary.value.rows.filtered
                    })
                }

                if (this._ds === undefined){
                    currentDataset.fetch().then(function(dataset){
                        self._ds = dataset
                        updateSelectedRows(dataset)
                    })
                }
                else {
                    updateSelectedRows(this._ds)
                }
            }
            , build : function(variablePrefix, variableSuffix) {
                if (!this.hasSource) {
                    return NULL
                }

                var cats = _(this.categories)
                    .filter(function(it) {
                        return it.isSelected
                    })
                    .map(function(cat) {
                        return cat.id
                    })
                    .value();

                if (cats.length === 0){
                    return NULL
                }

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

                _.each(columns, function(catId) {
                    self.toggleCategorySelection(catId)
                })
                this.updateCases()
                return this
            }
            , negateExpression : function(value) {
                this.updateCases()
            }
    })

    MultipleResponseExpressionBuilder.create = function(isExclusion) {
            var builder =  new MultipleResponseExpressionBuilder(isExclusion)
            return builder
        }
    return MultipleResponseExpressionBuilder
}





