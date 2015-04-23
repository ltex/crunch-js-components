var EligibleVariableCtrl = require('../eligible-variable-ctrl');
module.exports = (function() {
    'use strict';
    describe('EligibleVariableCtrl', function() {
        describe('when variable is selected', function() {
            it('should raise event', function() {
                var event = null;
                var rootScope = {
                    $broadcast: function(e, args) {
                        event = {
                            name: e
                            , data: args
                        }
                    }
                };
                var variable = {
                    alias: 'meh'
                    ,type: 'variable'
                    , dataset_id: '123'
                };
                var scope = {
                    $on: function() {}
                };
                var sut = new EligibleVariableCtrl(
                    rootScope, scope);
                sut.selectVariable(null, variable);
                event.should.eql({
                    name: 'eligibleVariable.selected'
                    , data: {
                        alias: 'meh'
                        , type: 'variable'
                        , dataset_id: '123'
                    }
                })
            })
        })
    })
})
    .call(this);
