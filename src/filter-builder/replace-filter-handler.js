'use strict';
ReplaceFilterHandler.$inject = ['Shoji', 'bus','lodash'];
module.exports = ReplaceFilterHandler

function ReplaceFilterHandler(Shoji, bus, _) {
    function handle(command) {
        return function(dataset) {
            return dataset.urls.applied_filters.map(function(
                applied) {
                //@todo WDC same issue as the others, this should be done
                // in the caller, not the handler
                var appliedFilterIds = applied.value.groups[0].entities
                var i = appliedFilterIds.indexOf(command.previousFilterId)
                if (i !== -1) {
                    var j = appliedFilterIds.indexOf(command.filterId)
                    if (j !== -1) {
                        // then the desired filter is already applied
                        appliedFilterIds.splice(i, 1)
                    } else {
                        // replace the previous filter with the desired filter
                        appliedFilterIds[i] = command.filterId
                    }
                } else if (i === -1){
                    // append the filter to the applied_filters
                    appliedFilterIds.push(command.filterId)
                }

                appliedFilterIds = _.uniq(appliedFilterIds)

                return applied.update({
                    data: {element: 'shoji:view'
                            ,value: {
                                groups: [{
                                    entities: appliedFilterIds
                                    ,group: 'default'
                                }]
                            }
                    }
                })
                .then(function() {
                    return {
                        event: 'filter.replaced'
                        , filterIds: appliedFilterIds
                        , datasetId: dataset.id
                        , previousFilterId: command.previousFilterId
                        , filterId: command.filterId
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
