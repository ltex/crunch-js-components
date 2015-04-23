'use strict'

module.exports = BaseExpressionBuilderProvider

BaseExpressionBuilderProvider.$inject = [
        'machina'
        , 'lodash'
        , 'iResourceVariable'
    ]

function BaseExpressionBuilderProvider(machina, _, iResourceVariable) {

    var BaseExpressionBuilder = machina.Fsm.extend({

        expType: 'base'
        , valueArg: 'column'

        , pickerItems: [
                {item: 'is any of'},
                {item: 'is not any of'}
            ]

        ,initialize: function(isExclusion) {
            this.isExclusion = isExclusion
            this.hasSource = false
            this.categories = {}
            this.name = null
            this.pickerOption = this.pickerItems[0]['item']
        }

        , prepareCategories: function(variable) {
            var self = this
            var result = {}
            var params = {
                ignore_filter: true,
                exclude_exclusion_filter: !!this.isExclusion
            }

            return variable.urls.frequencies.map({
                params: params
            }).then(function(freqs) {

                    var viewmodel = _.map(freqs.value, function(cat, idx) {
                        var catId  = cat.id

                        // Support for missing entries
                        if (_.isObject(catId)) {
                            catId = '?' + catId['?']
                        }

                        return {
                            name: cat.name || cat.value
                            , value: cat.value
                            , missing: cat.missing
                            , index: idx
                            , count: cat.count
                            , id: catId
                            , entryId: cat.id
                            , isSelected: false
                            , toggleSelection: function() {
                                this.isSelected = !this.isSelected
                            }
                        }
                    })

                    _.each(viewmodel, function(item) {
                        result[item.id] = item
                    })

                    self.categories = result
                    self.orderedCategories = _.sortBy(self.categories, 'index')
                    return self.categories
                })
        }
        , primeCard : function() {
            if (this.hasSource) {
                this.isPrimed = true
            }
        }

        , activate : function() {
            this.isActive = true
        }

        , deactivate : function() {
            if (this.isPrimed) {
                this.isActive = false
            }
        }

        , negateExpression : function(value) {
            this.negated = value !== 'is any of'
            this.updateCases()
        }

        , _sourceQuery : function(q) {
            var self = this
            return iResourceVariable(q)
                .then(function(r){self._sourceVariable(r)})
        }
    
        , _sourceVariable : function(variable) {
            this.name = variable.name
            this.id = variable.id
            this.variable = variable
            this.hasSource = true
            this.negated = false
            this.selectedRows = 0
            return this.prepareCategories(variable)
        }
    
        , source : function(variableOrQuery) {
            if (variableOrQuery.datasetId && variableOrQuery.variableId) {
                return this._sourceQuery(variableOrQuery)
            } else {
                return this._sourceVariable(variableOrQuery)
            }
        }
    
        , updateCases : function() {
            var self = this
            var total = 0

            this.selectedRows = 0

            _.each(this.categories, function(cat) {
                if (cat.isSelected) {
                    self.selectedRows += cat.count
                }
                total += cat.count
            })

            if (this.negated) {
                this.selectedRows = total - this.selectedRows
            }
        }

        , selectedCategories : function() {
            return _.filter(this.categories, function(c) {
                return c.isSelected
            })
        }
    
        , toggleCategorySelection : function(catId) {
            this.categories[catId] && this.categories[catId].toggleSelection()
            this.updateCases()
        }

        , deselectAll : function() {
            _.each(this.categories, function(cat) {
                cat.isSelected = false
            })

            this.updateCases()
        }
    
        , selectAll : function() {
            _.each(this.categories, function(cat) {
                cat.isSelected = true
            })

            this.updateCases()
        }
        , variableUrl : function(variablePrefix, variableSuffix){
            return (variablePrefix || '') + this.id + (variableSuffix || '')
        }
    
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
                .value()

            var varUrl = this.variableUrl(variablePrefix, variableSuffix)

            var r = {
                'function': 'in'
                , args: [{variable: varUrl}
                         ,{column: cats
                           , type: {'function': "typeof",
                            args: [ {"variable": varUrl}
                                   ]
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
        , extractVariableId : function(varUrl){
            var split = varUrl.split('/')

            //variable id has no positioning
            if (split.length === 1){
                return split
            }

            //variable ends in slash
            if (split[split.length - 1] === ''){
                return split[split.length - 2]
            }

            //variable at end
            return split[split.length - 1]
        }
    
        , decompile : function(fVar) {
            var self = this
            this.negated = fVar['function'] === 'not'
    
            if (this.negated){
                fVar = fVar['args'][0]
                this.pickerOption = 'is not any of'
            }
            else{
                this.pickerOption = 'is any of'
            }
    
            var variable
            var value
            _.each(fVar.args, function(arg){
                    if (arg.column!== undefined){
                        value = arg.column
                    }
                    if (arg.variable !== undefined){
                        variable = arg.variable
                    }
                }
            )
    
            this.id = this.extractVariableId(variable)

            _.each(value, function(catId) {
                if (_.isObject(catId)) {
                    // Support for missing frequencies
                    catId = '?' + catId['?'];
                }
                self.toggleCategorySelection(catId)
            })

            this.updateCases()
            return this
        }

    }) //end machina.Fsm.extend

    return BaseExpressionBuilder

}
