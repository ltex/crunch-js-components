'use strict'

module.exports = XtabFactory

XtabFactory.$inject = [
    'assert'
    , 'displayCube'
    , 'iFetchRelevantComparisons'
]

function XtabFactory(assert, displayCube, iFetchRelevantComparisons) {

    return {
        getXtab : function(params) {
            var analysis
                ;

            assert(params, 'Please provide a param object')
            assert(params.analysis, 'Please provide an analysis object')

            analysis = params.analysis

            return iFetchRelevantComparisons({
                variables : analysis.variables.valueOf()
                , updateCache : params.updateComparisonsCache
            })
            .then(function(comparisons) {
                return displayCube(analysis.data.cube, {
                    analysis : analysis
                    , settings : params.settings
                    , comparisons : comparisons
                })
            })
            .catch(function() {
                return displayCube(analysis.data.cube, {
                    analysis : analysis
                    , settings : params.settings
                })
            })
        }
    }
}

