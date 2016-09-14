(function() {
    'use strict';

    angular
        .module('app.spaces')
        .controller('spacesController', spacesController);

    /* @ngInject */
    function spacesController($state, $mdSidenav, $rootScope, $mdDialog, projectService, galleryService, $stateParams, spaceService, $scope, $element, $myElementInkRipple, logoAndThemeService, triBreadcrumbsService) {
        var vm = this;
        console.log($stateParams.members);
        // vm.members = members.data.splice(0, 5);
        vm.navigateToDetail = navigateToDetail;
        vm.showMembers = showMembers;
        vm.selectMember = selectMember;
        vm.navigateToDetail = navigateToDetail;
        vm.deleteSpace = deleteSpace;
        vm.uploadForLinking = uploadForLinking;
        vm.updateGallery = updateGallery;
        vm.addSpaceToGallery = addSpaceToGallery;
        vm.RemoveSpaceFromGallery = RemoveSpaceFromGallery;
        vm.getLogoList = getLogoList;
        vm.getThemeList = getThemeList;
        vm.addAction = addAction;
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Spaces' });
        init();
        uploadReset();

        function addAction() {
            console.log(vm.selectedTabIndex);
        }

        function init() {
            vm.spaceList = $stateParams.spaceList;
            vm.members = $stateParams.members;
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                projectId: $stateParams.projectId

            }
            spaceService.getSpaceList(paramObj).then(function(data) {
                vm.spaceList = data;
            });
            getLogoList(paramObj);
            getThemeList(paramObj);
            getProjectDetails();
        }

        function getLogoList(paramObj) {

            logoAndThemeService.getLogoList(paramObj).then(function(data) {
                vm.logos = data;
            })
        }

        function getThemeList(paramObj) {

            logoAndThemeService.getThemeList(paramObj).then(function(data) {
                vm.themes = data;
            })
        }

        function getProjectDetails() {
            if ($stateParams.projectId !== 0) { /*edit*/
                var paramObj = {
                    'api_token': localStorage.getItem('apiToken'),
                    id: $stateParams.projectId
                };
                projectService.getProject(paramObj).then(function(data) {
                    vm.selectedProject = data;
                    vm.members = data.members;
                    $rootScope.$broadcast('updateBreadcrumbs', 'Projects > ' + vm.selectedProject.name);
                    getGalleryDetails();


                });
            }
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

        ///////////////////////gallery controller
        vm.openImage = openImage;
        vm.openTheme = openTheme;
        vm.addLogo = addLogo;
        vm.removeLogo = removeLogo;
        vm.addTheme = addTheme;
        vm.removeTheme = removeTheme;
        vm.feed = [];
        uploadReset();
        ////////////////
        function addLogo(files) {
            uploadStarted();
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                files: files,
                project_id: $stateParams.projectId
            }
            logoAndThemeService.addLogo(paramObj).then(function() {
                uploadComplete();
            }, function() {
                uploadReset();
            })
        }


        function removeLogo(files) {
            if (localStorage.getItem('userInfo')) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    logo_id: vm.selectedLogo.id,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeLogo(paramObj);
            }
        }

        function addTheme(files) {
            if (localStorage.getItem('userInfo')) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    files: files,
                    project_id: $stateParams.projectId,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.addTheme(paramObj);
            }
        }

        function removeTheme() {
            if (localStorage.getItem('userInfo')) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    theme_id: vm.selectedTheme.id,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeTheme(paramObj);
            }
        }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function showMembers(componentId) {
            $mdSidenav(componentId)
                .open()
                .then(function() {

                });
        }

        function uploadComplete() {
            vm.status = 'complete';

        }

        function uploadReset() {
            vm.status = 'idle';
        }


        function openImage(image, $event) {
            $mdDialog.show({
                controller: 'GalleryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/gallery/gallery-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                locals: {
                    type: 'logo',
                    image: image,
                    images: vm.logos
                }
            });
        }

        function openTheme(image, $event) {
            $mdDialog.show({
                controller: 'GalleryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/gallery/gallery-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                locals: {
                    type: 'theme',
                    image: image,
                    images: vm.themes
                }
            });
        }

        function createFeed() {
            for (var day = 0; day < numberOfFeedDays; day++) {
                vm.feed.push(createDayOfImages(day));
            }
        }

        // init

        // createFeed();

        function getGalleryDetails() {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                gallery_id: vm.selectedProject.gallery.id || 0,

            }
            galleryService.getGallery(paramObj).then(function(data) {
                vm.currentGallery = data;
            });
        }

        function updateGallery(logoId, themeId) {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                gallery_id: vm.selectedProject.gallery.id,
                theme_id: themeId || vm.currentGallery.theme_id,
                logo_id: logoId || vm.currentGallery.logo_id


            }
            galleryService.updateGallery(paramObj).then(function() {
                vm.currentGallery = data;
            });
        }

    }
})();
