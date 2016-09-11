(function() {
    'use strict';

    angular
        .module('app.spaces')
        .controller('spacesController', spacesController);

    /* @ngInject */
    function spacesController($state, $mdSidenav,galleryService, $stateParams, spaceService, $scope, $element, $myElementInkRipple, triBreadcrumbsService) {
        var vm = this;
        // vm.members = members.data.splice(0, 5);
        vm.navigateToDetail = navigateToDetail;
        vm.showMembers = showMembers;
        vm.selectMember = selectMember;
        vm.navigateToDetail = navigateToDetail;
        vm.deleteSpace = deleteSpace;
        vm.uploadForLinking = uploadForLinking;
        vm.addSpaceToGallery = addSpaceToGallery;
        vm.RemoveSpaceFromGallery = RemoveSpaceFromGallery;
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Spaces' });
        init();
        uploadReset();

        function init() {
            vm.spaceList = $stateParams.spaceList;
            vm.members = $stateParams.members;
            var paramObj={
                api_token: localStorage.getItem('apiToken'),
                projectId:$stateParams.projectId

            }
            spaceService.getSpaceList(paramObj).then(function(data) {
                vm.spaceList = data;
            });
        }

        function showMembers(componentId) {
            $mdSidenav(componentId)
                .open()
                .then(function() {

                });
        }

        function navigateToDetail(id) {
            $state.go('triangular.organizations.detail.projects.detail.spaces.detail', {
                spaceId: parseInt(id)
            });
        }

        function selectMember(ev) {
            $myElementInkRipple.attach($scope, angular.element(ev.target));
        }

        function deleteSpace(id) {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
       pi_token: localStorage.getItem('apiToken'),
                space_id: id
            }
            spaceService.deleteSpace(paramObj);
        }

        function addSpaceToGallery() {
            console.log('add to gal');
        }

        function uploadForLinking(id, selectSpaceFile) {

            var paramObj = {
                xml_file: selectSpaceFile,
                api_token: localStorage.getItem('apiToken'),
                space_id: id
            }
            spaceService.linkSpaces(paramObj)
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

        function addSpaceToGallery(id) {
            if (localStorage.getItem('userInfo')) {
                var paramObj = {
                     api_token: localStorage.getItem('apiToken'),
                     id: id
                }
                galleryService.addSpaceToGallery(paramObj);
            }
        }

        function RemoveSpaceFromGallery(id) {
            if (localStorage.getItem('userInfo')) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                     id: id
                }
                galleryService.removeSpaceFromGallery(paramObj);
            }
        }

    }

})();
