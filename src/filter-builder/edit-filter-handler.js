module.exports = EditFilterHandler

EditFilterHandler.$inject = ['Shoji', 'bus', 'filterCompiler'];

function EditFilterHandler(Shoji, bus, filterCompiler) {
    function write(command) {
        return function(filter) {
            var data = {'expression': filterCompiler(command.expressions, command.junctions)}
            data.name = command.name;
            data.is_public = command.isPublic;
            return filter.update({
                data: data
            })
        }
    }

    function raiseEvent(editedFilter) {
        return editedFilter.map(function(nf) {
            return bus.publish({
                event: 'filter.edited'
                , id: nf.self
                , name: nf.name
                , filterId: nf.self
            })
        })
    }
    return function handle(command) {
        return Shoji(command.id)
            .map()
            .then(write(command))
            .then(raiseEvent)
    }
}
