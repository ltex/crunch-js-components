'use strict'

function buildModule() {
    var templateModules = {}
        , angular = require("angular")
        , mod = angular.module("crunch-js-components-tpls", [])
        ;

    mod.run(["$templateCache", function($templateCache) {
    <% tpls.forEach(function(tpl) { %>
        $templateCache.put("<%= tpl.name %>", require("<%= tpl.path %>"));<% }) %>
    }])

    return mod
}

module.exports = buildModule()