var directivesModule = require('../index')
    ,mocks =require('angular-mocks')
    ;

module.exports = (function() {
    'use strict';
    describe.skip('DropdownDirective', function() {
        beforeEach(function() {
            directivesModule('directives');
            angular.mock.module('directives')
        });
        describe('#compile', function() {
            var elm
                , menu
                , otherElm
                , otherMenu
                , scope;
            beforeEach(function() {
                directivesModule('directives');
                angular.mock.module('directives');
                inject(function($rootScope, $compile) {
                    scope = $rootScope.$new();
                    var html = angular.element(
                        '<div></div>');
                    elm = angular.element(
                        '<a href="#" data-dropdown></a>'
                    );
                    menu = angular.element(
                        '<ul><li>Option Argh</li><li>Option Blargh</li></ul>'
                    );
                    otherElm = angular.element(
                        '<a href="#" data-dropdown></a>'
                    );
                    otherMenu = angular.element(
                        '<ul><li>Option Argh</li><li>Option Blargh</li></ul>'
                    );
                    html.append(elm);
                    html.append(menu);
                    html.append(otherElm);
                    html.append(otherMenu);
                    $compile(html)(scope)
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
            describe('when the parent is clicked', function() {
                    beforeEach(function() {
                        elm.click();
                        scope.$apply()
                    });
                    it('should show the menu', function() {
                        menu.is(':visible')
                            .should.be.true
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
                });
            describe('when the parent is clicked', function() {
                    beforeEach(function() {
                        elm.click();
                        scope.$apply()
                    });
                    it('should show the menu', function() {
                        menu.is(':visible')
                            .should.be.true
                    });
                    describe(
                        'when the other menu is opened', function() {
                            beforeEach(function() {
                                otherElm.click();
                                scope.$apply()
                            });
                            it(
                                'should close the first menu', function() {
                                    otherMenu.is(
                                        ':visible')
                                        .should.be.true;
                                    menu.is(':visible')
                                        .should.be.false
                                })
                        })
                })
        })
    })
})
    .call(this);
