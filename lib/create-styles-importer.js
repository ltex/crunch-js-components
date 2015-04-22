'use strict'

var path = require('path')

module.exports = function createStylesImporter(grunt) {
    function stylesImporter() {
        var importStylesTpl = grunt.file.read('./lib/styles-importer.tpl')
            ;

        this.files.forEach(function(fileCfg) {
            var dest = fileCfg.dest
                , sources = fileCfg.src
                , bundle
                , root = process.cwd()
                ;

            bundle = grunt.template.process(importStylesTpl, {
                data : {
                    stylesheets : sources.map(function(source) {
                        return path.join(root, source)
                    })
                }
            })

            grunt.file.write(dest, bundle)
        })
    }

    return stylesImporter
}