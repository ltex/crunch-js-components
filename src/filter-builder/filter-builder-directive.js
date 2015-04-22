'use strict'

module.exports = FilterBuilderDirective

FilterBuilderDirective.$inject = [
    '$state'
    , '$compile'
    , '$templateCache'
    , 'FilterBuilder'
    , 'currentDataset'
    , 'ShareFilter'
]

function FilterBuilderDirective($state, $compile, $templateCache, FilterBuilder, currentDataset, ShareFilter) {
    return {
        restrict : 'EA'
        , replace : true
        , scope : {builder : '=',
                   share: '='
        }
        , link : function(scope, el, attrs) {

            scope.$watch('builder', function() {
                if (scope.builder) {
                    scope.filterBuilder = scope.builder
                    scope.shareFilter = scope.share
                    scope.filterName = scope.builder.filter.name
                    scope.filterBuilder.thisScope = scope
                }
            })

            scope.junctionOptions = [ {item: 'AND'}, {item: 'OR'}]

            scope.$watch('filterName', function(name) {
                if(scope.filterBuilder) {
                    scope.filterBuilder.setFilterName(name)
                }
            })

            scope.$watch('filterBuilder.filterName()', function(filterName) {
                scope.filterName = filterName
            })

            attrs.$observe('filterBuilder', function(filterBuilder) {
                var tpl = '/filter-builder/filter-builder'
                    ;

                tpl += filterBuilder.indexOf('readonly') >= 0 ? '-readonly.html' : '.html'
                el.append($compile($templateCache.get(tpl))(scope))
            })
        }
    }
}
