'use strict'

module.exports = ExpressionFactory

ExpressionFactory.$inject = []

function ExpressionFactory() {
    /**
     * Base expression object
     */
    return {
        primeCard : function() {
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

        , updateCases : function() {

        }
    }
}
