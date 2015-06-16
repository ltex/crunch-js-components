'use strict';

module.exports = FilterBarFactory

FilterBarFactory.$inject = [
    'machina'
    ,'iFetchFilters'
    ,'bus'
    ,'$state'
    ,'lodash'
]
function FilterBarFactory(machina, filters, bus, $state, _){
    function assert(pred, msg){
        if(pred){
            return
        }
        throw new Error(msg)
    }

    var FilterBar = machina.Fsm.extend({
        initialState: 'uninitialized'
        ,namespace: 'filterBar'
        ,_maxFilters: 4
        ,_store: function(cfg) {
            assert(cfg,'cfg is required')
            assert(cfg.datasetId,'datasetId is required')
            this.datasetId = cfg.datasetId
            this.catalogId = cfg.catalogId
            this._eligibleFilters = cfg.eligible || {}
            this._appliedFilters = cfg.applied || {}
            this._updateLists()
        }
        ,_updateLists: function(){
            this.appliedFilters =[]
            this.eligibleFilters = []

            this._appliedFilters.forEach(function(k){
                this.appliedFilters.push(this._eligibleFilters[k])
            },this)

            Object.keys(this._eligibleFilters || {})
                .filter(function(k){
                    return this._appliedFilters.indexOf(k) === -1
                },this)
                .forEach(function(k){
                    this.eligibleFilters.push(this._eligibleFilters[k])
                },this)

            this._transitionToClosed()
        }
        ,_apply: function(filterId){
            this._appliedFilters.push(filterId)
            this._updateLists()
        }
        ,_unapply: function(filter) {
            var i = this._appliedFilters.indexOf(filter)
            this._appliedFilters.splice(i, 1)
            this._updateLists()
        }
        ,_replace: function(args){
            var i = this._appliedFilters.indexOf(args.previousFilterId)
            if (i != -1) {
                this._appliedFilters[i] = args.filterId
            }
            this._updateLists()
        }
        ,_filterDeleted: function(args){
            delete this._eligibleFilters[args.filterId]
            this._unapply(args.filterId)
        }
        ,_filterEdited: function(args){
            this._eligibleFilters[args.filterId] = {
                is_public: args.isPublic
                ,name: args.name
                ,editable: true // let's assume that if it was edited we can edit it
                ,self: args.filterId
            }
            this._updateLists()
        }
        ,_transitionToClosed: function(){
            var target = (this.hasAppliedFilters() ? 'filtered': 'unfiltered')
            if (target === 'filtered') {
                target = (this.hasMaxFilters() ? 'max' : 'filtered')
            }
            return this.transition(target)
        }
        ,_createNewFilter: function(args){
            // WDC TODO, move this and all of the filters into their
            // own machines
            this._eligibleFilters[args.filterId] = {
                is_public: args.isPublic
                ,name: args.name
                ,editable: true // let's assume that if we created it we can edit it
                ,self: args.filterId
            }
            this._updateLists()
        }
        ,_rebuildFilters: function(args){
            // In args.filterIds we trust.
            bus.send({
                command: 'setFilters'
                ,id: this.datasetId
                ,filters: args.filterIds
            })
            this._appliedFilters = args.filterIds
            this._updateLists()
        }
        ,$events: [
            'filter.applied'
            ,'filter.removed'
            ,'filter.created'
            ,'filter.replaced'
            ,'filter.edited'
            ,'filter.clobbered'
            ,'filter.deleted'
            ,'arrayVariableUnbound'
            ,'dataset.opening'
            ,'dataset.opened'
            ,'datasetConsistency.current'
        ]
        ,initialize: function(cfg) {
            this.appliedFilters = []
            this.eligibleFilters  = []
        }
        ,hasAppliedFilters: function(){
            if (this.appliedFilters.length > 0){
                this.isUnfiltered = false
                return true
            } else {
                this.isUnfiltered = true
                return false
            }
        }
        ,hasMaxFilters: function(){
            if (this.appliedFilters.length >= this._maxFilters){
                this.limitReached = true
                return true
            } else {
                this.limitReached = false
                return false
            }
        }
        ,getFilterName: function(id){
            return this._eligibleFilters[id].name
        }

        , _fetch : function() {
            return filters()
                .then(function(cfg) {
                    this._store(cfg)
                    this._transitionToClosed()
                }.bind(this))
        }
        , refreshCurrent: function(){
            return this._fetch()
        }

        ,states: {
            uninitialized: {
                _onEnter: function() {
                    this.initialize()
                }
                ,initialize: function() {
                    return this._fetch()
                }
                ,'dataset.opened': function() {
                    return this.handle('initialize')
                }
            }
            ,unfiltered: {
                append: function(){
                    this.transition('appending')
                }
                ,'filter.applied': function(e, args) {
                    var filters = _.difference(args.filterIds, this._appliedFilters)
                    filters.forEach(function(filter){
                        this._apply(filter)
                    },this)
                }
                ,'filter.removed': function(e, args) {
                    var filters = _.difference(this._appliedFilters, args.filterIds)
                    filters.forEach(function(filter){
                        this._unapply(filter)
                    },this)
                }
                ,'filter.created': function(e, args) {
                    this._createNewFilter(args)
                }
                ,'filter.deleted': function(e, args) {
                    this._filterDeleted(args)
                }
                ,'filter.edited': function(e, args) {
                    this._filterEdited(args)
                }
                ,'filter.clobbered': function(e, args) {
                    this._rebuildFilters(args)
                }
                ,'arrayVariableUnbound': function(e, args) {
                    return this._fetch()
                }
                ,'dataset.opening': function(e, args){
                    return this.transition('uninitialized')
                }
                ,'datasetConsistency.current' : function() {
                    this._fetch()
                }
            }
            ,filtered: {
                append: function(){
                    this.transition('appending')
                }
                ,replace: function(filter){
                    this.activeFilter = filter
                    this.transition('replacing')
                }
                ,'filter.applied': function(e, args) {
                    var filters = _.difference(args.filterIds, this._appliedFilters)
                    filters.forEach(function(filter){
                        this._apply(filter)
                    },this)
                }
                ,'filter.removed': function(e, args) {
                    var filters = _.difference(this._appliedFilters, args.filterIds)
                    filters.forEach(function(filter){
                        this._unapply(filter)
                    },this)
                }
                ,'filter.replaced': function(e, args) {
                    this._replace(args)
                }
                ,'filter.created': function(e, args) {
                    this._createNewFilter(args)
                }
                ,'filter.edited': function(e, args) {
                    this._filterEdited(args)
                }
                ,'filter.clobbered': function(e, args) {
                    this._rebuildFilters(args)
                }
                ,'filter.deleted': function(e, args) {
                    this._filterDeleted(args)
                }
                ,'arrayVariableUnbound': function(e, args) {
                    return this._fetch()
                }
                ,'dataset.opening': function(e, args){
                    return this.transition('uninitialized')
                }
                ,'datasetConsistency.current' : function() {
                    this._fetch()
                }
            }
            ,max: {
                replace: function(filter){
                    this.activeFilter = filter
                    this.transition('replacing')
                }
                ,'filter.applied': function(e, args) {
                    var filters = _.difference(args.filterIds, this._appliedFilters)
                    filters.forEach(function(filter){
                        this._apply(filter)
                    },this)
                }
                ,'filter.removed': function(e, args) {
                    var filters = _.difference(this._appliedFilters, args.filterIds)
                    filters.forEach(function(filter){
                        this._unapply(filter)
                    },this)
                }
                ,'filter.replaced': function(e, args) {
                    this._replace(args)
                }
                ,'filter.created': function(e, args) {
                    this._createNewFilter(args)
                }
                ,'filter.edited': function(e, args) {
                    this._filterEdited(args)
                }
                ,'filter.clobbered': function(e, args) {
                    this._rebuildFilters(args)
                }
                ,'filter.deleted': function(e, args) {
                    this._filterDeleted(args)
                }
                ,'arrayVariableUnbound': function(e, args) {
                    return this._fetch()
                }
                ,'dataset.opening': function(e, args){
                    return this.transition('uninitialized')
                }
                ,'datasetConsistency.current' : function() {
                    this._fetch()
                }
            }
            ,appending: {
                apply: function(filter) {
                    bus.send({
                        command: 'applyFilter'
                        ,id: this.datasetId
                        ,filterId: filter.self
                    })
                    this._transitionToClosed()
                }
                ,cancel: function(){
                    this._transitionToClosed()
                }
                ,unapply: function(){
                    //virtually a noop
                    this._transitionToClosed()
                }
                ,replace: function(filter){
                    this.activeFilter = filter
                    this.transition('replacing')
                }
                ,editFilter: function(filter){
                    $state.transitionTo('app.datasets.editFilter', {
                        datasetId: this.datasetId
                        ,filterId: filter.self
                    })
                    this._transitionToClosed()
                }
                ,viewFilter: function(filter){
                    $state.transitionTo('app.datasets.viewFilter', {
                        datasetId: this.datasetId
                        ,filterId: filter.self
                    })
                    this._transitionToClosed()
                }
                ,buildFilter: function(){
                    $state.transitionTo('app.datasets.buildFilter', {
                        datasetId: this.datasetId
                        ,postBuildAction: 'apply'
                    })
                    this._transitionToClosed()
                }
                ,'filter.applied': function(e, args) {
                    var filters = _.difference(args.filterIds, this._appliedFilters)
                    filters.forEach(function(filter){
                        this._apply(filter)
                    },this)
                }
                ,'filter.removed': function(e, args) {
                    var filters = _.difference(this._appliedFilters, args.filterIds)
                    filters.forEach(function(filter){
                        this._unapply(filter)
                    },this)
                }
                ,'filter.replaced': function(e, args) {
                    this._replace(args)
                }
                ,'filter.created': function(e, args) {
                    this._createNewFilter(args)
                }
                ,'filter.edited': function(e, args) {
                    this._filterEdited(args)
                }
                ,'filter.clobbered': function(e, args) {
                    this._rebuildFilters(args)
                }
                ,'filter.deleted': function(e, args) {
                    this._filterDeleted(args)
                }
                ,'dataset.opening': function(e, args){
                    return this.transition('uninitialized')
                }
                ,'datasetConsistency.current' : function() {
                    this._fetch()
                }
            }
            ,replacing: {
                apply: function(filter) {
                    var replace = {
                        command: 'replaceFilter'
                        ,id: this.datasetId
                        ,previousFilterId: this.activeFilter.self
                        ,filterId: filter.self
                    }

                    bus.send(replace)
                    this._transitionToClosed()
                }
                ,cancel: function(){
                    this._transitionToClosed()
                }
                ,unapply:function(){
                    var unapply = {
                        command: 'removeFilter'
                        ,id: this.datasetId
                        ,filterId: this.activeFilter.self
                    }
                    bus.send(unapply)
                    this._transitionToClosed()
                }
                ,append: function(){
                    this.activeFilter = undefined
                    this.transition('appending')
                }
                ,replace: function(filter){
                    this.activeFilter = filter
                    this.transition('replacing')
                }
                ,editFilter: function(filter){
                    $state.transitionTo('app.datasets.editFilter', {
                        datasetId: this.datasetId
                        ,filterId: filter.self
                    })
                    this._transitionToClosed()
                }
                ,viewFilter: function(filter){
                    $state.transitionTo('app.datasets.viewFilter', {
                        datasetId: this.datasetId
                        ,filterId: filter.self
                    })
                    this._transitionToClosed()
                }
                ,buildFilter: function(){
                    $state.transitionTo('app.datasets.buildFilter', {
                        datasetId: this.datasetId
                        ,postBuildAction:'replace'
                        ,replace:this.activeFilter.self
                    })
                    this._transitionToClosed()
                }
                ,_onExit: function(){
                    this.activeFilter = undefined
                }
                ,'filter.applied': function(e, args) {
                    var filters = _.difference(args.filterIds, this._appliedFilters)
                    filters.forEach(function(filter){
                        this._apply(filter)
                    },this)
                }
                ,'filter.removed': function(e, args) {
                    var filters = _.difference(this._appliedFilters, args.filterIds)
                    filters.forEach(function(filter){
                        this._unapply(filter)
                    },this)
                }
                ,'filter.replaced': function(e, args) {
                    this._replace(args)
                }
                ,'filter.created': function(e, args) {
                    this._createNewFilter(args)
                }
                ,'filter.edited': function(e, args) {
                    this._filterEdited(args)
                }
                ,'filter.clobbered': function(e, args) {
                    this._rebuildFilters(args)
                }
                ,'dataset.opening': function(e, args){
                    return this.transition('uninitialized')
                }
                ,'datasetConsistency.current' : function() {
                    this._fetch()
                }
            }
        }

    })

    var bar = new FilterBar()
    return bar
}
