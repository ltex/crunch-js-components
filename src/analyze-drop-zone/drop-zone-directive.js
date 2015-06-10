'use strict'

module.exports = DropZoneDirective

DropZoneDirective.$inject = [
]

function DropZoneDirective() {
    return {
        restrict: 'E'
        , templateUrl : '/analyze-drop-zone/drop-zone.html'
        , scope : {
            analysis : '='
            , settings : '='
            , dropZone : '=dropZoneCfg'
        }
        ,link: function(scope) {
            var settings = scope.settings
                , tableOrGraph = settings.tableOrGraph
                ;

            scope.tableOrGraph = tableOrGraph

            function show(e,args){
                scope.visible = true
            }

            function hide(e, args){
                scope.visible = false
            }

            scope.$on('link:started',show)
            scope.$on('link:cancelled',hide)
            scope.$on('column:link',hide)
            scope.$on('row:link',hide)
            scope.$on('table:link',hide)
            scope.$on('row:link',hide)
            scope.$on('slice:link',hide)
            scope.$on('group:link',hide)
            scope.$on('tabs:link', hide)
            scope.$on('mean:link', hide)
            scope.$on('over:link', hide)
            scope.$on('variable.clicked',function(e, args) {
               var varb = args.variable
                   , currentAnalysis = scope.analysis
                   ;
               if(varb.categoricalArray || currentAnalysis.hasArrayVariables() || currentAnalysis.isEmpty()) {
                   currentAnalysis.handle('clean')
                   currentAnalysis.handle('add-variable', varb.self)
               } else {
                   currentAnalysis.handle('replace-variable', 0, varb.self)
               }
           })
        }
    }
}
