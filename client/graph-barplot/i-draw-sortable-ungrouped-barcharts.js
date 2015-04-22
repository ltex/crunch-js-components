'use strict'

module.exports = {
    $get : getIDrawSortableUngroupedBarcharts
}

function getIDrawSortableUngroupedBarcharts($delegate, _, $document, $compile) {
    var sortDirectionClasses = {
            '-1' : 'up'
            , '1' : 'down'
        }
        ;

    function createSorter(scope, column, width) {
        var sorter = $compile('<span class="sort-table" data-sort-key="' + column + '"></span>')(scope)[0]
            , settings = scope.analyzeContextManager.viewSettings
            ;

        sorter.style.width = width
        sorter.innerHTML = '&nbsp;'

        if(column === settings.sortVariable) {
            sorter.classList.add(sortDirectionClasses[settings.sortDirection.value])
        }

        return sorter
    }

    return function chart(config) {
        var chartInfo = $delegate(config)
            , sortControls = document.querySelector('div.sort-chart-controls')
            , chartScope = $document.find('div.chart').scope()
            ;


        sortControls.innerHTML = ''
        sortControls.appendChild(createSorter(chartScope, "", chartInfo.margin.left))
        sortControls.appendChild(createSorter(chartScope, "''", chartInfo.chartWidth))

        return chartInfo
    }
}

getIDrawSortableUngroupedBarcharts.$inject = [
    '$delegate'
    , 'lodash'
    , '$document'
    , '$compile'
]
