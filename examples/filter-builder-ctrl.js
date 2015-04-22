'use strict';

FilterBuilderCtrl.$inject = [
    '$scope'
    , 'currentDataset'
    , 'FilterBuilder'
    //, 'ShareFilter'
]

function FilterBuilderCtrl($scope, currentDataset, FilterBuilder){//, ShareFilter) {
    var dataset
        , filterBuilder
        , shareFilter

    this.init = function(){

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