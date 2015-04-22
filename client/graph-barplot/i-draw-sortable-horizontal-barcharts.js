'use strict'

module.exports = {
    $get : getIDrawSortableGroupedBarcharts
}

function getIDrawSortableGroupedBarcharts($delegate, $document, _, $compile) {
    var sortDirectionClasses = {
            '-1' : 'up'
            , '1' : 'down'
        }
        ;

    function createSorter(scope, column, width) {
        var sorter = $compile('<span class="sort-table"></span>')(scope)[0]
            , settings = scope.analyzeContextManager.viewSettings
            ;

        sorter.style.width = width
        sorter.innerHTML = '&nbsp;'

        if(typeof column === 'string') {
            sorter.dataset.sortKey = column
        }

        if(column === settings.sortVariable) {
            sorter.classList.add(sortDirectionClasses[settings.sortDirection.value])
        }

        return sorter
    }

    return function chart(config) {
        var chartInfo = $delegate(config)
            , sortControls = document.querySelector('div.sort-chart-controls')
            , chartScope = $document.find('div.chart').scope()
            , margin = chartInfo.margin.left + 40
            , totalWidth = margin
            , domain = chartInfo.xScale.domain()
            , width = (chartInfo.xScale(domain[1]) - chartInfo.xScale(domain[0])) || chartInfo.chartWidth
            ;

        sortControls.innerHTML = ''

        sortControls.appendChild(createSorter(chartScope, undefined ,margin))

        chartInfo.xScale.domain().forEach(function(column) {
            sortControls.appendChild(createSorter(chartScope, column,  width))
            totalWidth += width
        })

        sortControls.style.width = totalWidth + 'px'

        return chartInfo
    }
}

getIDrawSortableGroupedBarcharts.$inject = [
    '$delegate'
    , '$document'
    , 'lodash'
    , '$compile'
]
