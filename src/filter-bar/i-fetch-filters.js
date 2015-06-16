'use strict';

module.exports = IFetchFilters

IFetchFilters.$inject = [
    'currentDataset'
    ,'iFetchCurrentUserDatasetPermissions'
    ,'iResourceUser'
]

function IFetchFilters(currentDataset, iFetchCurrentUserDatasetPermissions, iResourceUser) {

    function exposeCurrentUser(acc, dataset){
        //guarantee that we have url for datasetId
        acc.datasetId = dataset.self
        return iResourceUser.current().then(function(user){
            acc.currentUser = user
            return dataset
        })
    }

    function exposeCurrentUserDatasetPermissions(acc, dataset) {
        return iFetchCurrentUserDatasetPermissions().then(function(permissions) {
            acc.datasetPermissions = permissions
            return dataset
        })
    }

    function exposeApplied(acc, dataset){
        return dataset.urls.applied_filters.map().then(function(applied){
            acc.applied = applied.value.groups[0].entities
            return dataset
        })
    }

    function exposeEligible(acc, dataset){
        return dataset.urls.filters.map().then(function(eligible){
            var filters = eligible.index
            acc.eligible = filters.toObject()
            for (var i = 0; i < filters.keys.length; i++) {
                var filter = acc.eligible[filters.keys[i]]
                filter.editable = (filter.is_public) ? acc.datasetPermissions.edit :
                 (acc.currentUser.self === filter.owner_id)
            }
            return dataset
        })
    }

    function config(acc){
        return acc
    }

    return function execute(q) {

        var acc = {
            catalogId: undefined
            ,datasetId: undefined
            ,eligible: undefined
            ,applied: undefined
            ,currentUser: undefined
        }
        var handlers = [
            exposeCurrentUser
            ,exposeCurrentUserDatasetPermissions
            ,exposeApplied
            ,exposeEligible
            ,config
        ]

        return currentDataset.fetch().then(function(dataset) {
            return dataset.reduce(acc, handlers)
        })
    }
}
