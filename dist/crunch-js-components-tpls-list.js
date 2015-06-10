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