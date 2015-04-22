'use strict'

var createTplBundle = require('./lib/create-tpl-bundle'),
    filterTestFile = require('./lib/filter-test-file'),
    createStylesImporter = require('./lib/create-styles-importer'),
    stat = require('./lib/stat')
    ;

module.exports = function(grunt) {
    var createJadeData = function(host) {
        var process = grunt.template.process.bind(grunt.template),
            hostData = { data : { host : host }}
            ;

        return {
            built : {
                css : '/styles.css',
                    templates : '/templates.js',
                    js : '/build.js'
            },
            external : {
                jquery : process('<%= externalAssets.jquery %>'),
                    angular : process('<%= externalAssets.angular %>'),
                    ngRoute : process('<%= externalAssets.ngRoute %>'),
                    ngSanitize : process('<%= externalAssets.ngSanitize %>'),
                    uiBootstrap : process('<%= externalAssets.uiBootstrap %>')
            },
            endpoints : {
                root : process('<%= host %>/', hostData),
                api : process('<%= host %>/api/', hostData),
                public : process('<%= host %>/api/public/', hostData),
                secure : process('<%= host %>/api/', hostData)
            }
        }
    }

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        fversion : 'whaam',
        baseDirs : {
            src : 'client',
            build : 'build',
            support : 'test-support',
            dist : 'dist',
            tmp : 'tmp'
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
            lib : '<%= baseDirs.src %>/crunch/index.js',
            mainPage : '<%= baseDirs.src %>/index.jade',
            assets : {
                icons : '<%= baseDirs.src %>/*.ico',
                fonts : '<%= baseDirs.src %>/*.ttf'
            }

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
                lib : '<%= build.dev.base %>/build.js',
                mainPage : '<%= build.dev.base %>/index.html',
                assets : '<%= build.dev.base %>'
            }

            , prod : {
                base : '<%= baseDirs.build %>/prod',
                styles : '<%= build.prod.base %>/styles.css',
                templates : '<%= build.prod.base %>/templates.js',
                templatesList : '<%= build.prod.base %>/templates-list.js',
                lib : '<%= build.prod.base %>/build.js',
                mainPage : '<%= build.prod.base %>/index.html',
                assets : '<%= build.prod.base %>',
                manifest : '<%= build.prod.base %>/manifest.json'
            }

            , test : {
                base : '<%= baseDirs.build %>/test',
                specs : '<%= build.test.base %>/specs.js',
                specsSupport : '<%= build.test.base %>/specs-support.js'
            }
        },
        reports : {
            coverage : 'reports/coverage',
            tap : 'reports/results.tap'
        },
        dist : {
            packageName : '<%= baseDirs.dist %>/<%= fversion %>.tar.gz'
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
            }
        },

        jade : {
            dev : {
                options : {
                    pretty : true,
                    data : function() {
                        return createJadeData(grunt.file.read('host.info'))
                    }
                },
                src : ['<%= src.mainPage %>'],
                dest : '<%= build.dev.mainPage %>'
            },
            prod : {
                options : {
                    data : function() {
                        return createJadeData('')
                    }
                },
                src : ['<%= src.mainPage %>'],
                dest : '<%= build.prod.mainPage %>'
            }
        },

        copy : {
            dev : {
                files : [
                    {
                        expand: true,
                        src: [
                            '<%= src.assets.icons %>',
                            '<%= src.assets.fonts %>'
                        ],
                        dest: '<%= build.dev.assets %>',
                        flatten : true
                    }
                ]
            },

            prod : {
                files : [
                    {
                        expand: true,
                        src: [
                            '<%= src.assets.icons %>',
                            '<%= src.assets.fonts %>'
                        ],
                        dest: '<%= build.prod.assets %>',
                        flatten : true
                    }
                ]
            }
        },

        browserify : {
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
                        './<%= src.lib %>:crunch'
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
                        './<%= src.lib %>:crunch'
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

        compress : {
            dist : {
                options : {
                    mode : 'tgz',
                    archive : '<%= dist.packageName %>'
                },
                files : [
                    {
                        expand : true,
                        src : ['<%= build.prod.base %>/*'],
                        dest : '/',
                        flatten : true
                    }
                ]
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
                configFile : 'karma.conf.js',
                files: [
                    '<%= externalAssets.jquery %>',
                    '<%= externalAssets.angular %>',
                    '<%= externalAssets.ngRoute %>',
                    '<%= externalAssets.ngSanitize %>',
                    '<%= externalAssets.uiBootstrap %>',
                    '<%= externalAssets.mocks %>',
                    '<%= build.test.specsSupport %>',
                    '<%= build.test.specs %>'
                ],
                browsers: ['Chrome'],
                coverageReporter: {
                    dir: 'reports/coverage/',
                    reporters: [
                        { type: 'cobertura', subdir: 'cobertura', file: 'cobertura.xml' },
                        { type: 'text-summary', subdir: 'text-summary', file: 'text-summary.txt' }
                    ]
                }
            },
            dev : {
                reporters : ['dots', 'coverage']
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
            }
        },

        connect : {
            dev : {
                options : {
                    base : '<%= build.dev.base %>',
                    open : true,
                    hostname : 'local.crunch.io',
                    livereload : true
                }
            }
        },

        watch : {
            styles : {
                files : [
                    '<%= src.styles.common %>',
                    '<%= src.styles.icons %>',
                    '<%= src.styles.fonts %>',
                    '<%= src.styles.class %>'
                ],
                tasks : ['styles:dev']
            },

            hostInfo : {
                files : [
                    'host.info'
                ],
                tasks : ['jade:dev']
            },

            livereload : {
                options : {
                    livereload : true
                },
                files : [
                    '<%= build.dev.styles %>',
                    '<%= build.dev.templates %>',
                    '<%= build.dev.lib %>',
                    '<%= build.dev.mainPage %>'
                ]
            }
        }
    })

    grunt.registerMultiTask('createTplBundle', createTplBundle(grunt))
    grunt.registerMultiTask('createStylesImporter', createStylesImporter(grunt))
    grunt.registerTask('manifest', 'Creates a compressed package of the application', function() {
        var done = this.async()
            ;

        stat().then(function(manifest) {
            grunt.config.set('fversion', manifest.fversion)
            grunt.file.write(grunt.config.process('<%= build.prod.manifest %>'),
                JSON.stringify(manifest))
            done()
        })
    })

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
        'jade:dev',
        'copy:dev',
        'clean:tmp'
    ])

    grunt.registerTask('build:prod', 'Creates a production build', [
        'clean:tmp',
        'clean:prod',
        'styles:prod',
        'templates:prod',
        'browserify:libProd',
        'uglify',
        'jade:prod',
        'copy:prod',
        'clean:tmp'
    ])

    grunt.registerTask('serve', 'Serves the application in your local environment', [
        'build:dev',
        'connect:dev',
        'watch'
    ])

    grunt.registerTask('dist', 'Creates a distribution build', [
        'clean:dist',
        'build:prod',
        'manifest',
        'compress:dist'
    ])

    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-compress')
    grunt.loadNpmTasks('grunt-mkdir')
}