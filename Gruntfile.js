'use strict'

var createTplBundle = require('./lib/create-tpl-bundle'),
    filterTestFile = require('./lib/filter-test-file'),
    createStylesImporter = require('./lib/create-styles-importer')
    ;

module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        baseDirs : {
            src : 'src',
            build : 'build',
            support : 'test-support',
            dist : 'dist',
            tmp : 'tmp',
            examples : 'examples'
        },
        externalAssets : {
            jquery : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',
            angular: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js',
            mocks:   'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-mocks.js',
            ngRoute: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-route.min.js',
            ngSanitize : 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-sanitize.min.js',
            uiBootstrap : 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.0/ui-bootstrap-tpls.min.js'
        },
        src : {
            styles : {
                values : '<%= baseDirs.src %>/crunch/values.styl',
                icons : '<%= baseDirs.src %>/crunch/icons.styl',
                'class' : '<%= baseDirs.src %>/**/class.styl'
            },
            externalModules : {
                angular : './<%= baseDirs.src %>/test-support/angular-shim.js',
                angularMocks : './<%= baseDirs.src %>/test-support/angular-mocks-shim.js',
                vega : './<%= baseDirs.src %>/lib/vega-1.3.2/vega.js',
                canvas : './<%= baseDirs.src %>/lib/vega-1.3.2/canvas.js'
            },
            templates : '<%= baseDirs.src %>/**/*.html',
            specs : '<%= baseDirs.src %>/**/*-spec.js',
            specsSupport : '<%= baseDirs.src %>/test-support/index.js',
            lib : '<%= baseDirs.src %>/crunch/index.js'
        },
        tmp : {
            styles : '<%= baseDirs.tmp %>/all.styl',
            assets : '<%= baseDirs.tmp %>/assets'
        },
        build : {
            dev : {
                base : '<%= baseDirs.build %>/dev',
                styles : '<%= build.dev.base %>/styles.css',
                templates : '<%= build.dev.base %>/templates.js',
                templatesList : '<%= build.dev.base %>/templates-list.js',
                lib : '<%= build.dev.base %>/build.js'
            }

            , prod : {
                base : '<%= baseDirs.build %>/prod',
                styles : '<%= build.prod.base %>/styles.css',
                templates : '<%= build.prod.base %>/templates.js',
                templatesList : '<%= build.prod.base %>/templates-list.js',
                lib : '<%= build.prod.base %>/build.js',
                manifest : '<%= build.prod.base %>/manifest.json'
            }

            , test : {
                base : '<%= baseDirs.build %>/test',
                specs : '<%= build.test.base %>/specs.js',
                specsSupport : '<%= build.test.base %>/specs-support.js'
            }

        },
        npmDist : {
            stylesList : '<%= baseDirs.dist %>/crunch-js-components.styl',
            styles : '<%= baseDirs.dist %>/crunch-js-components.css',
            templatesList : '<%= baseDirs.dist %>/crunch-js-components-tpls-list.js',
            templates : '<%= baseDirs.dist %>/crunch-js-components-tpls.js'
        },
        reports : {
            coverage : 'reports/coverage',
            tap : 'reports/results.tap'
        },
        clean : {
            dist : {
                src : ['<%= baseDirs.dist %>']
            },
            dev : {
                src : ['<%= build.dev.base %>']
            },
            prod : {
                src : ['<%= build.prod.base %>']
            },
            tmp : {
                src : ['<%= baseDirs.tmp %>']
            },
            test : {
                src : ['<%= build.test.base %>']
            }
        },
        createStylesImporter : {
            all : {
                src : [
                    '<%= src.styles.values %>',
                    '<%= src.styles.icons %>',
                    '<%= src.styles.class %>'
                ],
                dest : '<%= tmp.styles %>'
            },

            npmDist : {
                options : {
                    basepath : '..'
                },
                src : [
                    '<%= src.styles.values %>',
                    '<%= src.styles.class %>'
                ],
                dest : '<%= npmDist.stylesList %>'
            }
        },
        stylus : {
            options : {
                paths : ['<%= src.styles.bootstrap %>'],
                urlfunc : {
                    name : 'url'
                },
                use : ['nib'],
                import : ['nib/reset']
            },
            dev : {
                options : {
                    compress : false
                },
                src : ['<%= tmp.styles %>'],
                dest : '<%= build.dev.styles %>'
            },
            prod : {
                src : ['<%= tmp.styles %>'],
                dest : '<%= build.prod.styles %>'
            },
            npmDist : {
                src : ['<%=  npmDist.stylesList %>', '<%= src.styles.icons %>'],
                dest : '<%= npmDist.styles %>'
            }
        },
        createTplBundle : {
            dev : {
                src :  ['<%= src.templates.ngTemplates %>'],
                dest:   '<%= build.dev.templatesList %>'
            },
            prod : {
                src :  ['<%= src.templates.ngTemplates %>'],
                dest:   '<%= build.prod.templatesList %>'
            },
            npmDist : {
                options : {
                    basepath : '..'
                },
                src : ['<%= src.templates.ngTemplates %>'],
                dest : '<%= npmDist.templatesList %>'
            }
        },
        browserify : {
            templatesNpmDist : {
                options : {
                    external : ['angular'],
                    transform : ['html2js-browserify'],
                    browserifyOptions : {
                        fullPaths : false
                    }
                },
                src : ['<%= npmDist.templatesList %>'],
                dest : '<%= npmDist.templates %>'
            },
            templatesDev : {
                options : {
                    external : ['angular'],
                    transform : ['html2js-browserify'],
                    browserifyOptions : {
                        fullPaths : false
                    },
                    watch : true
                },
                src : ['<%= build.dev.templatesList %>'],
                dest : '<%= build.dev.templates %>'
            },
            templatesProd : {
                options : {
                    external : ['angular'],
                    transform : ['html2js-browserify'],
                    browserifyOptions : {
                        fullPaths : false
                    }
                },
                src : ['<%= build.prod.templatesList %>'],
                dest : '<%= build.prod.templates %>'
            },
            libDev : {
                options : {
                    alias : [
                        './<%= src.externalModules.angular %>:angular',
                        './<%= src.externalModules.vega %>:vega',
                        './<%= src.externalModules.canvas %>:canvas',
                        './<%= src.lib %>:crunch-js-components'
                    ],
                    browserifyOptions : {
                        debug : true,
                        fullPaths : false
                    },
                    watch : true
                },
                src : [],
                dest : '<%= build.dev.lib %>'
            },
            libProd : {
                options : {
                    alias : [
                        './<%= src.externalModules.angular %>:angular',
                        './<%= src.externalModules.vega %>:vega',
                        './<%= src.externalModules.canvas %>:canvas',
                        './<%= src.lib %>:crunch-js-components'
                    ],
                    browserifyOptions : {
                        fullPaths : false
                    }
                },
                src : [],
                dest : '<%= build.prod.lib %>'
            },
            specsSupport : {
                options : {
                    alias : [
                        './<%= src.externalModules.angular %>:angular',
                        './<%= src.externalModules.angularMocks %>:angular-mocks',
                        './<%= src.externalModules.vega %>:vega',
                        './<%= src.externalModules.canvas %>:canvas'
                    ]
                },
                src : ['<%= src.specsSupport %>'],
                dest : '<%= build.test.specsSupport %>'
            },
            specsDev : {
                options : {
                    watch : true,
                    external : ['angular', 'angular-mocks', 'vega'],
                    transform : ['html2js-browserify'],
                    browserifyOptions : {
                        debug : true
                    }
                },
                src : ['<%= src.specs %>'],
                dest : '<%= build.test.specs %>',
                filter : function(filepath) {
                    var options = {
                            file:     grunt.option('file'),
                            features: grunt.option('features')
                        }
                        ;

                    return filterTestFile(filepath, options)
                }
            },
            specsProd : {
                options : {
                    external : ['angular', 'angular-mocks', 'vega'],
                    transform : ['html2js-browserify', 'browserify-istanbul']
                },
                src : ['<%= src.specs %>'],
                dest : '<%= build.test.specs %>'
            }
        },

        uglify : {
            options : {
                mangle : true
            },
            lib : {
                src : ['<%= build.prod.lib %>'],
                dest : '<%= build.prod.lib %>'
            },
            templates : {
                src : ['<%= build.prod.templates %>'],
                dest : '<%= build.prod.templates %>'
            }
        },

        mkdir : {
            reports : {
                options : {
                    create : ['reports']
                }
            }
        },

        karma : {
            options : {
                files: [
                    '<%= externalAssets.jquery %>',
                    '<%= externalAssets.angular %>',
                    '<%= externalAssets.ngRoute %>',
                    '<%= externalAssets.ngSanitize %>',
                    '<%= externalAssets.uiBootstrap %>',
                    '<%= externalAssets.mocks %>',
                    '<%= build.test.specsSupport %>',
                    '<%= build.test.specs %>'
                ]//,
                /*coverageReporter: {
                    dir: 'reports/coverage/',
                    reporters: [
                        { type: 'cobertura', subdir: 'cobertura', file: 'cobertura.xml' },
                        { type: 'text-summary', subdir: 'text-summary', file: 'text-summary.txt' }
                    ]
                }*/
            },
            dev : {
                options: {
                    configFile: 'config/karma.conf.js',
                    browsers: ['Chrome']
                    //reporters: ['dots', 'coverage']
                }
            },
            prod : {
                options : {
                    browsers:  ['Chrome'],
                    reporters : ['coverage', 'tap'],
                    singleRun: true,
                    tapReporter : {
                        outputFile : '<%= reports.tap %>'
                    }
                }
            },
            travis: {
                options : {
                    configFile: 'config/karma.travis.conf.js',
                    singleRun: true
                }
            }
        },

        connect : {
            dev : {
                options : {
                    base : [
                        '<%= build.dev.base %>',
                        '<%= baseDirs.examples %>'
                    ],
                    open : true,
                    hostname : 'local.crunch.io',
                    keepalive : true
                }
            }
        }
    })

    grunt.registerMultiTask('createTplBundle', createTplBundle(grunt))
    grunt.registerMultiTask('createStylesImporter', createStylesImporter(grunt))

    grunt.registerTask('styles:dev', 'Creates a development mode css bundle', [
        'createStylesImporter:all',
        'stylus:dev'
    ])

    grunt.registerTask('styles:prod', 'Creates a production mode ', [
        'createStylesImporter:all',
        'stylus:prod'
    ])

    grunt.registerTask('templates:dev', 'Creates a dev templates bundle', [
        'createTplBundle:dev',
        'browserify:templatesDev'
    ])

    grunt.registerTask('templates:prod', 'Creates a dev templates bundle', [
        'createTplBundle:prod',
        'browserify:templatesProd'
    ])

    grunt.registerTask('test', 'Creates an specs bundle', [
        'clean:test',
        'browserify:specsSupport',
        'mkdir:reports'
    ])

    grunt.registerTask('test:dev', 'Run test suite in development mode. Watches for file changes and re-run the tests.', [
        'test',
        'browserify:specsDev',
        'karma:dev'
    ])

    grunt.registerTask('test:travis', 'Run test suite in development mode. Watches for file changes and re-run the tests.', [
        'test',
        'browserify:specsDev',
        'karma:travis'
    ])

    grunt.registerTask('test:prod', 'Run test suite in CI mode. After the first run karma stops.', [
        'test',
        'browserify:specsProd',
        'karma:prod'
    ])

    grunt.registerTask('build:dev', 'Creates a development build', [
        'clean:tmp',
        'clean:dev',
        'styles:dev',
        'templates:dev',
        'browserify:libDev',
        'clean:tmp'
    ])

    grunt.registerTask('build:prod', 'Creates a production build', [
        'clean:tmp',
        'clean:prod',
        'styles:prod',
        'templates:prod',
        'browserify:libProd',
        'uglify',
        'clean:tmp'
    ])

    grunt.registerTask('serve:examples', [
        'build:dev',
        'connect:dev'
    ])

    grunt.registerTask('dist', [
        'build:prod'
    ])

    grunt.registerTask('npmDist', [
        'createStylesImporter:npmDist',
        'createTplBundle:npmDist',
        'browserify:templatesNpmDist',
        'stylus:npmDist'
    ])

    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-mkdir')
    grunt.loadNpmTasks('grunt-release')
}