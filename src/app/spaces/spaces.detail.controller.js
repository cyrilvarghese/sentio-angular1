(function() {
    'use strict';

    angular
        .module('app.spaces')
        .controller('spacesDetailController', spacesDetailController);

    /* @ngInject */
    function spacesDetailController($mdSidenav, spaceService, galleryService, toastService, Upload, utilService, $stateParams, triBreadcrumbsService) {
        var vm = this;
        vm.isOpen = false;
        vm.createSpaceDisabled = true;
        vm.files = [];
        if ($stateParams.spaceId) {
            vm.id = parseInt($stateParams.spaceId);
        } else {
            vm.id = 0;
        }
        uploadReset();
        vm.status = 'idle'; // idle | uploading | complete
        vm.createSpace = createSpace;
        vm.updateSpace = updateSpace;
        vm.addToArr = addToArr;
        vm.addToGallery = addToGallery;
        vm.removeFromGallery = removeFromGallery;
        vm.uploadIncomplete = true;
        if (vm.id !== 0) {
            init();
        }
        vm.removeFile = removeFile;


        function removeFile(file, index) {
            vm.files = _.map(vm.files, function(value,key) {
                if(index === key){
                    value.deleted=true;

                }
                return value;
            })
          
        }

        function init() {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                space_id: vm.id

            }

            spaceService.getSpace(paramObj).then(function(data) {
                vm.generalInfo = {
                    name: data.name,
                    description: data.description,

                }
            });
        }
        var fileList;
        ////////////////
        function addToArr(selectedFiles) {
            vm.files.push.apply(vm.files, selectedFiles);
        }

        function createSpace() {
            // vm.createSpaceDisabled = false;
            uploadStarted();
            vm.files=_.filter(vm.files,function(item){
                return !item.deleted;
            })
            var paramObj = {
                projectId: $stateParams.projectId,
                name: vm.generalInfo.name,
                description: vm.generalInfo.description
            }
            spaceService.upload(vm.files, paramObj).then(function(data) {
                uploadComplete();
                vm.spaceEditorUrl = data.
                vm.uploadIncomplete = false;
                triWizard.nextStep();
            }, function() {
                uploadFailed();
                vm.uploadIncomplete = true;
            });
            // fileList=$files;

        }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function uploadComplete() {
            vm.status = 'complete';

        }

        function uploadReset() {
            vm.status = 'idle';
        }

        function uploadFailed() {
            vm.status = 'failed';
        }

        function updateSpace() {
            var paramObj = {
                project_id: $stateParams.projectId,
                id: vm.id || 0,
                name: vm.generalInfo.name,
                description: vm.generalInfo.description,
                api_token: localStorage.getItem('apiToken')

            }
            spaceService.updateSpace(paramObj).then(function(data) {
                vm.spaceUrl = data.space_url;

            });
        }

        function addToGallery() {
            var paramObj = {
                space_id: vm.id,
                api_token: localStorage.getItem('apiToken')
            }
            galleryService.addToGallery(paramObj);
        }

        function removeFromGallery() {
            // var paramObj = {
            //     user_id:
            //      gallery_id: space_id:
            // }
            galleryService.removeFromGallery();
        }
    }
})();
