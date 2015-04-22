'use strict';
ApplyFilterHandler.$inject = ['Shoji', 'bus','lodash'];
module.exports = ApplyFilterHandler

function ApplyFilterHandler(Shoji, bus, _) {
    function handle(command) {
        return function(dataset) {
            return dataset.urls.applied_filters.map(function( applied) {
                var entities = applied.value.groups[0].entities
                entities.push(command.filterId)
                entities = _.uniq(entities)
                return applied.update({
                    data: {element: 'shoji:view'
                            ,value: {
                                groups: [{
                                    entities: entities
                                    ,group: 'default'
                                }]
                            }
                    }
                })
                .then(function() {
                    return {
                        event: 'filter.applied'
                        , filterIds: entities
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
