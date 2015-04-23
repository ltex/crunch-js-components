'use strict'

module.exports = IFetchRelevantComparisonsFactory

IFetchRelevantComparisonsFactory.$inject = [
    '$q'
    , 'assert'
    , '$injector'
]

function IFetchRelevantComparisonsFactory($q, assert, $injector) {
    var iFetchComparisons
        , comparisonsCache = {}

    try {
        iFetchComparisons = $injector.get('iFetchComparisons')
    } catch(e) {
        iFetchComparisons = function() {
            return $q.reject(new Error('Comparisons are not available'))
        }
    }

    return function iFetchRelevantComparisons(params) {
        var variableIds
            , comparisons
            , cacheKey
            ;

        assert(params, 'Provide a valid params object')
        assert(params.variables instanceof Array, 'Provide a valid variables array')

        variableIds = params.variables.map(function(v){
            return v.self
        })

        cacheKey = variableIds.join('&')

        if(comparisonsCache[cacheKey] && !params.updateCache) {
            comparisons = $q.when(comparisonsCache[cacheKey])
        } else {
            comparisons = iFetchComparisons().then(function(comparisons) {
                var relevantComparisons = variableIds.map(function(id) {
                    return comparisons.listAvailable(id)
                }, this)

                if (relevantComparisons.length > 0) {
                    return comparisons.getAvailableWithCubes(variableIds).then(function(r) {
                        return (comparisonsCache[cacheKey] = r)
                    })
                } else {
                    return new Error('Comparisons are not available')
                }
            })
        }

        return comparisons
    }
}