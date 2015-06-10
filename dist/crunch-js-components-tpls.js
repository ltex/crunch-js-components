(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

function buildModule() {
    var templateModules = {}
        , angular = require("angular")
        , mod = angular.module("crunch-js-components-tpls", [])
        ;

    mod.run(["$templateCache", function($templateCache) {
    
        $templateCache.put("/analyses-tray/analyses-tray-toggle-button.html", require("../src/analyses-tray/analyses-tray-toggle-button.html"));
        $templateCache.put("/analyses-tray/analyses-tray.html", require("../src/analyses-tray/analyses-tray.html"));
        $templateCache.put("/analyses-tray/open-save-buttons.html", require("../src/analyses-tray/open-save-buttons.html"));
        $templateCache.put("/analyze-chart/chart.html", require("../src/analyze-chart/chart.html"));
        $templateCache.put("/analyze-drop-zone/cat-array-graph-univariate.html", require("../src/analyze-drop-zone/cat-array-graph-univariate.html"));
        $templateCache.put("/analyze-drop-zone/cat-array-table-univariate.html", require("../src/analyze-drop-zone/cat-array-table-univariate.html"));
        $templateCache.put("/analyze-drop-zone/cat-graph-binned.html", require("../src/analyze-drop-zone/cat-graph-binned.html"));
        $templateCache.put("/analyze-drop-zone/cat-graph-bivariate.html", require("../src/analyze-drop-zone/cat-graph-bivariate.html"));
        $templateCache.put("/analyze-drop-zone/cat-graph-measure.html", require("../src/analyze-drop-zone/cat-graph-measure.html"));
        $templateCache.put("/analyze-drop-zone/cat-graph-new.html", require("../src/analyze-drop-zone/cat-graph-new.html"));
        $templateCache.put("/analyze-drop-zone/cat-graph-univariate.html", require("../src/analyze-drop-zone/cat-graph-univariate.html"));
        $templateCache.put("/analyze-drop-zone/cat-table-binned.html", require("../src/analyze-drop-zone/cat-table-binned.html"));
        $templateCache.put("/analyze-drop-zone/cat-table-bivariate.html", require("../src/analyze-drop-zone/cat-table-bivariate.html"));
        $templateCache.put("/analyze-drop-zone/cat-table-measure.html", require("../src/analyze-drop-zone/cat-table-measure.html"));
        $templateCache.put("/analyze-drop-zone/cat-table-new.html", require("../src/analyze-drop-zone/cat-table-new.html"));
        $templateCache.put("/analyze-drop-zone/cat-table-tabs.html", require("../src/analyze-drop-zone/cat-table-tabs.html"));
        $templateCache.put("/analyze-drop-zone/cat-table-univariate.html", require("../src/analyze-drop-zone/cat-table-univariate.html"));
        $templateCache.put("/analyze-drop-zone/datetime-graph-bivariate.html", require("../src/analyze-drop-zone/datetime-graph-bivariate.html"));
        $templateCache.put("/analyze-drop-zone/datetime-graph-univariate.html", require("../src/analyze-drop-zone/datetime-graph-univariate.html"));
        $templateCache.put("/analyze-drop-zone/drop-zone-content.html", require("../src/analyze-drop-zone/drop-zone-content.html"));
        $templateCache.put("/analyze-drop-zone/drop-zone.html", require("../src/analyze-drop-zone/drop-zone.html"));
        $templateCache.put("/analyze-drop-zone/empty.html", require("../src/analyze-drop-zone/empty.html"));
        $templateCache.put("/analyze-drop-zone/numeric-graph-count.html", require("../src/analyze-drop-zone/numeric-graph-count.html"));
        $templateCache.put("/analyze-drop-zone/numeric-graph-group-only.html", require("../src/analyze-drop-zone/numeric-graph-group-only.html"));
        $templateCache.put("/analyze-drop-zone/numeric-graph-measure-only.html", require("../src/analyze-drop-zone/numeric-graph-measure-only.html"));
        $templateCache.put("/analyze-drop-zone/numeric-table-count.html", require("../src/analyze-drop-zone/numeric-table-count.html"));
        $templateCache.put("/analyze-drop-zone/numeric-table-group-only.html", require("../src/analyze-drop-zone/numeric-table-group-only.html"));
        $templateCache.put("/analyze-drop-zone/numeric-table-measure-only.html", require("../src/analyze-drop-zone/numeric-table-measure-only.html"));
        $templateCache.put("/analyze-table/analyze-table.html", require("../src/analyze-table/analyze-table.html"));
        $templateCache.put("/analyze-table/bivariate.html", require("../src/analyze-table/bivariate.html"));
        $templateCache.put("/analyze-table/crosstab.html", require("../src/analyze-table/crosstab.html"));
        $templateCache.put("/analyze-table/measures.html", require("../src/analyze-table/measures.html"));
        $templateCache.put("/analyze-table/no-valid-data-table.html", require("../src/analyze-table/no-valid-data-table.html"));
        $templateCache.put("/analyze-table/table.html", require("../src/analyze-table/table.html"));
        $templateCache.put("/analyze-table/title-variable.html", require("../src/analyze-table/title-variable.html"));
        $templateCache.put("/analyze-tabs/analyze-tabs.html", require("../src/analyze-tabs/analyze-tabs.html"));
        $templateCache.put("/analyze/analyze-title.html", require("../src/analyze/analyze-title.html"));
        $templateCache.put("/analyze/empty-analysis.html", require("../src/analyze/empty-analysis.html"));
        $templateCache.put("/cr-select/cr-select.html", require("../src/cr-select/cr-select.html"));
        $templateCache.put("/filter-builder/card-base-expression-readonly.html", require("../src/filter-builder/card-base-expression-readonly.html"));
        $templateCache.put("/filter-builder/card-base-expression.html", require("../src/filter-builder/card-base-expression.html"));
        $templateCache.put("/filter-builder/card-categorical-readonly.html", require("../src/filter-builder/card-categorical-readonly.html"));
        $templateCache.put("/filter-builder/card-categorical.html", require("../src/filter-builder/card-categorical.html"));
        $templateCache.put("/filter-builder/card-datetime-readonly.html", require("../src/filter-builder/card-datetime-readonly.html"));
        $templateCache.put("/filter-builder/card-datetime.html", require("../src/filter-builder/card-datetime.html"));
        $templateCache.put("/filter-builder/card-multiple_response-readonly.html", require("../src/filter-builder/card-multiple_response-readonly.html"));
        $templateCache.put("/filter-builder/card-multiple_response.html", require("../src/filter-builder/card-multiple_response.html"));
        $templateCache.put("/filter-builder/card-numeric-readonly.html", require("../src/filter-builder/card-numeric-readonly.html"));
        $templateCache.put("/filter-builder/card-numeric.html", require("../src/filter-builder/card-numeric.html"));
        $templateCache.put("/filter-builder/card-text-readonly.html", require("../src/filter-builder/card-text-readonly.html"));
        $templateCache.put("/filter-builder/card-text.html", require("../src/filter-builder/card-text.html"));
        $templateCache.put("/filter-builder/cardblank-readonly.html", require("../src/filter-builder/cardblank-readonly.html"));
        $templateCache.put("/filter-builder/cardblank.html", require("../src/filter-builder/cardblank.html"));
        $templateCache.put("/filter-builder/eligible-variable.html", require("../src/filter-builder/eligible-variable.html"));
        $templateCache.put("/filter-builder/filter-builder-readonly.html", require("../src/filter-builder/filter-builder-readonly.html"));
        $templateCache.put("/filter-builder/filter-builder.html", require("../src/filter-builder/filter-builder.html"));
        $templateCache.put("/filter-builder/share-filter.html", require("../src/filter-builder/share-filter.html"));
        $templateCache.put("/graph-colors/cell-color-key.html", require("../src/graph-colors/cell-color-key.html"));
        $templateCache.put("/play-controls/multistate-button.html", require("../src/play-controls/multistate-button.html"));
        $templateCache.put("/play-controls/play-controls.html", require("../src/play-controls/play-controls.html"));
        $templateCache.put("/variables-accordion/behavioral-variable.html", require("../src/variables-accordion/behavioral-variable.html"));
        $templateCache.put("/variables-accordion/composite-variable.html", require("../src/variables-accordion/composite-variable.html"));
        $templateCache.put("/variables-accordion/hierarchical-group.html", require("../src/variables-accordion/hierarchical-group.html"));
        $templateCache.put("/variables-accordion/hierarchical-nested-group.html", require("../src/variables-accordion/hierarchical-nested-group.html"));
        $templateCache.put("/variables-accordion/scalar-variable.html", require("../src/variables-accordion/scalar-variable.html"));
        $templateCache.put("/variables-accordion/variables-accordion.html", require("../src/variables-accordion/variables-accordion.html"));
    }])

    return mod
}

module.exports = buildModule()
},{"../src/analyses-tray/analyses-tray-toggle-button.html":2,"../src/analyses-tray/analyses-tray.html":3,"../src/analyses-tray/open-save-buttons.html":4,"../src/analyze-chart/chart.html":5,"../src/analyze-drop-zone/cat-array-graph-univariate.html":6,"../src/analyze-drop-zone/cat-array-table-univariate.html":7,"../src/analyze-drop-zone/cat-graph-binned.html":8,"../src/analyze-drop-zone/cat-graph-bivariate.html":9,"../src/analyze-drop-zone/cat-graph-measure.html":10,"../src/analyze-drop-zone/cat-graph-new.html":11,"../src/analyze-drop-zone/cat-graph-univariate.html":12,"../src/analyze-drop-zone/cat-table-binned.html":13,"../src/analyze-drop-zone/cat-table-bivariate.html":14,"../src/analyze-drop-zone/cat-table-measure.html":15,"../src/analyze-drop-zone/cat-table-new.html":16,"../src/analyze-drop-zone/cat-table-tabs.html":17,"../src/analyze-drop-zone/cat-table-univariate.html":18,"../src/analyze-drop-zone/datetime-graph-bivariate.html":19,"../src/analyze-drop-zone/datetime-graph-univariate.html":20,"../src/analyze-drop-zone/drop-zone-content.html":21,"../src/analyze-drop-zone/drop-zone.html":22,"../src/analyze-drop-zone/empty.html":23,"../src/analyze-drop-zone/numeric-graph-count.html":24,"../src/analyze-drop-zone/numeric-graph-group-only.html":25,"../src/analyze-drop-zone/numeric-graph-measure-only.html":26,"../src/analyze-drop-zone/numeric-table-count.html":27,"../src/analyze-drop-zone/numeric-table-group-only.html":28,"../src/analyze-drop-zone/numeric-table-measure-only.html":29,"../src/analyze-table/analyze-table.html":30,"../src/analyze-table/bivariate.html":31,"../src/analyze-table/crosstab.html":32,"../src/analyze-table/measures.html":33,"../src/analyze-table/no-valid-data-table.html":34,"../src/analyze-table/table.html":35,"../src/analyze-table/title-variable.html":36,"../src/analyze-tabs/analyze-tabs.html":37,"../src/analyze/analyze-title.html":38,"../src/analyze/empty-analysis.html":39,"../src/cr-select/cr-select.html":40,"../src/filter-builder/card-base-expression-readonly.html":41,"../src/filter-builder/card-base-expression.html":42,"../src/filter-builder/card-categorical-readonly.html":43,"../src/filter-builder/card-categorical.html":44,"../src/filter-builder/card-datetime-readonly.html":45,"../src/filter-builder/card-datetime.html":46,"../src/filter-builder/card-multiple_response-readonly.html":47,"../src/filter-builder/card-multiple_response.html":48,"../src/filter-builder/card-numeric-readonly.html":49,"../src/filter-builder/card-numeric.html":50,"../src/filter-builder/card-text-readonly.html":51,"../src/filter-builder/card-text.html":52,"../src/filter-builder/cardblank-readonly.html":53,"../src/filter-builder/cardblank.html":54,"../src/filter-builder/eligible-variable.html":55,"../src/filter-builder/filter-builder-readonly.html":56,"../src/filter-builder/filter-builder.html":57,"../src/filter-builder/share-filter.html":58,"../src/graph-colors/cell-color-key.html":59,"../src/play-controls/multistate-button.html":60,"../src/play-controls/play-controls.html":61,"../src/variables-accordion/behavioral-variable.html":62,"../src/variables-accordion/composite-variable.html":63,"../src/variables-accordion/hierarchical-group.html":64,"../src/variables-accordion/hierarchical-nested-group.html":65,"../src/variables-accordion/scalar-variable.html":66,"../src/variables-accordion/variables-accordion.html":67,"angular":"angular"}],2:[function(require,module,exports){
module.exports = '<button\n' +
    '    type="button"\n' +
    '    class="analyses-tray-toggle-button"\n' +
    '    data-ng-click="analysesTray.handle(\'toggleVisibility\')"\n' +
    '    data-ng-class="{opened: analysesTray.is(\'opened\')}"\n' +
    '></button>\n' +
    '';
},{}],3:[function(require,module,exports){
module.exports = '<div class="wrapper">\n' +
    '    <a\n' +
    '        title="Export deck to Excel"\n' +
    '        data-ng-if="!!deck.slides.length"\n' +
    '        href="{{deck.xlsxExportUrl}}"\n' +
    '        data-ng-click="checkDownloadProgress()"\n' +
    '        class="download"\n' +
    '        download="export.xlsx"\n' +
    '        target="_self"\n' +
    '        >\n' +
    '        <span>Export to Excel</span>\n' +
    '        <span class="icon-download"></span>\n' +
    '    </a>\n' +
    '    <ul class="slides-list" ng-if="deck.slides.length">\n' +
    '        <li ng-repeat="slide in deck.slides"\n' +
    '            class="slide"\n' +
    '            ng-class="{ selected : slide.state===\'selected\' }"\n' +
    '            >\n' +
    '            <button\n' +
    '                class="slide-btn"\n' +
    '                type="button"\n' +
    '                data-title="{{slide.title}}"\n' +
    '                data-subtitle="{{slide.subtitle}}"\n' +
    '                data-ng-click="slide.handle(\'select\')"\n' +
    '                data-ng-disabled="slide.state===\'deleting\'"\n' +
    '                ng-class="{ deleting: slide.state===\'deleting\' }"\n' +
    '                >\n' +
    '                <span ng-class="{\'icon-graph\': slide.tableOrGraph === \'graph\', \'icon-table\': slide.tableOrGraph === \'table\'}"></span><br/>\n' +
    '                <h1>{{slide.title}}</h1>\n' +
    '                <h2>{{slide.subtitle}}</h2>\n' +
    '            </button>\n' +
    '            <button\n' +
    '                type="button"\n' +
    '                title="Delete"\n' +
    '                class="icon delete"\n' +
    '                data-ng-click="slide.handle(\'delete\')">\n' +
    '                <span class="icon-remove"></span>\n' +
    '            </button>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '    <p class="empty" data-ng-if="!deck.slides.length">No saved analyses</p>\n' +
    '</div>\n' +
    '';
},{}],4:[function(require,module,exports){
module.exports = '<div class="tray-open-save-buttons">\n' +
    '    <span class="action-container"\n' +
    '        ng-include="\'/save-analysis/save-analysis-button.html\'">\n' +
    '    </span>\n' +
    '    <span class="action-container"\n' +
    '        ng-include="\'/analyses-tray/analyses-tray-toggle-button.html\'">\n' +
    '    </span>\n' +
    '</div>\n' +
    '';
},{}],5:[function(require,module,exports){
module.exports = '<div class="bivariate-graph" id="{{data.id}}">\n' +
    '</div>';
},{}],6:[function(require,module,exports){
module.exports = '<div class="draggroup drop-target" dropit dropit-event="group">\n' +
    '    <drop-zone-content zone="group" zone-label="New Grouped Graph"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="dragrow drop-target" dropit dropit-event="slice">\n' +
    '    <drop-zone-content zone="slice" zone-label="New Sliced Graph"></drop-zone-content>\n' +
    '</div>\n' +
    '';
},{}],7:[function(require,module,exports){
module.exports = '<div class="dragtable drop-target" dropit dropit-event="table">\n' +
    '    <drop-zone-content zone-label="New Table"></drop-zone-content>\n' +
    '</div>\n' +
    '';
},{}],8:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '\n' +
    '<div class="graph-wrapper">\n' +
    '    <div class="drag-wrapper">\n' +
    '        <div class="dragslice drop-target" dropit dropit-event="slice">\n' +
    '            <drop-zone-content exclude="group" zone="slice" zone-label="Slice"></drop-zone-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="dragnewgraph drop-target" dropit dropit-event="table">\n' +
    '        <drop-zone-content exclude="row,slice,group" zone-label="New Graph"></drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],9:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '\n' +
    '<div class="graph-wrapper">\n' +
    '    <div class="drag-wrapper">\n' +
    '        <div class="dragslice drop-target" dropit dropit-event="slice">\n' +
    '            <drop-zone-content exclude="group" zone="slice" zone-label="Slice"></drop-zone-content>\n' +
    '        </div>\n' +
    '        <div class="draggroup drop-target" dropit dropit-event="group">\n' +
    '            <drop-zone-content exclude="slice" zone="group" zone-label="Group"></drop-zone-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="dragnewgraph drop-target" dropit dropit-event="table">\n' +
    '        <drop-zone-content exclude="row,slice,group" zone-label="New Graph"></drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],10:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '\n' +
    '<div class="graph-wrapper">\n' +
    '    <div class="drag-wrapper">\n' +
    '        <!-- uncomment when finish sliced dot plots -->\n' +
    '        <!-- <div class="dragslice drop-target" dropit dropit-event="slice">\n' +
    '            <drop-zone-content exclude="group" zone="slice" zone-label="Slice"></drop-zone-content>\n' +
    '        </div> -->\n' +
    '        <div class="draggroup drop-target" dropit dropit-event="group">\n' +
    '            <drop-zone-content exclude="slice" zone="group" zone-label="Group"></drop-zone-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="dragnewgraph drop-target" dropit dropit-event="table">\n' +
    '        <drop-zone-content exclude="row,slice,group" zone-label="New Graph"></drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],11:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="table">\n' +
    '    <drop-zone-content zone-label="New Graph"></drop-zone-content>\n' +
    '</div>\n' +
    '';
},{}],12:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="draggroup drop-target" dropit dropit-event="group">\n' +
    '    <drop-zone-content zone="group" zone-label="Groups"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="dragslice drop-target" dropit dropit-event="slice">\n' +
    '    <drop-zone-content zone="slice" zone-label="Slice"></drop-zone-content>\n' +
    '</div>\n' +
    '';
},{}],13:[function(require,module,exports){
module.exports = '<div class="dragcolumn drop-target" dropit dropit-event="column">\n' +
    '    <drop-zone-content zone="column" zone-label="Columns"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="drag-wrapper">\n' +
    '    <div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '        <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '    </div>\n' +
    '    <div class="dragtable drop-target" dropit dropit-event="table">\n' +
    '        <drop-zone-content exclude="row,column" zone-label="New Table"></drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],14:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],15:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],16:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],17:[function(require,module,exports){
module.exports = '<div class="dragcolumn drop-target" dropit dropit-event="tabs">\n' +
    '    <drop-zone-content zone="tabs" zone-label="Tabs"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="dragrow drop-target" dropit dropit-event="new">\n' +
    '    <drop-zone-content zone="table" zone-label="New Table"></drop-zone-content>\n' +
    '</div>\n' +
    '';
},{}],18:[function(require,module,exports){
module.exports = '<div class="dragcolumn drop-target" dropit dropit-event="column">\n' +
    '    <drop-zone-content zone="column" zone-label="Columns"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '';
},{}],19:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '\n' +
    '<div class="graph-wrapper">\n' +
    '    <div class="drag-wrapper">\n' +
    '        <div class="dragslice drop-target" dropit dropit-event="column">\n' +
    '            <drop-zone-content>\n' +
    '                <span class="current">\n' +
    '                    <span ng-show="dropZone.current.isDatetime(\'over\')">\n' +
    '                        <strong>{{dropZone.current.getVariableName("row")}}</strong> over\n' +
    '                        <span>\n' +
    '                            <strong>{{dropZone.current.getVariableName("over")}}</strong>\n' +
    '                            as\n' +
    '                        </span>\n' +
    '                        time\n' +
    '                    </span>\n' +
    '                    <span ng-hide="dropZone.current.isDatetime(\'over\')">\n' +
    '                        <strong>{{dropZone.current.getVariableName("over")}}</strong>\n' +
    '                    </span>\n' +
    '                </span>\n' +
    '\n' +
    '                <span class="dragged">\n' +
    '                    <strong>{{dropZone.current.getVariableName("row")}}</strong> over time\n' +
    '                    (<strong>{{dropZone.current.getVariableName("dragged")}}</strong>)\n' +
    '                </span>\n' +
    '            </drop-zone-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="dragnewgraph drop-target" dropit dropit-event="table">\n' +
    '        <drop-zone-content exclude="row,over" zone-label="New Graph"></drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],20:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="dragslice drop-target" dropit dropit-event="column">\n' +
    '    <drop-zone-content>\n' +
    '        <span class="current">\n' +
    '            <strong>{{dropZone.current.getVariableName("row")}}</strong> over\n' +
    '            <span ng-if="dropZone.current.getVariableName(\'over\')">\n' +
    '                <strong>{{dropZone.current.getVariableName("over")}}</strong>\n' +
    '                as\n' +
    '            </span>\n' +
    '            time\n' +
    '        </span>\n' +
    '        <span class="dragged">\n' +
    '            <strong>{{dropZone.current.getVariableName("row")}}</strong> over time\n' +
    '            (<strong>{{dropZone.current.getVariableName("dragged")}}</strong>)\n' +
    '        </span>\n' +
    '    </drop-zone-content>\n' +
    '</div>\n' +
    '';
},{}],21:[function(require,module,exports){
module.exports = '<div class="zone-content" ng-hide="hidden">\n' +
    '    <span class="zone-variable current" ng-hide="draggedVisible">\n' +
    '        <strong>{{dropZone.current.getVariableName(zone)}}</strong>\n' +
    '        <span ng-hide="!dropZone.current.getVariableName(zone)">as</span>\n' +
    '        {{zoneLabel}}\n' +
    '    </span>\n' +
    '    <span class="zone-variable dragged" ng-show="draggedVisible">\n' +
    '        <strong>{{dropZone.current.getVariableName(\'dragged\')}}</strong>\n' +
    '        as {{zoneLabel}}\n' +
    '    </span>\n' +
    '</div>\n' +
    '';
},{}],22:[function(require,module,exports){
module.exports = '<div class="drop-zone2" ng-show="visible">\n' +
    '    <div class="container" ng-if="dropZone.current" ng-class="tableOrGraph.value"\n' +
    '         ng-include="\'/analyze-drop-zone/\' + dropZone.current + \'.html\'"></div>\n' +
    '</div>\n' +
    '\n' +
    '';
},{}],23:[function(require,module,exports){
module.exports = '<div></div>\n' +
    '';
},{}],24:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '\n' +
    '<div class="graph-wrapper">\n' +
    '    <div class="drag-wrapper drag-numeric">\n' +
    '        <div class="draggroup drop-target" dropit dropit-event="group">\n' +
    '            <drop-zone-content zone="group" exclude="slice" zone-label="Group"></drop-zone-content>\n' +
    '        </div>\n' +
    '        <div class="dragslice drop-target" dropit dropit-event="slice">\n' +
    '            <drop-zone-content zone="slice" exclude="group" zone-label="Slice"></drop-zone-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="drag-wrapper drag-numeric">\n' +
    '        <div class="dragmean drop-target" dropit dropit-event="mean">\n' +
    '            <drop-zone-content>\n' +
    '                <span class="current">\n' +
    '                    Mean\n' +
    '                    <span ng-if="dropZone.current.getVariableName(\'mean\')">\n' +
    '                        of\n' +
    '                    </span>\n' +
    '                    <strong>{{dropZone.current.getVariableName(\'mean\')}}</strong>\n' +
    '                        as Value\n' +
    '                </span>\n' +
    '                <span class="dragged">\n' +
    '                    Mean of\n' +
    '                    <strong>{{dropZone.current.getVariableName("dragged")}}</strong> as Value\n' +
    '                </span>\n' +
    '            </drop-zone-content>\n' +
    '        </div>\n' +
    '        <div class="dragnewgraph drop-target" dropit dropit-event="table">\n' +
    '            <drop-zone-content>\n' +
    '                <span class="current">\n' +
    '                    Mean as New Graph\n' +
    '                </span>\n' +
    '                <span class="dragged">\n' +
    '                    Mean of\n' +
    '                    <strong>{{dropZone.current.getVariableName("dragged")}}</strong>\n' +
    '                    as New Graph\n' +
    '                </span>\n' +
    '            </drop-zone-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],25:[function(require,module,exports){
