'use strict'

module.exports = FilterBuilderFactory

FilterBuilderFactory.$inject = [
    'machina'
    , 'lodash'
    , 'Filter'
    , 'evalFilter'
    , 'bus'
]

function FilterBuilderFactory(Machina, _, Filter, evalFilter, bus) {

    function assertDataset(params) {
        if(!_.isObject(params.dataset)) {
            throw new Error('please provide a valid dataset object')
        }
    }

    var FilterBuilder = Machina.Fsm.extend({
        initialState : 'uninitialized'
        , $events : [
            'eligibleVariable.selected:link'
            , 'variable.clicked'
        ]

        , setFilterName : function(name) {
            this.filter.name = name
            bus.publish({
                  event : 'expression.changed'
            })
        }

        , addExpression : function(variable) {
            var expressions = this.filter.addExpression(this.dataset, variable)
                ;

            expressions.forEach(this.decorateWithFilterEvaluation.bind(this))
            this.evaluateFilter()
            this.emit('expression.added')
        }

        , junctionChanged : function(junctionIndex, junctionValue) {
            this.filter.junctions[junctionIndex] = junctionValue
            this.emit('expression.changed')
        }

        , decorateWithFilterEvaluation : function(expression) {
            var operationsThatRequiresEvaluation = [
                    'toggleCategorySelection'
                    , 'selectAll'
                    , 'deselectAll'
                    , 'negateExpression'
                    , 'setExpression'
                ]
                ,evaluateFilter = this.evaluateFilter.bind(this)
                ,emit = this.emit.bind(this)
                ;

            operationsThatRequiresEvaluation.forEach(function(op) {
                var opFn = expression[op]
                    ;

                if(_.isFunction(opFn)) {
                    expression[op] = _.wrap(opFn, function(opFn) {
                        opFn.apply(this, Array.prototype.slice.call(arguments, 1))
                        evaluateFilter()
                        emit('expression.changed')
                        bus.publish({
                          event : 'expression.changed'
                        })
                    })
                }
            })
        }

        , deleteExpression : function(atIndex) {
            var filter = this.filter
                , target = filter.expressions[atIndex]
                ;

            filter.expressions.splice(atIndex, 1)
            this.evaluateFilter()
            this.emit('expression.changed')
            this.emit('expression.removed')
        }

        , evaluateFilter : function() {
            var args = {
                expressions : this.filter.expressionsWithSource()
                , junctions : this.filter.junctions
                , datasetId : this.dataset.self
                , excludeExclusions : this.exclusionMode
            }
            ;

            return evalFilter(this.dataset, args).then(function(stats) {
                this.stats = stats
            }.bind(this))
        }

        , filterExpressions : function() {
            return this.filter.expressions
        }

        , expressionsCount : function() {
            return this.filterExpressions().length
        }

        , hasVariables : function() {

            return this.expressionsCount() > 0

            }
        , hasExpressions : function() {
            var i

            if (this.expressionsCount() > 0){
                 for (i=0; i<this.filter.expressions.length; i++) {
                    if (this.filter.expressions[i] && this.filter.expressions[i].selectedCategories().length > 0){
                        return true
                    }
                 }
            }

            return false
        }

        , junctionsCount : function() {
            return this.filter.junctions.length
        }

        , isCreatable : function() {
            return this.isNamed() && this.hasExpressions()
        }

        , isNamed : function() {
            return _.isString(this.filter.name) &&
            this.filter.name.length > 0
        }

        , filterName : function() {
            return this.filter.name
        }

        , replace : function(builder) {
            //replace the current scope's builder
            this.thisScope.filterBuilder = builder

            //pass the scope along to the new builder
            builder.thisScope = this.thisScope
        }

        , stat : function(statName) {
            return this.stats[statName]
        }

        , getFilter : function() {
            return this.filter.getMemento()
        }

        , destroy : function(){
            this.oldEventListeners = this.eventListeners
            return this.transition('destroyed')
        }
        , revive : function(){
            this.eventListeners = this.oldEventListeners
            return this.transition('revived')
        }
        , headerClicked : function(event){

        }
        , states : {
            uninitialized : {
                initialize : function(params) {
                    assertDataset(params)

                    this.filter = new Filter(params.filter)
                    this.stats = { filtered : 0, total : 0 }
                    this.dataset = params.dataset

                    if(_.isString(params.defaultName)) {
                        this.filter.name = params.defaultName
                    }

                    if(_.isBoolean(params.exclusionMode)) {
                        this.exclusionMode = params.exclusionMode
                    }

                    this.filter.expressions.forEach(this.decorateWithFilterEvaluation.bind(this))
                    this.evaluateFilter().then(function(){
                        this.transition('initialized')
                    }.bind(this))
                }
            }
            ,initialized : {
                'eligibleVariable.selected:link' : function(e, variable) {
                    this.addExpression(variable)
                }
                , 'variable.clicked' : function(e, args) {
                    if (args.behaviors && args.behaviors.clickable === false){
                        return
                    }

                    this.addExpression(args.variable)
                }

                , deleteExpression : function(expressionIndex) {
                    this.deleteExpression(expressionIndex)
                }
            }
            ,destroyed: {
                _onEnter:function() {
                    this.off()
                }
                , revived: function(){}
            }
            ,revived: {
                _onEnter:function() {
                    this.transition('initialized')
                }
            }

        }
    })

    return {
        create : function(params) {
            var builder = new FilterBuilder()
                ;

            builder.handle('initialize', params || {})

            return builder
        }
    }

}
