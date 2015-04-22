'use strict';

module.exports = buildHierarchical

function buildHierarchical(numOfTags, numOfVariables,hasUngrouped, hasNested) {
    var groups = 'abcdefghijklmnopqrstuvwxyz'.split('')
    groups = groups.splice(0,numOfTags)
    if(hasUngrouped) {
        groups = groups.concat(['ungrouped'])
    }
    var hier = {
        orderId: '/hierarchical/'
        ,datasetId: '/datasets/123/'
        ,ordered: []
        ,flattened: []
        ,flatten: function(){
            return this.flattened
        }
    }
    for(var i = 0; i<groups.length; i++) {
        var grp = groups[i]
        var group = {
            group: grp
            ,items: []
        }

        for(var j = 0 ;j < numOfVariables; j++) {
            var varb = {
                group: grp
                ,self: grp + j + '/'
            }
            group.items.push(varb)
            hier.flattened.push(varb)
        }
        hier.ordered.push(group)
    }

    if(hasNested) {
        hier.ordered.push({
            group : 'with nested'
            , items : [
                {
                    group : 'nested'
                    , items : [
                    {
                        group : 'a'
                        , self : '/'
                    }
                ]
                }
            ]
        })
    }

    if(!hasUngrouped) {
        hier.ordered.push({
            group: 'ungrouped'
            ,items: []
        })
    }

    return hier
}