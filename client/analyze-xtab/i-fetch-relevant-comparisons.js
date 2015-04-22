'use strict'

module.exports = IFetchRelevantComparisonsFactory

IFetchRelevantComparisonsFactory.$inject = [
    '$q'
    , 'assert'
    , '$injector'
]

function IFetchRelevantComparisonsFactory($q, assert, $injector) {
    var iFetchComparisons

    try {
        iFetchComparisons = $injector.get('iFetchComparisons')
    } catch(e) {
        iFetchComparisons = function() {
            return $q.reject(new Error('Comparisons are not available'))
        }
    }

    return function iFetchRelevantComparisons(params) {
        assert(params, 'Provide a valid params object')
        assert(params.variables instanceof Array, 'Provide a valid variables array')

        return iFetchComparisons().then(function(comparisons) {
            var variableIds = params.variables.map(function(v){
                return v.self
            })

            var relevantComparisons = variableIds.map(function(id){
                return comparisons.listAvailable(id)
            }, this)

            if(relevantComparisons.length > 0) {
                return comparisons.getAvailableWithCubes(variableIds)
            } else {
                return new Error('Comparisons are not available')
            }
        })
    }
}