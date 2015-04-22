var directivesModule = require('../index');
module.exports = (function() {
    'use strict';
    describe.skip('contextMenu', function() {
        describe('with items', function() {
            var elm
                , menu
                , scope;
            beforeEach(function() {
                directivesModule('directives');
                angular.mock.module('directives');
                inject(function($rootScope, $compile) {
                    scope = $rootScope.$new();
                    var html = '<a href="#"></a>';
                    elm = angular.element(html);
                    menu = angular.element(
                        '<ul context-menu><li>Option Argh</li><li>Option Blargh</li></ul>'
                    );
                    elm.append(menu);
                    $compile(elm)(scope)
                        .appendTo('body');
                    scope.$digest()
                })
            });
            afterEach(function() {
                elm.remove();
                menu.remove()
            });
            describe('when compiled', function() {
                it('should move the menu to the body', function() {
                        menu.parent()
                            .is('body')
                            .should.be.true
                    });
                it('should hide the menu', function() {
                    menu.is(':visible')
                        .should.be.false
                })
            });
            describe('when the parent is right-clicked', function() {
                    beforeEach(function() {
                        var evt = {
                            pageX: 30
                            , pageY: 40
                        };
                        elm.scope()
                            .handleOnContextMenu(evt);
                        scope.$apply()
                    });
                    it('should show the menu', function() {
                        menu.is(':visible')
                            .should.be.true
                    });
                    it('should position the menu', function() {
                            menu.offset()
                                .top.should.eq(40);
                            menu.offset()
                                .left.should.eq(30)
                        });
                    describe('when off-clicked', function() {
                        it('should close the menu', function() {
                                angular.element(
                                    'body')
                                    .click();
                                scope.$apply();
                                menu.is(':visible')
                                    .should.be.false
                            })
                    })
                })
        });
        describe('when empty', function() {
            var elm
                , menu
                , scope;
            beforeEach(function() {
                directivesModule('directives');
                angular.mock.module('directives');
                inject(function($rootScope, $compile) {
                    scope = $rootScope.$new();
                    var html = '<a href="#"></a>';
                    elm = angular.element(html);
                    menu = angular.element(
                        '<ul context-menu></ul>');
                    elm.append(menu);
                    $compile(elm)(scope)
                        .appendTo('body');
                    scope.$digest()
                })
            });
            afterEach(function() {
                elm.remove();
                menu.remove()
            });
            describe('when the parent is right-clicked', function() {
                    beforeEach(function() {
                        var evt = {
                            pageX: 30
                            , pageY: 40
                        };
                        elm.scope()
                            .handleOnContextMenu(evt);
                        scope.$apply()
                    });
                    it('shouldn\'t show the menu', function() {
                            menu.is(':visible')
                                .should.be.false
                        })
                })
        })
    })
})
    .call(this);