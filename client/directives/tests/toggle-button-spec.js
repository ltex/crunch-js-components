var directivesModule = require('../index');
var mocks = require('angular-mocks')
module.exports = (function() {
    'use strict';
    describe('ToggleButtonDirective', function() {
        var elm
            , scope;
        beforeEach(function() {
            directivesModule('directives');
            angular.mock.module('directives');
            inject(function($rootScope, $compile) {
                scope = $rootScope.$new();
                scope.myModel = true;
                scope.selected = 'Selected';
                scope.unselected = 'Unselected';
                var html =
                    '<div id="test-toggle" data-toggle-button="myModel" data-toggle-selected="selected" data-toggle-unselected="unselected">';
                elm = angular.element(html);
                $compile(elm)(scope)
                    .appendTo('body');
                scope.$digest()
            })
        });
        afterEach(function() {
            angular.element('#test-toggle')
                .remove()
        });
        it('should show the toggle button', function() {
            elm.hasClass('toggle')
                .should.be.true
        });
        it('should should show the text based on selection', function() {
                elm.find('.selected')
                    .text()
                    .should.equal('Selected');
                elm.find('.unselected')
                    .text()
                    .should.equal('Unselected')
            });
        it('should toggle the state of the checkbox when clicked', function() {
                elm.click();
                scope.$apply();
                scope.myModel.should.be.false;
                elm.find('.unselected')
                    .is(':visible')
                    .should.be.true
            });
        it('should adjust its width based on its widest option', function() {
                var originalWidth = elm.width();
                elm.click();
                scope.$apply();
                elm.width()
                    .should.equal(originalWidth)
            });
        describe('flipped boolean', function() {
            beforeEach(function() {
                inject(function($rootScope, $compile) {
                    scope.myFlippedModel = false;
                    var flippedHTML =
                        '<div id="test-toggle" data-toggle-button="myFlippedModel" data-toggle-selected="selected" data-toggle-unselected="unselected" data-toggle-flipped="true">';
                    elm = angular.element(
                        flippedHTML);
                    $compile(elm)(scope)
                        .appendTo('body');
                    scope.$digest()
                })
            });
            it('should filp the styles on the boolean if needed', function() {
                    elm.hasClass('flipped')
                        .should.be.true
                })
        })
    })
})
    .call(this);
