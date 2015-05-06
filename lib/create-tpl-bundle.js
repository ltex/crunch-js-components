'use strict'

var path = require('path')

module.exports = function createBuildTemplates(grunt) {
    function buildTemplates() {
        var buildModuleTpl = grunt.file.read('./lib/templates-builder.tpl')
            , basepath = this.data.options.basepath || process.cwd()
            ;

        this.files.forEach(function(fileCfg) {
            var dest = fileCfg.dest
                , sources = fileCfg.src
                , bundle
                ;

            bundle = grunt.template.process(buildModuleTpl, {
                data : {
                    tpls : sources.map(function(source) {
                        return {
                            name : source.replace(grunt.config.get('baseDirs.src'), '')
                            , path : basepath + '/' + source
                        }
                    })
                }
            })

            grunt.file.write(dest, bundle)
        })
    }

    return buildTemplates
}