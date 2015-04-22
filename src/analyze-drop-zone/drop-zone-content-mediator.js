'use strict'

module.exports = DropZoneContentMediatorFactory

DropZoneContentMediatorFactory.$inject = [
    'lodash'
]

function DropZoneContentMediatorFactory(_) {
    var zones = []
        ;

    return {
        addZoneContent : function(ctrl, scope) {
            zones.push({ ctrl : ctrl, scope : scope })

            scope.$on('$destroy', function(e) {
                var index
                    ;

                zones.forEach(function(zone, i) {
                    if(zone.scope === e.currentScope) {
                        index = i
                    }
                })

                zones.splice(index, 1)
            })
        }

        , hide : function(zoneNames) {
            zoneNames.forEach(function(name) {
                var zone = this.getZone(name)
                    ;

                if(zone) {
                    this.getZone(name).ctrl.hide()
                }
            }, this)
        }

        , showAll : function() {
            zones.forEach(function(zone) {
                zone.ctrl.show()
            })
        }

        , getZones : function() {
            return zones
        }

        , getZone : function(name) {
            return zones.filter(function(zone) {
                return zone.ctrl.name() === name
            })[0]
        }
    }
}
