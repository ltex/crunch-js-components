module.exports = (function () {
    'use strict';

    var angular = require('angular')
    var mainMod = require('../index')

    require('angular-mocks')

    describe('AnalysesTray', function () {
        var tray

        beforeEach(function () {
            var mod = mainMod('analyses-tray-test')
            angular.mock.module('analyses-tray-test')
        })

        describe('when initialized', function () {
            describe('given preloaded analysis',function(){

                beforeEach(function () {
                    inject(function (AnalysesTray) {
                        tray = new AnalysesTray()
                        tray.handle('initialize', {
                            datasetId: 'foo'
                            , snapshotPreloaded : true
                        })
                    })
                })

                it('should be open', function () {
                    tray.state.should.equal('opened')
                })
            })
            describe('given no preloaded analysis',function(){

                beforeEach(function () {
                    inject(function (AnalysesTray) {
                        tray = new AnalysesTray()
                        tray.handle('initialize', { datasetId: 'foo' })
                    })
                })

                it('should be closed', function () {
                    tray.state.should.equal('closed')
                })
            })

            describe('when toggling a closed tray', function () {
                beforeEach(function () {
                    tray.transition('closed')
                    tray.handle('toggleVisibility')
                })

                it('should become opened', function () {
                    tray.state.should.equal('opened')
                })
            })

            describe('when closing an opened tray', function () {
                beforeEach(function () {
                    tray.transition('opened')
                    tray.handle('toggleVisibility')
                })

                it('should become closed', function () {
                    tray.state.should.equal('closed')
                })
            })
        })
    })
}).call(this)