module.exports = '<div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '    <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '</div>\n' +
    '\n' +
    '<div class="graph-wrapper">\n' +
    '    <div class="drag-wrapper drag-numeric">\n' +
    '        <div class="draggroup drop-target" dropit dropit-event="group">\n' +
    '            <drop-zone-content zone="group" exclude="slice" zone-label="Group"></drop-zone-content>\n' +
    '        </div>\n' +
    '        <!-- bring back when sliced dot plots -->\n' +
    '        <!-- <div class="dragslice drop-target" dropit dropit-event="slice">\n' +
    '            <drop-zone-content zone="slice" exclude="group" zone-label="Slice"></drop-zone-content>\n' +
    '        </div> -->\n' +
    '    </div>\n' +
    '    <div class="drag-wrapper drag-numeric">\n' +
    '        <div class="dragmean drop-target" dropit dropit-event="mean">\n' +
    '            <drop-zone-content>\n' +
    '                <span class="current">\n' +
    '                    Mean\n' +
    '                    <span ng-if="dropZone.current.getVariableName(\'mean\')">\n' +
    '                        of\n' +
    '                    </span>\n' +
    '                    <strong>{{dropZone.current.getVariableName(\'mean\')}}</strong>\n' +
    '                        as Value\n' +
    '                </span>\n' +
    '                <span class="dragged">\n' +
    '                    Mean of\n' +
    '                    <strong>{{dropZone.current.getVariableName("dragged")}}</strong> as Value\n' +
    '                </span>\n' +
    '            </drop-zone-content>\n' +
    '        </div>\n' +
    '        <div class="dragnewgraph drop-target" dropit dropit-event="table">\n' +
    '            <drop-zone-content>\n' +
    '                <span class="current">\n' +
    '                    Mean as New Graph\n' +
    '                </span>\n' +
    '                <span class="dragged">\n' +
    '                    Mean of\n' +
    '                    <strong>{{dropZone.current.getVariableName("dragged")}}</strong>\n' +
    '                    as New Graph\n' +
    '                </span>\n' +
    '            </drop-zone-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],26:[function(require,module,exports){
