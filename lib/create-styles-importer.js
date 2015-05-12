'use strict'

var path = require('path')

module.exports = function createStylesImporter(grunt) {
    function stylesImporter() {
        var importStylesTpl = grunt.file.read('./lib/styles-importer.tpl')
            , options = this.data.options
            , basepath = (options && options.basepath) || process.cwd()
            ;

        this.files.forEach(function(fileCfg) {
            var dest = fileCfg.dest
                , sources = fileCfg.src
                , bundle
                ;

            bundle = grunt.template.process(importStylesTpl, {
                data : {
                    stylesheets : sources.map(function(source) {
                        return basepath + '/' + source
                    })
                }
            })

            grunt.file.write(dest, bundle)
        })
    }

    return stylesImporter
}