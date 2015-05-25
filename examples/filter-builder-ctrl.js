'use strict';

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


app.factory('persistFilter', ['filterCompiler', function(filterCompiler) {

    return function(dataset, name, expressions, junctions, op) {
        //op can be either update or save
        return dataset.urls.filters[op || 'save']({
            data : {
                name : name,
                expression : filterCompiler(expressions, junctions),
                is_public : true
            }
        })
    }
}])

app.factory('loadFilter', ['Shoji', 'filterDecompiler', function(Shoji, filterDecompiler) {
    return function(filterId, dataset) {
        return Shoji(filterId).map().then(function(filter) {
            return filterDecompiler(filter, dataset)
        })
    }
}])

function FilterBuilderCtrl($scope, currentDataset, FilterBuilder, iFetchHierarchicalVariables, createHVL, signin, persistFilter, loadFilter){
    var dataset
        , filterBuilder
        ;

    signin
    .apply(signin, secrets.credentials)
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
            })
        })
    })

    $scope.saveFilter = function() {
        var filter = filterBuilder.getFilter()
            ;

        persistFilter(dataset, filter.name, filter.expressions, filter.junctions)
            .then(function(newFilter) {
                console.log('Filter created ', newFilter.self)
            })
            .catch(function() {
                console.log('Filter could not be saved')
            })
    }

    $scope.loadFilter = function() {
        loadFilter($scope.filterId, dataset).then(function(filter) {
            filterBuilder = $scope.filterBuilder = FilterBuilder.create({
                dataset : dataset
                , filter : filter
            })
        })
    }
}

FilterBuilderCtrl.$inject = [
    '$scope'
    , 'currentDataset'
    , 'FilterBuilder'
    , 'iFetchHierarchicalVariables'
    , 'createHVL'
    , 'signin'
    , 'persistFilter'
    , 'loadFilter'
]

app.controller('FilterBuilderCtrl', FilterBuilderCtrl)