module.exports = '<div class="drag-wrapper drag-measure">\n' +
    '    <div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '        <drop-zone-content zone="row" exclude="mean" zone-label="New Graph"></drop-zone-content>\n' +
    '    </div>\n' +
    '    <div class="dragmean drop-target" dropit dropit-event="mean">\n' +
    '        <drop-zone-content>\n' +
    '            <span class="current">\n' +
    '                Mean\n' +
    '                <span ng-if="dropZone.current.getVariableName(\'mean\')">\n' +
    '                    of\n' +
    '                </span>\n' +
    '                <strong>{{dropZone.current.getVariableName(\'mean\')}}</strong>\n' +
    '            </span>\n' +
    '            <span class="dragged">\n' +
    '                Mean of\n' +
    '                <strong>{{dropZone.current.getVariableName("dragged")}}</strong>\n' +
    '            </span>\n' +
    '        </drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],27:[function(require,module,exports){
module.exports = '<div class="dragcolumn drop-target" dropit dropit-event="column">\n' +
    '    <drop-zone-content zone="column" zone-label="Columns"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="drag-wrapper drag-numeric">\n' +
    '    <div class="dragrow drop-target" dropit dropit-event="row">\n' +
    '        <drop-zone-content zone="row" zone-label="Rows"></drop-zone-content>\n' +
    '    </div>\n' +
    '    <div class="dragtable drop-target" dropit dropit-event="mean">\n' +
    '        <drop-zone-content>\n' +
    '            <span class="current">\n' +
    '                Mean\n' +
    '                <span ng-if="dropZone.current.getVariableName(\'mean\')">\n' +
    '                    of\n' +
    '                </span>\n' +
    '                <strong>{{dropZone.current.getVariableName(\'mean\')}}</strong>\n' +
    '                    as Cell value\n' +
    '            </span>\n' +
    '            <span class="dragged">\n' +
    '                Mean of\n' +
    '                <strong>{{dropZone.current.getVariableName("dragged")}}</strong> as Cell value\n' +
    '            </span>\n' +
    '        </drop-zone-content>\n' +
    '    </div>\n' +
    '    <div class="dragcell drop-target" dropit dropit-event="table">\n' +
    '        <drop-zone-content>\n' +
    '            <span class="current">\n' +
    '                Mean as New Table\n' +
    '            </span>\n' +
    '            <span class="dragged">\n' +
    '                Mean of\n' +
    '                <strong>{{dropZone.current.getVariableName("dragged")}}</strong>\n' +
    '                as New Table\n' +
    '            </span>\n' +
    '        </drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],28:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],29:[function(require,module,exports){
