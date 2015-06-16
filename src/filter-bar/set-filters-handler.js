'use strict';
module.exports = RemoveFilterHandler
RemoveFilterHandler.$inject = ['Shoji', 'bus', 'lodash'];
function RemoveFilterHandler(Shoji, bus, _) {
    function handle(command) {
        return function(dataset) {
            return dataset.urls.applied_filters.update({
                    data: {element: 'shoji:view'
                            ,value: {
                                groups: [{
                                    entities: command.filters
                                    ,group: 'default'
                                }]
                            }
                    }
                }).then(function() {
                    return {
                        event: 'filters.set'
                        , filterIds: command.filters
                        , datasetId: dataset.id
                    }
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
