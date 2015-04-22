'use strict';
module.exports = RemoveFilterHandler
RemoveFilterHandler.$inject = ['Shoji', 'bus', 'lodash'];
function RemoveFilterHandler(Shoji, bus, _) {
    function handle(command) {
        return function(dataset) {
            return dataset.urls.applied_filters.map(function(applied){
                var appliedFilters = applied.value.groups[0].entities
                var existing = appliedFilters.filter(function(k){
                    return k !== command.filterId
                })
                return applied.update({
                    data: {element: 'shoji:view'
                            ,value: {
                                groups: [{
                                    entities: existing
                                    ,group: 'default'
                                }]
                            }
                    }
                }).then(function() {
                    return {
                        event: 'filter.removed'
                        , filterIds: existing
                        , datasetId: dataset.id
                    }
                })
            })
        }
    }
    return function execute(command) {
        return Shoji(command.id)
            .map()
            .then(handle(command))
            .then(bus.publish)
    }
}