module.exports = '<div class="dragcolumn drop-target" dropit dropit-event="tabs">\n' +
    '    <drop-zone-content zone="tabs" zone-label="Tabs"></drop-zone-content>\n' +
    '</div>\n' +
    '<div class="drag-wrapper">\n' +
    '\n' +
    '    <div class="dragrow drop-target" dropit dropit-event="mean">\n' +
    '        <drop-zone-content>\n' +
    '            <span class="current">\n' +
    '                Mean\n' +
    '                <span ng-if="dropZone.current.getVariableName(\'mean\')">\n' +
    '                    of\n' +
    '                </span>\n' +
    '                <strong>{{dropZone.current.getVariableName(\'mean\')}}</strong>\n' +
    '            </span>\n' +
    '            <span class="dragged">\n' +
    '                Mean of\n' +
    '                <strong>{{dropZone.current.getVariableName("dragged")}}</strong>\n' +
    '            </span>\n' +
    '        </drop-zone-content>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="dragtable drop-target" dropit dropit-event="row">\n' +
    '        <drop-zone-content zone="row" exclude="mean" zone-label="New Table"></drop-zone-content>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],30:[function(require,module,exports){
module.exports = '<div class="xtabs-table" ng-if="!xtab.rows.length" ng-include="\'/analyze-table/no-valid-data-table.html\'"></div>\n' +
    '<div class="xtabs-table" sticky-headers ng-if="xtab.rows.length" ng-include="\'/analyze-table/table.html\'"></div>';
},{}],31:[function(require,module,exports){
module.exports = '<!-- bivariate template -->\n' +
    '<table>\n' +
    '    <thead>\n' +
    '        <!-- Account for column title -->\n' +
    '        <tr>\n' +
    '            <th colspan="{{xtab.numberOfColumns + 1}}">\n' +
    '                <h3 class="column-title">\n' +
    '                    {{xtab.columnTitle}}\n' +
    '                     <button type="button"\n' +
    '                        title="Remove column variable"\n' +
    '                        ng-click="xtabCtrl.removeColumn()">\n' +
    '                        <span class="icon-remove"></span>\n' +
    '                    </button>\n' +
    '                </h3>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '\n' +
    '        <tr class="column-label-row">\n' +
    '            <th class="empty-table-corner row-title column-title">\n' +
    '                <span>{{xtab.rowTitle}}&nbsp;</span>\n' +
    '                <button type="button"\n' +
    '                    title="Remove"\n' +
    '                    ng-click="xtabCtrl.removeRow()">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </button>\n' +
    '            </th>\n' +
    '\n' +
    '            <th ng-repeat="label in xtab.columnLabels track by $index">\n' +
    '                <span>\n' +
    '                    {{label}}\n' +
    '                </span>\n' +
    '            </th>\n' +
    '\n' +
    '            <th ng-show="settings.showMargins"\n' +
    '                class="column-margin-label column-margin-{{$index}}"\n' +
    '                ng-repeat="label in xtab.columnMarginLabels track by $index">{{label}}\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '\n' +
    '    <tbody ng-include="/xtabs2/xtab-body.html">\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '';
},{}],32:[function(require,module,exports){
module.exports = '<tr ng-repeat="preRow in xtab.preRows track by $index"\n' +
    '    ng-class="{ \'no-zebra\' : xtab.showSignif }"\n' +
    '    class="row-margin">\n' +
    '    <th class="row-margin-label">\n' +
    '        {{ preRow.label }}\n' +
    '    </th>\n' +
    '    <td ng-repeat="cell in preRow.cells track by $index"\n' +
    '        ng-class="{ signif05 : cell.pValueWithin5PercentRange,\n' +
    '        \'show-signif\' : cell.showSignif }"\n' +
    '        class="margin-cell">\n' +
    '        {{cell.value}}\n' +
    '    </td>\n' +
    '    <td colspan="xtab.preColsCount" class="empty-table-corner">&nbsp;</td>\n' +
    '</tr>\n' +
    '\n' +
    '<tr ng-repeat="row in xtab.rows track by $index"\n' +
    '    ng-class="{ \'no-zebra\' : xtab.showSignif }">\n' +
    '    <th>{{ row.label }}</th>\n' +
    '\n' +
    '    <td ng-repeat="preCols in xtab.preCols track by $index"\n' +
    '        class="margin-cell column-margin-value">\n' +
    '        {{ preCol.cells[$parent.$index].value }}\n' +
    '    </td>\n' +
    '\n' +
    '    <td cell="cell" ng-repeat="cell in row.cells track by $index"\n' +
    '        class="table-value"\n' +
    '        ng-class="{ signif05 : cell.pValueWithin5PercentRange,\n' +
    '        \'show-signif\' : cell.showSignif }"\n' +
    '        data-pvalue="{{ cell.pValue }}">\n' +
    '        {{ cell.value | alwaysRoundCounts : settings.decimalPlaces.value : settings.countsOrPercents.value }}\n' +
    '    </td>\n' +
    '\n' +
    '    <td ng-repeat="postCol in xtab.postCols track by $index"\n' +
    '        class="margin-cell column-margin-value column-margin-{{$index}}">\n' +
    '        <!-- use the row index -->\n' +
    '        {{ postCol.cells[$parent.$index].value | alwaysRoundCounts : settings.decimalPlaces.value : postCol.type }}\n' +
    '    </td>\n' +
    '</tr>\n' +
    '\n' +
    '<tr ng-repeat="postRow in xtab.postRows track by $index"\n' +
    '    ng-class="{ \'no-zebra\' : xtab.showSignif }"\n' +
    '    class="row-margin-{{$index}}">\n' +
    '    <th class="row-margin-label">\n' +
    '        {{postRow.label | displayLabel}}\n' +
    '    </th>\n' +
    '    <td ng-repeat="pre in xtab.preCols track by $index" class="empty-table-corner">&nbsp;</td>\n' +
    '    <td ng-repeat="cell in postRow.cells track by $index"\n' +
    '        ng-class="{ signif05 : cell.pValueWithin5PercentRange,\n' +
    '        \'show-signif\' : cell.showSignif }"\n' +
    '        class="margin-cell">\n' +
    '        {{cell.value | alwaysRoundCounts: settings.decimalPlaces.value : postRow.type }}\n' +
    '    </td>\n' +
    '    <td ng-repeat="post in xtab.postCols track by $index" class="empty-table-corner">&nbsp;</td>\n' +
    '</tr>\n' +
    '';
},{}],33:[function(require,module,exports){
module.exports = '<tr ng-repeat="row in xtab.rows track by $index">\n' +
    '    <th class="row-label">\n' +
    '        {{ xtab.rowLabels[$index] }}\n' +
    '    </th>\n' +
    '    <td ng-repeat="cell in row track by $index">\n' +
    '        {{ cell | displayNumber : settings.decimalPlaces.value }}\n' +
    '    </td>\n' +
    '</tr>\n' +
    '';
},{}],34:[function(require,module,exports){
module.exports = '<table>\n' +
    '    <thead ng-if="!xtab.withMeans">\n' +
    '        <tr ng-if="xtab.showColumnTitle">\n' +
    '            <th class="empty-table-corner column-title" colspan="{{xtab.preCols.length}}">\n' +
    '                &nbsp;\n' +
    '            </th>\n' +
    '            <th class="column-title" colspan={{xtab.colLabels.length}}>\n' +
    '                <title-variable\n' +
    '                    variable="xtab.variables.at(1)"\n' +
    '                    type="column">\n' +
    '                </title-variable>\n' +
    '                <a ng-click="ctrl.removeColumn()" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '        <tr sort class="column-label-row">\n' +
    '            <th>\n' +
    '                <title-variable\n' +
    '                    variable="xtab.variables.at(0)"\n' +
    '                    type="row">\n' +
    '                </title-variable>\n' +
    '                <a ng-click="ctrl.removeRow()" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '            <th>&nbsp;\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <thead ng-if="xtab.withMeans">\n' +
    '        <tr>\n' +
    '            <th class="column-title">\n' +
    '                <span>&nbsp;</span>\n' +
    '            </th>\n' +
    '            <th class="column-title mean" colspan={{xtab.colLabels.length}}>\n' +
    '                <title-variable\n' +
    '                    variable="xtab.measureVariable"\n' +
    '                    type="mean">\n' +
    '                </title-variable>\n' +
    '                <a title="Remove mean variable"\n' +
    '                    class="remove-mean-measure"\n' +
    '                    ng-click="ctrl.removeMeanMeasure()">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '        <tr ng-if="xtab.variables.count() == 2">\n' +
    '            <th class="empty-table-corner column-title">\n' +
    '                <span>&nbsp;</span>\n' +
    '            </th>\n' +
    '            <th class="column-title" colspan={{xtab.colLabels.length}}>\n' +
    '                <title-variable\n' +
    '                    variable="xtab.variables.at(1)"\n' +
    '                    type="column">\n' +
    '                </title-variable>\n' +
    '                <a ng-click="ctrl.removeColumn()" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '        <tr class="column-label-row">\n' +
    '            <th class="empty-table-corner row-title column-title">\n' +
    '                <title-variable\n' +
    '                    variable="xtab.variables.at(0)"\n' +
    '                    type="row">\n' +
    '                </title-variable>\n' +
    '                <a ng-click="ctrl.removeRow()" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '            <th>\n' +
    '                &nbsp;\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <tr>\n' +
    '        <th>&mdash;</th>\n' +
    '        <td>No valid data</td>\n' +
    '    </tr>\n' +
    '</table>';
},{}],35:[function(require,module,exports){
module.exports = '<table>\n' +
    '    <thead ng-if="!xtab.withMeans">\n' +
    '        <tr ng-if="xtab.showColumnTitle">\n' +
    '            <th class="empty-table-corner column-title" colspan="{{xtab.preCols.length}}">\n' +
    '                &nbsp;\n' +
    '            </th>\n' +
    '            <th class="column-title" colspan={{xtab.colLabels.length}}>\n' +
    '                <title-variable\n' +
    '                    variable="xtab.variables.at(1)"\n' +
    '                    type="column">\n' +
    '                </title-variable>\n' +
    '                <a ng-click="ctrl.removeColumn()" class="remove-column" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '            <th class="empty-table-corner column-title" colspan ={{xtab.postCols.length}}>\n' +
    '                &nbsp;\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '        <tr sort class="column-label-row">\n' +
    '            <th class="row-title column-title">\n' +
    '                <a href\n' +
    '                   class="sort-table"\n' +
    '                   data-sort-key=""\n' +
    '                   data-sort-source="labels">\n' +
    '                    <title-variable\n' +
    '                        variable="(analysis.dimension <= 2 ? xtab.variables.at(0) : xtab.variables.at(1))"\n' +
    '                        type="row">\n' +
    '                    </title-variable>\n' +
    '                </a>\n' +
    '                <a ng-click="ctrl.removeRow()" class="remove-row" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '            <th data-sort-source="preCols" data-sort-key="{{pre.label}}" ng-repeat="pre in xtab.preCols">{{ pre.label }}</th>\n' +
    '            <th ng-repeat="label in xtab.colLabels">\n' +
    '                <a href\n' +
    '                   class="sort-table"\n' +
    '                   data-sort-source="bodyCols"\n' +
    '                   data-sort-key="{{label}}">\n' +
    '                    {{ label }}\n' +
    '                </a>\n' +
    '            </th>\n' +
    '            <th ng-repeat="post in xtab.postCols">\n' +
    '                <a href\n' +
    '                   data-sort-source="postCols"\n' +
    '                   data-sort-key="{{post.label}}"\n' +
    '                   class="sort-table">{{ post.label }}</a>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <thead ng-if="xtab.withMeans">\n' +
    '        <tr>\n' +
    '            <th class="column-title">\n' +
    '                <span>&nbsp;</span>\n' +
    '            </th>\n' +
    '            <th class="column-title mean" colspan={{xtab.colLabels.length}}>\n' +
    '                <title-variable\n' +
    '                    variable="xtab.measureVariable"\n' +
    '                    type="mean">\n' +
    '                </title-variable>\n' +
    '                <a title="Remove mean variable"\n' +
    '                    class="remove-mean-measure"\n' +
    '                    ng-click="ctrl.removeMeanMeasure()">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '        <tr ng-if="xtab.variables.count() == 2">\n' +
    '            <th class="empty-table-corner column-title">\n' +
    '                <span>&nbsp;</span>\n' +
    '            </th>\n' +
    '            <th class="column-title" colspan={{xtab.colLabels.length}}>\n' +
    '                <title-variable\n' +
    '                    variable="xtab.variables.at(1)"\n' +
    '                    type="column">\n' +
    '                </title-variable>\n' +
    '                <a ng-click="ctrl.removeColumn()" class="remove-column" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '        <tr sort class="column-label-row">\n' +
    '            <th class="empty-table-corner row-title column-title">\n' +
    '                <a href\n' +
    '                data-sort-source="labels" data-sort-key=""\n' +
    '                class="sort-table">\n' +
    '                    <title-variable\n' +
    '                        variable="xtab.variables.at(0)"\n' +
    '                        type="row">\n' +
    '                    </title-variable>\n' +
    '                </a>\n' +
    '                <a ng-click="ctrl.removeRow()" class="remove-row" title="Remove">\n' +
    '                    <span class="icon-remove"></span>\n' +
    '                </a>\n' +
    '            </th>\n' +
    '            <th ng-repeat="label in xtab.colLabels">\n' +
    '                <a href data-sort-source="bodyCols" data-sort-key="{{label}}" class="sort-table">\n' +
    '                    {{ label }}\n' +
    '                </a>\n' +
    '            </th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <tbody ng-include="xtab.template">\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '<div class="horizontal-padding"></div>';
},{}],36:[function(require,module,exports){
module.exports = '<h3>{{ name }}\n' +
    '    <span ng-if="showDescription">\n' +
    '        {{ description }}\n' +
    '    </span>\n' +
    '</h3>\n' +
    '';
},{}],37:[function(require,module,exports){
module.exports = '<a class="page-button" href ng-click="previousPage()">\n' +
    '    <span class="icon-caret-left"></span>\n' +
    '</a>\n' +
    '<div class="pagination-container" ng-if="analyzeTabs.enabled">\n' +
    '    <ul class="tabs-container">\n' +
    '        <li class="tab" ng-class="{ active : tab.active }"\n' +
    '            ng-repeat="tab in analyzeTabs.tabs">\n' +
    '            <a href ng-click="analyzeTabs.handle(\'select\', tab)">\n' +
    '                {{tab.label}}\n' +
    '            </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</div>\n' +
    '<a class="page-button" href ng-click="nextPage()">\n' +
    '    <span class="icon-caret-right"></span>\n' +
    '</a>';
},{}],38:[function(require,module,exports){
module.exports = '<!-- 3rd level. Title and Subtitle, when a variable is selected -->\n' +
    '<h2 class="analysis-title" ng-if="ctrl.visible">\n' +
    '    {{xtab.title}}\n' +
    '\n' +
    '    <a title="Remove mean variable"\n' +
    '        class="remove-mean-measure"\n' +
    '        ng-if="ctrl.meanMeasureVisible"\n' +
    '        ng-click="ctrl.removeMeanMeasure()">\n' +
    '        <span class="icon-remove"></span>\n' +
    '    </a>\n' +
    '</h2>\n' +
    '<h3 class="analysis-subtitle"\n' +
    '    ng-show="xtab.subtitle"\n' +
    '    title="{{xtab.subtitle}}">\n' +
    '    {{xtab.subtitle}}\n' +
    '</h3>\n' +
    '';
},{}],39:[function(require,module,exports){
module.exports = '<div ng-if="showEmptyAnalysisMessage">\n' +
    '    <span>No variables to analyze. <br />Please select variables from the sidebar.</span>\n' +
    '</div>\n' +
    '';
},{}],40:[function(require,module,exports){
module.exports = '<div ng-click="expandOptions($event)" class="selector">{{currentValue}}\n' +
    '    <ul class="select-menu" >\n' +
    '        <li ng-repeat="item in itemList"\n' +
    '            ng-click="selectOption(item, $event)"\n' +
    '            >{{item.item}}\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</div>\n' +
    '';
},{}],41:[function(require,module,exports){
module.exports = '<div class="card"\n' +
    '     data-ng-class="{active: false}"\n' +
    '     >\n' +
    '    <header data-ng-hide="!exp.hasSource" class="card-header">\n' +
    '        <h1 data-dropdown>{{exp.name}}</h1>\n' +
    '    </header>\n' +
    '    <ol data-ng-show="exp.hasSource" class="categories-list">\n' +
    '        <li class="category-item"\n' +
    '            data-ng-repeat="cat in exp.orderedCategories"\n' +
    '            data-ng-show="cat.isSelected || exp.isActive">\n' +
    '            <button type="button"\n' +
    '                class="category-button"\n' +
    '                data-ng-class="{\'selected\' : cat.isSelected}">\n' +
    '                <span class="icon-done" ng-if="cat.isSelected"></span>\n' +
    '                <span ng-class="{\'missing-category\': cat.missing}">{{cat.name}}</span>\n' +
    '            </button>\n' +
    '        </li>\n' +
    '    </ol>\n' +
    '    <div data-ng-show="exp.hasSource" class="card-count">\n' +
    '        <h3>Count</h3><span> {{exp.selectedRows | alwaysRoundCounts}} of {{filterBuilder.stat(\'total\') | alwaysRoundCounts}} ({{exp.selectedRows|percentage:filterBuilder.stat(\'total\')}})</span>\n' +
    '    </div>\n' +
    '    <div data-ng-show="exp.hasSource" class="inactive-arrow">&#9662;</div>\n' +
    '</div>\n' +
    '';
},{}],42:[function(require,module,exports){
module.exports = '<div class="card"\n' +
    '     data-ng-class="{active: exp.isActive}"\n' +
    '     data-ng-click="exp.activate()"\n' +
    '     data-click-anywhere-but-here="exp.deactivate()"\n' +
    '     >\n' +
    '    <header data-ng-hide="!exp.hasSource" class="card-header">\n' +
    '        <h1 data-dropdown>{{exp.name}}</h1>\n' +
    '        <ul>\n' +
    '            <li><button type="button" data-ng-click="exp.selectAll()">Select All</button></li>\n' +
    '            <li><button type="button" data-ng-click="exp.deselectAll()">Deselect All</button></li>\n' +
    '            <li>\n' +
    '                <button type="button"\n' +
    '                        data-ng-click="filterBuilder.handle(\'deleteExpression\', $index)">\n' +
    '                        Delete\n' +
    '                </button>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <cr-select\n' +
    '            class="picker"\n' +
    '            on-option-selected="exp.negateExpression(selectedOption)"\n' +
    '            item-list="exp.pickerItems"\n' +
    '            current-value="exp.pickerOption">\n' +
    '        </cr-select>\n' +
    '    </header>\n' +
    '    <ol data-ng-show="exp.hasSource" class="categories-list">\n' +
    '        <li class="category-item"\n' +
    '            data-ng-repeat="cat in exp.orderedCategories"\n' +
    '            data-ng-show="cat.isSelected || exp.isActive">\n' +
    '            <button type="button"\n' +
    '                class="category-button"\n' +
    '                data-ng-class="{\'selected\' : cat.isSelected}"\n' +
    '                data-ng-click="exp.toggleCategorySelection(cat.id)">\n' +
    '                <span class="icon-done" ng-if="cat.isSelected"></span>\n' +
    '                <span ng-class="{\'missing-category\': cat.missing}">{{cat.name | displayDate: exp.variable.format.data}}</span>\n' +
    '            </button>\n' +
    '        </li>\n' +
    '    </ol>\n' +
    '    <div data-ng-show="exp.hasSource" class="card-count">\n' +
    '        <h3>Count</h3><span> {{exp.selectedRows | alwaysRoundCounts}} of {{filterBuilder.stat(\'total\') | alwaysRoundCounts}} ({{exp.selectedRows|percentage:filterBuilder.stat(\'total\')}})</span>\n' +
    '    </div>\n' +
    '    <div data-ng-show="exp.hasSource" class="inactive-arrow">&#9662;</div>\n' +
    '</div>\n' +
    '';
},{}],43:[function(require,module,exports){
module.exports = '<div ng-include="\'/filter-builder/card-base-expression-readonly.html\'"></div>\n' +
    '';
},{}],44:[function(require,module,exports){
module.exports = '<div ng-include="\'/filter-builder/card-base-expression.html\'"></div>\n' +
    '';
},{}],45:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],46:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],47:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],48:[function(require,module,exports){
module.exports = '<div ng-include="\'/filter-builder/card-base-expression.html\'"></div>';
},{}],49:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],50:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],51:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],52:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],53:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],54:[function(require,module,exports){
module.exports = '<div class="card empty"\n' +
    '     data-ng-class="{active: exp.isActive}">\n' +
    '    <div class="drag-hint tw-bs"\n' +
    '         data-ng-if="!exp.hasSource"\n' +
    '         dropit\n' +
    '         dropit-event="eligibleVariable.selected">\n' +
    '        <input type="text"\n' +
    '               class="drag-help"\n' +
    '               value="Select or drag variable">\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],55:[function(require,module,exports){
module.exports = '<div class="variable-link-container">\n' +
    '    <!-- regular variable, it may have subvariables or may not -->\n' +
    '    <a title="{{variable.hint + variable.name}}"\n' +
    '        data-drag="variable"\n' +
    '        data-drag-key="filterVariable"\n' +
    '        data-ng-click="selectVariable($event, variable)"\n' +
    '        data-ng-controller="eligibleVariable"\n' +
    '        class="variable-link"\n' +
    '        >{{variable.name}}\n' +
    '    </a>\n' +
    '    <!-- button for expanding subvariables -->\n' +
    '    <button title="{{variable.name}}"\n' +
    '        data-ng-if="variable.subvariables"\n' +
    '        type="button"\n' +
    '        class="subvariables-toggle"\n' +
    '        data-ng-click="showOrHideSubvariables(variable,$event)"\n' +
    '        >\n' +
    '        <span data-ng-if="!variable.expanded">&#43;</span>\n' +
    '        <span data-ng-if="variable.expanded">&#45;</span>\n' +
    '    </button>\n' +
    '</div>\n' +
    '<!-- subvariables -->\n' +
    '<div data-ng-if="variable.expanded">\n' +
    '    <button\n' +
    '        data-ng-repeat="subvariable in variable.subvariables"\n' +
    '        title="{{subvariable.name}}"\n' +
    '        class="subvariable-link"\n' +
    '        data-drag="subvariable"\n' +
    '        data-drag-key="filterVariable"\n' +
    '        data-ng-click="selectVariable($event, subvariable)"\n' +
    '        data-ng-controller="eligibleVariable"\n' +
    '        >{{subvariable.name}}\n' +
    '    </button>\n' +
    '</div>\n' +
    '';
},{}],56:[function(require,module,exports){
module.exports = '<div class="filter-builder read-only">\n' +
    '    <div ng-show="filterBuilder != null" class="builder-form">\n' +
    '        <header class="builder-header">\n' +
    '            <div class="title">\n' +
    '                <h1 class="filter-name">{{filterBuilder.filterName()}}</h1>\n' +
    '            </div>\n' +
    '            <div class="total-cases" ng-if="filterBuilder.hasExpressions()">\n' +
    '                <h3>Count</h3>\n' +
    '                <span>{{ (filterBuilder.stat(\'filtered\') | alwaysRoundCounts) || "\\u2014"}}</span>\n' +
    '                <span> of </span>\n' +
    '                <span>{{ filterBuilder.stat(\'total\') | alwaysRoundCounts}}</span>\n' +
    '                <span>({{filterBuilder.stat(\'filtered\') | percentage: filterBuilder.stat(\'total\')}})</span>\n' +
    '            </div>\n' +
    '        </header>\n' +
    '        <div class="expression-list-wrapper">\n' +
    '            <ol class="expression-list"\n' +
    '                ng-style="{width: (filterBuilder.expressionsCount() + 1) * 286 + \'px\'}">\n' +
    '                <li ng-repeat="exp in filterBuilder.filterExpressions()"\n' +
    '                    ng-if="exp.hasSource"\n' +
    '                    class="expression-card"\n' +
    '                    ng-mouseenter="exp.primeCard()">\n' +
    '                    <div class="card-wrapper"\n' +
    '                         ng-include="\'/filter-builder/card-\'+ exp.variable.type +\'-readonly.html\'">\n' +
    '                    </div>\n' +
    '                    <select\n' +
    '                        fancy-select\n' +
    '                        ng-change="filterBuilder.evaluateFilter()"\n' +
    '                        ng-show="filterBuilder.junctionsCount() > $index"\n' +
    '                        ng-model="filterBuilder.filter.junctions[$index]"\n' +
    '                        ng-options="jct for jct in junctionOptions">\n' +
    '                    </select>\n' +
    '                </li>\n' +
    '                <li class="expression-card">\n' +
    '                    <div class="card-wrapper"\n' +
    '                         ng-include="\'/filter-builder/cardblank-readonly.html\'">\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ol>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],57:[function(require,module,exports){
module.exports = '<div class="filter-builder">\n' +
    '    <div ng-show="filterBuilder != null" class="builder-form">\n' +
    '        <header class="builder-header" ng-click="filterBuilder.headerClicked($event)">\n' +
    '            <div class="title">\n' +
    '                <h1 class="filter-name" ng-show="filterBuilder.exclusionMode">\n' +
    '                    {{filterBuilder.filterName()}}\n' +
    '                </h1>\n' +
    '                <input type="text"\n' +
    '                       class="filter-name"\n' +
    '                       name="filterName"\n' +
    '                       placeholder="{{filterBuilder.namePlaceholder || \'Untitled Filter\'}}"\n' +
    '                       ng-model="filterName"\n' +
    '                       ng-hide="filterBuilder.exclusionMode"\n' +
    '                       ng-required="(filterBuilder.nameRequired == undefined && true) || filterBuilder.nameRequired"\n' +
    '                       />\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="total-cases">\n' +
    '                <h3 ng-if="!filterBuilder.exclusionMode">Count</h3>\n' +
    '                <h3 ng-if="filterBuilder.exclusionMode">Excluded</h3>\n' +
    '                <span ng-if="filterBuilder.hasExpressions()">{{ (filterBuilder.stat(\'filtered\') | alwaysRoundCounts) || "\\u2014"}}</span><span ng-if="!filterBuilder.hasExpressions()">—</span>\n' +
    '                <span> of </span>\n' +
    '                <span>{{ filterBuilder.stat(\'total\') | alwaysRoundCounts}}</span>\n' +
    '                <span ng-if="filterBuilder.hasExpressions()">({{filterBuilder.stat(\'filtered\') | percentage: filterBuilder.stat(\'total\')}})</span>\n' +
    '            </div>\n' +
    '            <div share-filter></div>\n' +
    '        </header>\n' +
    '        <div class="expression-list-wrapper">\n' +
    '            <ol class="expression-list"\n' +
    '                ng-style="{width: (filterBuilder.expressionsCount() + 1) * 286 + \'px\'}">\n' +
    '                <li ng-repeat="exp in filterBuilder.filterExpressions()"\n' +
    '                    ng-if="exp.hasSource"\n' +
    '                    class="expression-card"\n' +
    '                    title="{{exp.variable.name}}"\n' +
    '                    ng-mouseenter="exp.primeCard()">\n' +
    '                    <div class="card-wrapper"\n' +
    '                         ng-include="\'/filter-builder/card-\'+ exp.variable.type +\'.html\'">\n' +
    '                    </div>\n' +
    '                    <cr-select\n' +
    '                        class="filterConditional"\n' +
    '                        on-option-selected="filterBuilder.junctionChanged($index, selectedOption); filterBuilder.evaluateFilter()"\n' +
    '                        item-list="junctionOptions"\n' +
    '                        current-value="filterBuilder.filter.junctions[$index]">\n' +
    '                    </cr-select>\n' +
    '                </li>\n' +
    '                <li class="expression-card">\n' +
    '                    <div class="card-wrapper" ng-include="\'/filter-builder/cardblank.html\'">\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ol>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}],58:[function(require,module,exports){
module.exports = '<div class="share-filter-container">\n' +
    '    <label class="share-filter" title="Public filters can be seen and used by anyone with access to the dataset. Private filters can be used only by you." ng-if="shareFilter.allowToEdit">\n' +
    '        <input type="checkbox" fancy-toggle="shareFilter.share" />\n' +
    '    </label>\n' +
    '</div>\n' +
    '';
},{}],59:[function(require,module,exports){
module.exports = '<div>\n' +
    '    <cr-tooltip cr-tooltip-target=".cell-color-key" cr-tooltip-show="visible" cr-tooltip-padding=3>\n' +
    '    <div ng-show="visible">\n' +
    '        <p ng-if="direction !== \'cell\'">Cells are colored based on their difference from the {{ direction }} marginal value ({{ otherDirection }} average) if the difference is statistically significant.</p>\n' +
    '        <!-- <p ng-if="direction === \'cell\'">Cells are colored based on how different they are from the assumption that rows and columns are independent.</p> -->\n' +
    '    </div>\n' +
    '    </cr-tooltip>\n' +
    '    <ol class="cell-color-key"></ol>\n' +
    '\n' +
    '</div>\n' +
    '';
},{}],60:[function(require,module,exports){
module.exports = '<button class="btn primary"></button>\n' +
    '';
},{}],61:[function(require,module,exports){
module.exports = '<div ng-init="ctrl.init()" class="analyze-play-control" data-ng-class="{\'locked\': locked}">\n' +
    '    <form class="xtab-controls">\n' +
    '        <cr-tooltip cr-tooltip-show="tableGraphPrefs.visible" cr-tooltip-target=".graph-tip-target" cr-tooltip-popover="true">\n' +
    '            <div>\n' +
    '                <h3>Default display</h3>\n' +
    '                <div class="cr-control-container">\n' +
    '                    <label><input type="radio" ng-model="defaultAnalysis.value" name="defaultAnalysis" value="table"/>Table</label>\n' +
    '                    <label><input type="radio" ng-model="defaultAnalysis.value" name="defaultAnalysis" value="graph"/>Graph</label>\n' +
    '                    <label><input type="checkbox" name="persist" ng-model="defaultAnalysis.persistServer">Remember this setting</label>\n' +
    '                </div>\n' +
    '                <footer><button class="btn primary" type="button" ng-click="ctrl.savePreferences()">Save</button></footer>\n' +
    '            </div>\n' +
    '        </cr-tooltip>\n' +
    '        <div class="table-graph-toggle graph-tip-target">\n' +
    '            <label\n' +
    '                class="icon-table"\n' +
    '                cr-rightclick="ctrl.togglePopup(\'tableGraphPrefs\')"\n' +
    '                ng-class="{selected: settings.tableOrGraph.table }"\n' +
    '                title="Display analysis as table">\n' +
    '                <input type="radio" name="tableOrGraph" value="table"\n' +
    '                       ng-model="settings.tableOrGraph.value" class="table"/>\n' +
    '            </label>\n' +
    '            <label\n' +
    '                class="icon-graph"\n' +
    '                ng-class="{selected: settings.tableOrGraph.graph }"\n' +
    '                cr-rightclick="ctrl.togglePopup(\'tableGraphPrefs\')"\n' +
    '                title="Display analysis as graph">\n' +
    '                <input type="radio" name="tableOrGraph"\n' +
    '                    value="graph"\n' +
    '                    ng-model="settings.tableOrGraph.value" class="graph"/>\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="counts-percents-toggle"\n' +
    '             ng-class="{hidden: settings.countsOrPercents.hidden, disabled: settings.countsOrPercents.disabled}">\n' +
    '\n' +
    '            <label class="icon-count"\n' +
    '                ng-class="{selected: settings.countsOrPercents.count }"\n' +
    '                title="Display values as counts">\n' +
    '                <input type="radio" name="countsOrPercents" value="count"\n' +
    '                       ng-model="settings.countsOrPercents.value"\n' +
    '                       ng-disabled="settings.countsOrPercents.disabled"\n' +
    '                       class="counts"/>\n' +
    '\n' +
    '            </label>\n' +
    '\n' +
    '            <label class="icon-percentage"\n' +
    '                ng-class="{selected: settings.countsOrPercents.percent }"\n' +
    '                title="Display values as percents">\n' +
    '                <input type="radio" name="countsOrPercents"\n' +
    '                    value="percent"\n' +
    '                    ng-model="settings.countsOrPercents.value"\n' +
    '                    ng-disabled="settings.countsOrPercents.disabled" class="percents"/>\n' +
    '            </label>\n' +
    '            <button type="button"\n' +
    '                    class="percent-direction-toggle"\n' +
    '                    data-ng-class="{\n' +
    '                        \'icon-arrow-down\' : settings.percentageDirection.colPct,\n' +
    '                        \'icon-arrow-right\' : settings.percentageDirection.rowPct,\n' +
    '                        \'icon-cell\' : settings.percentageDirection.cellPct,\n' +
    '                        disabled: settings.percentageDirection.disabled\n' +
    '                    }"\n' +
    '                    title="Sum percentages by row, column, or across entire table"\n' +
    '                    data-multitoggle\n' +
    '                    ng-disabled="settings.percentageDirection.disabled"\n' +
    '                    fn-direction="{{settings.percentageDirection.value}}"\n' +
    '                    data-multitoggle-disabled="settings.percentageDirection.disabled"\n' +
    '                    data-multitoggle-hidden="settings.percentageDirection.hidden"\n' +
    '                    ng-model="settings.percentageDirection.value"\n' +
    '                    data-multitoggle-user-model="settings.percentageDirection.userValue"\n' +
    '                    data-multitoggle-options="percentOptions">\n' +
    '            </button>\n' +
    '            <div>\n' +
    '                <label class=\'icon-signif\' ng-class="{selected: settings.showSignif.true,\n' +
    '                    disabled: settings.showSignif.disabled}"\n' +
    '                title="Highlight values that are statistically significant">\n' +
    '                <input type="checkbox" name="showSignif"\n' +
    '                    ng-disabled="settings.showSignif.disabled"\n' +
    '                    ng-class="{selected: settings.showSignif.true }"\n' +
    '                    ng-model="settings.showSignif.value"\n' +
    '                   />*\n' +
    '                </label>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="decimals-toggle" data-ng-class="{disabled: settings.decimalPlaces.disabled}" title="Number of displayed decimal places">\n' +
    '            <label fn-places="0"\n' +
    '                    ng-class="{selected: settings.decimalPlaces[0], included: settings.decimalPlaces.value > 0 }">\n' +
    '                <input type="radio" name="decimal" data-ng-value="0"\n' +
    '                    ng-model="settings.decimalPlaces.value"\n' +
    '                    data-ng-disabled="{{settings.decimalPlaces.disabled}}"/>0</label>\n' +
    '            <label fn-places="1"\n' +
    '                data-ng-class="{selected: settings.decimalPlaces[1], included: settings.decimalPlaces.value > 1}">\n' +
    '                <input type="radio" name="decimal"\n' +
    '                    data-ng-value="1"\n' +
    '                    ng-model="settings.decimalPlaces.value"\n' +
    '                    ng-disabled="{{settings.decimalPlaces.disabled}}"/>.0</label>\n' +
    '            <label fn-places="2" ng-class="{selected: settings.decimalPlaces.value === 2}">\n' +
    '                <input type="radio" name="decimal" ng-value="2"\n' +
    '                    ng-model="settings.decimalPlaces.value"\n' +
    '                    ng-disabled="settings.decimalPlaces.disabled"/>0</label>\n' +
    '        </div>\n' +
    '        <div class="empty-toggle"\n' +
    '             data-ng-class="{hidden: settings.showEmpty.hidden, disabled: settings.showEmpty.disabled}"\n' +
    '             title="{{settings.showEmpty.title}}">\n' +
    '            <label class="empties-toggle icon-empty"\n' +
    '                    data-ng-class="{selected: settings.showEmpty.true }">\n' +
    '                <input type="checkbox" name="showEmpty"\n' +
    '                    data-ng-disabled="settings.showEmpty.disabled"\n' +
    '                    data-ng-model="settings.showEmpty.value"\n' +
    '                    />\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="pivot-toggle"\n' +
    '             data-ng-class="{hidden: settings.pivot.hidden,disabled: settings.pivot.disabled}"\n' +
    '             title="Swap rows and columns">\n' +
    '            <button class="pivot-button icon-pivot"\n' +
    '                data-ng-click="analysis.handle(\'pivot\', 0, 1)">\n' +
    '            </button>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '</div>\n' +
    '';
},{}],62:[function(require,module,exports){
module.exports = '<div ng-switch on="behavioral.behaviors.strategy">\n' +
    '    <span ng-switch-when="linkable"\n' +
    '        title="{{behavioral.name}}"\n' +
    '        class="variable-button"\n' +
    '        ng-click="behavioral.handle(\'click\')"\n' +
    '        dragit="behavioral.data"\n' +
    '        dragit-operation="link">{{behavioral.name}}</span>\n' +
    '    <span ng-switch-default\n' +
    '        title="{{behavioral.name}}"\n' +
    '        class="variable-button"\n' +
    '        ng-click="behavioral.handle(\'click\')">{{behavioral.name}}</span>\n' +
    '</div>\n' +
    '';
},{}],63:[function(require,module,exports){
module.exports = '<div ng-class="variable.state" data-composite-variable="{{variable.name}}">\n' +
    '    <header>\n' +
    '        <h3 class="composite-header behavioral-variable" variable="variable">\n' +
    '        </h3>\n' +
    '        <button type="button"\n' +
    '            class="toggle"\n' +
    '            ng-hide="variable.behaviors.hideSubvariables"\n' +
    '            data-expand-subvariable="{{variable.name}}"\n' +
    '            ng-class="variable.expansion.state"\n' +
    '            ng-click="variable.expansion.handle(\'toggle\')"\n' +
    '            ng-switch on="variable.expansion.state"\n' +
    '            >\n' +
    '            <!--to CSS-->\n' +
    '            <span ng-switch-when="collapsed" class="icon-plus-sign"></span>\n' +
    '            <span ng-switch-when="expanded" class="icon-minus-sign"></span>\n' +
    '        </button>\n' +
    '    </header>\n' +
    '\n' +
    '    <ol ng-if="variable.expansion.state === \'expanded\'" class="subvariables">\n' +
    '        <li ng-repeat="variable in variable.subvariables" class="subvariable-item">\n' +
    '            <div class="sub hierarchical-variable"></div>\n' +
    '        </li>\n' +
    '    </ol>\n' +
    '</div>\n' +
    '';
},{}],64:[function(require,module,exports){
module.exports = '<div ng-class="group.state" data-group-name="{{group.name}}">\n' +
    '    <header ng-if="group | shouldDisplayHeader">\n' +
    '        <h2>\n' +
    '            <button type="button"\n' +
    '                ng-click="group.handle(\'toggle\')"\n' +
    '                title="{{group.name}}"\n' +
    '                >{{group.name}}\n' +
    '            </button>\n' +
    '        </h2>\n' +
    '    </header>\n' +
    '    <ol class="variables" ng-if="group.state === \'expanded\'">\n' +
    '        <li ng-if="group.decrementable">\n' +
    '            <button type="button"\n' +
    '                class="dec"\n' +
    '                ng-click="group.dec()">Show more...</button>\n' +
    '        </li>\n' +
    '        <li\n' +
    '            ng-repeat="item in group.items | startFrom: group.startFrom | limitTo: group.pageLength">\n' +
    '            <div class="hierarchical-item"></div>\n' +
    '        </li>\n' +
    '        <li ng-if="group.incrementable">\n' +
    '            <button type="button"\n' +
    '                class="inc"\n' +
    '                ng-click="group.inc()">Show more...</button>\n' +
    '        </li>\n' +
    '    </ol>\n' +
    '</div>\n' +
    '';
},{}],65:[function(require,module,exports){
module.exports = '<div data-group-name="{{nestedGroup.name}}">\n' +
    '    <header>\n' +
    '        <a ng-switch on="nestedGroup.state"\n' +
    '            title="{{nestedGroup.name}}"\n' +
    '            ng-click="nestedGroup.handle(\'toggle\')">\n' +
    '            <span>{{nestedGroup.name}}</span>\n' +
    '            <span ng-switch-when="collapsed" class="icon-plus-sign"></span>\n' +
    '            <span ng-switch-when="expanded" class="icon-minus-sign"></span>\n' +
    '        </a>\n' +
    '    </header>\n' +
    '\n' +
    '    <ol ng-if="nestedGroup.state === \'expanded\'" class="subvariables">\n' +
    '        <li ng-repeat="item in nestedGroup.items.slice()" class="subvariable-item">\n' +
    '            <div class="hierarchical-item"></div>\n' +
    '        </li>\n' +
    '    </ol>\n' +
    '</div>\n' +
    '';
},{}],66:[function(require,module,exports){
module.exports = '<div ng-class="variable.state" class="behavioral-variable" variable="variable">\n' +
    '</div>\n' +
    '\n' +
    '';
},{}],67:[function(require,module,exports){
module.exports = '<div class="container hierarchical-variables-list" ng-class="hierarchicalVariablesList.state" >\n' +
    '    <div class="groups">\n' +
    '        <ol>\n' +
    '            <li ng-if="root.decrementable">\n' +
    '                <button type="button" class="dec" ng-click="root.dec()">Show more...</button>\n' +
    '            </li>\n' +
    '            <li\n' +
    '                ng-repeat="item in root.items | startFrom: root.startFrom | limitTo: root.pageLength">\n' +
    '                <div class="hierarchical-top-level-item"></div>\n' +
    '            </li>\n' +
    '            <li ng-if="root.incrementable">\n' +
    '                <button type="button" class="inc" ng-click="root.inc()">Show more...</button>\n' +
    '            </li>\n' +
    '        </ol>\n' +
    '    </div>\n' +
    '</div>\n' +
    '';
},{}]},{},[1]);
