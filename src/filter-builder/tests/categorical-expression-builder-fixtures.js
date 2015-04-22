;
module.exports = (function() {
    'use strict';
    var summary = {
        categories: [{
                name: 'cat1'
                , id: '1'
            }
            , {
                name: 'cat2'
                , id: '2'
            }
        ]
    };
    var frequencies = [{
            value: 'cat1'
            , id: '1'
            , count: 1
            , missing: false
        }
        , {
            value: 'cat2'
            , id: '2'
            , count: 2
            , missing: false
        }
    ];
    var varid = '1';
    var variable = {
        element: 'shoji:entity'
        , self: '/api/datasets/123/variables/1/'
        , id: varid
        , body: {
            name: 'myName'
            , id: varid
        }
        , urls: {
            summary_url: '/api/datasets/123/variables/1/summary/'
            , frequencies_url: '/api/datasets/123/variables/1/frequencies/'
        }
    };
    return {
        variable: variable
        , summary: summary
        , frequencies: frequencies
    }
})
    .call(this);