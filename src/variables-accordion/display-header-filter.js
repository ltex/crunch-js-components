'use strict';

module.exports = [
    function DisplayHeaderFilter(){
        return function(group) {
            if(!group.collapsable) {
                return !!!group.ungrouped
            }
            return true
        }

    }
]
