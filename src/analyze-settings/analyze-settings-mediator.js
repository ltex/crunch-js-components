'use strict'

module.exports = AnalyzeSettingsMediatorFactory

function AnalyzeSettingsMediatorFactory(machina
    , bus
    , Setting
    , ToggleableSetting
    , userPreferences) {

    function assert(prd, message) {
        if(!prd) {
            throw new Error(message)
        }
    }

    function createSettings() {
        return {
            decimalPlaces: ToggleableSetting.create({
                name : 'decimalPlaces'
                , disabled: false
                , hidden: false
                , value: 0
                , values: [0,1,2]
            })

            , tableOrGraph: ToggleableSetting.create({
                name : 'tableOrGraph'
                , values : ['table', 'graph']
                , disabled: false
                , hidden: false
                , value: userPreferences.get('defaultAnalysis') || 'table'
            })

            , slicesOrGroups: ToggleableSetting.create({
                name : 'slicesOrGroups'
                , values : ['groups', 'slices']
                , disabled: true
                , hidden: true
                , value: 'groups'
            })

            , countsOrPercents: ToggleableSetting.create({
                disabled: true
                , hidden: true
                , value: 'percent'
                , values : ['percent', 'count']
                , name : 'countsOrPercents'
            })

            , percentageDirection: ToggleableSetting.create({
                disabled: true
                , hidden: true
                , value: 'colPct'
                , values : ['colPct', 'rowPct', 'cellPct']
                , userValue: undefined
                , name : 'percentageDirection' // MLM: remains undefined until the user selects a choice to override default colPct in biate table
            })

            , useColor: ToggleableSetting.create({
                disabled: false
                ,hidden: false
                ,value: false
                ,values: [false, true]
                ,name: 'useColor'
            })

            , pivot: ToggleableSetting.create({
                disabled: true
                , hidden: true
                , value: true
                , values: [true, false]
                , name : 'pivot'
            })

            , showEmpty: ToggleableSetting.create({
                disabled: false
                , hidden: false
                , value: false
                , values: [true, false]
                , name : 'showEmpty'
                , enabledOffTitle: 'Show empty rows and columns'
                , enabledOnTitle: 'Hide empty rows and columns'
                , disabledTitle: 'No empty rows or columns'
            })

            , showSignif: ToggleableSetting.create({
                disabled: false
                , hidden: false
                , value: false
                , values: [true, false]
                , name : 'showSignif'
            })

            , sortDirection : ToggleableSetting.create({
                disabled: false
                , hidden: false
                , value: 0
                , values: [0, -1, 1]
                , name : 'sortDirection'
            })
        }
    }

    function exposeSettingsChanges(event, oldValue, newValue) {
        bus.publish({
            event : event
            , oldValue : oldValue
            , newValue : newValue
        })
    }

    var AnalyzeSettingsMediator = machina.Fsm.extend({
        destroy : function() {
            var settings = this.settings
                ;

            Object.keys(settings).forEach(function(settingName) {
                var off = settings[settingName].off
                    ;

                off && off()
            })
        }
        , initialize : function() {
            var self = this
                , settings = createSettings()
                ;

            this.settings = settings

            Object.keys(settings).forEach(function(settingName) {
                var setting = settings[settingName]
                    , event = settingName + '.changed'
                    ;

                setting.on && setting.on(event, function(oldValue, newValue) {
                    exposeSettingsChanges(event, oldValue, newValue)
                    self.checkSettingsConsistency()
                })
                self[settingName] = setting
            })
        }

        , checkPercentageDirection: function() {
            //MLM: TODO: a lot of these things can probably be put in the _onEnter
            var currentAnalysis = this.currentAnalysis
                , countsOrPercents = this.countsOrPercents
                , percentageDirection = this.percentageDirection
                , univariate = currentAnalysis.isUnivariate()
                , bivariate = currentAnalysis.isBivariate()
                , arrayVariable = currentAnalysis.hasArrayVariables()
                ;

            var direction = percentageDirection.value

            if(univariate) {
               direction = 'cellPct' //these should be defaults on Univariate instead
            }else if(bivariate){
                direction = percentageDirection.userValue || 'colPct' //these should be defaults on Multivariate instead
            } else if(arrayVariable){
                direction = percentageDirection.userValue || 'rowPct'
            } else {
                direction = percentageDirection.value
            }

            percentageDirection.disabled = countsOrPercents.value === 'count' || univariate
            percentageDirection.hidden = univariate
            percentageDirection.value = direction
        }

        , checkCountOrPercents : function() {
            var countsOrPercents = this.countsOrPercents
                , hasMeanMeasure = this.currentAnalysis.hasMeanMeasure()
                ;

            countsOrPercents.disabled = countsOrPercents.hidden = hasMeanMeasure
        }

        , checkSlicesOrGroups: function() {
            // TODO WDC: test!
            var tableOrGraph = this.tableOrGraph
                , slicesOrGroups = this.slicesOrGroups
                , currentAnalysis = this.currentAnalysis
                , slicesOrGroupsEnabled
                , univariate = currentAnalysis.isUnivariate()
                , hasArrays = currentAnalysis.hasArrayVariables()
                ;

            slicesOrGroupsEnabled = tableOrGraph.value === 'graph' &&
            currentAnalysis.graphType === 'barchart' &&
            (!univariate || hasArrays)

            slicesOrGroups.disabled = slicesOrGroups.hidden = slicesOrGroupsEnabled
        }

        , checkDecimalPlaces: function() {
            this.decimalPlaces.disabled = this.countsOrPercents.value === 'count'
        }

        , checkPivot: function() {
            this.pivot.disabled = this.currentAnalysis.isUnivariate()
            this.pivot.hidden = this.currentAnalysis.isUnivariate()
        }

        , checkTestable: function(){
            this.showSignif.disabled = this.currentAnalysis.isUnivariate() ||
            this.currentAnalysis.hasArrayVariables() ||
            this.currentAnalysis.hasMeanMeasure() ||
            this.countsOrPercents.value === 'count' ||
            this.percentageDirection.value === 'cellPct' ||
            this.tableOrGraph.value === 'graph'
        }

        , checkSettingsConsistency: function() {
            if(!this.checking) {
                this.checking = true
                this.checkPercentageDirection()
                this.checkCountOrPercents()
                this.checkSlicesOrGroups()
                this.checkDecimalPlaces()
                this.checkPivot()
                this.checkTestable()
                exposeSettingsChanges('settings.changed')
                this.emit('settings.changed')
                this.checking = false
            }
        }

        , states : {
            uninitialized : {
                initialize : function(analysis) {
                    this.transition('initialized')
                }
            }

            , initialized : {
                load : function(analysis, savedSettings) {
                    assert(analysis, 'Pass a valid analysis object')
                    this.currentAnalysis = analysis

                    if(savedSettings){
                        if(savedSettings.decimalPlaces) this.decimalPlaces.value = savedSettings.decimalPlaces.value
                        if(savedSettings.tableOrGraph) this.tableOrGraph.value = savedSettings.tableOrGraph.value
                        if(savedSettings.slicesOrGroups) this.slicesOrGroups.value = savedSettings.slicesOrGroups.value
                        if(savedSettings.countsOrPercents) this.countsOrPercents.value = savedSettings.countsOrPercents.value
                        if(savedSettings.percentageDirection) { //set both userValue and value
                            this.percentageDirection.value = savedSettings.percentageDirection.value
                            this.percentageDirection.userValue = savedSettings.percentageDirection.value
                        }
                        if(savedSettings.showEmpty) this.showEmpty.value = savedSettings.showEmpty.value
                        if(savedSettings.alpha) {
                            this.alpha = savedSettings.alpha
                            this.showSignif.value = true
                        }
                    }

                    this.checkSettingsConsistency()
                }
            }
        }
    })

    AnalyzeSettingsMediator.create = function(cfg) {
        var settingsMediator = new AnalyzeSettingsMediator()
            ;

        settingsMediator.handle('initialize')

        return settingsMediator
    }

    return AnalyzeSettingsMediator
}

AnalyzeSettingsMediatorFactory.$inject = [
    'machina'
    , 'bus'
    , 'Setting'
    , 'ToggleableSetting'
    , 'userPreferences'
]
