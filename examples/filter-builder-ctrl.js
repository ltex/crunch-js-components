'use strict';

FilterBuilderCtrl.$inject = [
    '$scope'
    , 'currentDataset'
    , 'FilterBuilder'
    , 'iFetchHierarchicalVariables'
    , 'createHVL'
    , 'signin'
    //, 'ShareFilter'
]


app.factory('createHVL', function(HierarchicalVariablesList) {
    'use strict'

    return function(hierarchicalVariables) {
        var hvl = HierarchicalVariablesList.create({
            hierarchicalVariables : hierarchicalVariables
        })

        //Make variable accordion draggable
        hvl.applyBehaviors({
            linkable : true,
            clickable : true
        })

        return hvl
    }
})

function FilterBuilderCtrl($scope, currentDataset, FilterBuilder, iFetchHierarchicalVariables, createHVL, signin){//, ShareFilter) {
    var dataset
        , filterBuilder
        , shareFilter

    this.init = function(){

        signin.apply(signin, secrets.credentials)
            .then(function() {
                return iFetchHierarchicalVariables({
                    datasetId : secrets.dataset
                })
            })
            .then(function(variables) {
                $scope.hierarchicalVariablesList = createHVL(variables)

                currentDataset.fetch()
                    .then(function (ds) {
                        dataset = ds

                        filterBuilder = $scope.filterBuilder = FilterBuilder.create({
                            dataset: dataset
                            // use iFetchDatasetFilters to get a filter and
                            // add to a filter argument here
                            //, filter: filter
                        })

                        /*
                         //this creates a sharing togle for the filter
                         shareFilter = $scope.shareFilter = ShareFilter.create({
                         dataset : dataset
                         , share : false
                         })*/
                    })

            })

        /*

         Here is an example of how to interact with the service bus to implement your filter (create or edit
         $scope.$on('filter.applied', function() {
         })

         $scope.$on('filter.edited', function($e, evt) {
         bus.send({
         command: 'applyFilter'
         , id: dataset.self
         , filterId: evt.filterId
         })
         })*/
    }
}

app.controller('FilterBuilderCtrl', FilterBuilderCtrl)