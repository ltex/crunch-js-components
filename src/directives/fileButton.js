'use strict';
module.exports = FileButton

FileButton.$inject = []

function FileButton() {
    return {
        link: function(scope, element, attributes) {
            var el = angular.element(element);
            el.css({
                position: 'relative'
                , overflow: 'hidden'
                , cursor: 'pointer'
            });
            var fileInput = angular.element(
                '<input type="file" class="uploaded-file" name="uploaded_file" ng-model="upFile" multiple />'
            );
            fileInput.css({
                position: 'absolute'
                , top: 0
                , left: 0
                , width: '100%'
                , height: '100%'
                , opacity: '0'
                , cursor: 'pointer'
            });
            var divCover = angular.element('<div>');
            divCover.css({
                position: 'absolute'
                , top: 0
                , left: 0
                , width: '100%'
                , height: '100%'
                , cursor: 'pointer'
            });
            function clickFileInput(e) {
                fileInput.click()
            }
            function setFile(e){
                angular.element(fileInput)
                    .scope()
                    .setFile(fileInput[0])
            }
            divCover.bind('click', clickFileInput)

            fileInput.bind('change', setFile)
            el.append(fileInput);
            el.append(divCover)

            scope.$on('$destroy',function(){
                divCover.off('click',clickFileInput)
                fileInput.off('change',setFile)
            })
        }
    }
}
