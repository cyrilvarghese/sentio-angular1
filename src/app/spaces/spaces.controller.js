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
        // vm.updateGallery = updateGallery;
        vm.addSpaceToGallery = addSpaceToGallery;
        vm.RemoveSpaceFromGallery = RemoveSpaceFromGallery;
        vm.getLogoList = getLogoList;
        vm.getThemeList = getThemeList;
        vm.queryMembers = queryMembers;
        vm.inviteMember = inviteMember;
        vm.addAction = addAction;
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Spaces' });
        init();
        uploadReset();

        function addAction() {
            console.log(vm.selectedTabIndex);
        }

        function init() {
            // vm.spaceList = $stateParams.spaceList;
            // vm.members = $stateParams.members;
            var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    projectId: $stateParams.projectId

                }
                // spaceService.getSpaceList(paramObj).then(function(data) {
                //     vm.spaceList = data;
                // });
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
                    vm.members = _.map(data.members, function(member) {
                        member.image = "assets/images/avatars/avatar-1.png";
                        return member;
                    });
                    vm.spaceList = data.spaces;
                    vm.selectedMembers = [];

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
        vm.openLogoDialog = openLogoDialog;
        vm.openThemeDialog = openThemeDialog;
        // vm.selectImage = selectImage;
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
                logoAndThemeService.addTheme(paramObj).then(function(data){
                    updateGallery(data.id,null);
                });
            }
        }

        function removeTheme() {
            if (localStorage.getItem('userInfo')) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    theme_id: vm.selectedTheme.id,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeTheme(paramObj).then(function(data){
                    updateGallery(null,data.id);
                });
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
        function updateGallery(themeId,logoId) {
            
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                gallery_id: vm.selectedProject.gallery.id,
                theme_id: themeId || vm.currentGallery.theme_id,
                logo_id: logoId || vm.currentGallery.logo_id


            }
            galleryService.updateGallery(paramObj).then(function() {
                $mdDialog.hide();
                $state.go($state.current,{},{reload:true})

            });
        }

        function openLogoDialog($event) {
            $mdDialog.show({
                controller: 'GalleryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/gallery/gallery-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                fullscreen: true,
                locals: {
                    selectedProject: vm.selectedProject,
                    list: vm.logos,
                    currentGallery: vm.currentGallery,
                    type: 'logo'

                }

            });
        }

        function openThemeDialog($event) {
            $mdDialog.show({
                controller: 'GalleryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/gallery/gallery-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                fullscreen: true,
                targetEvent: $event,
                parent: angular.element(document.body),
                locals: {
                    selectedProject: vm.selectedProject,
                    list: vm.themes,
                    currentGallery: vm.currentGallery,
                    type: 'theme'

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
                vm.currentLogo = _.filter(vm.logos, function(item) {
                    return item.id === parseInt(data.logo_id);
                })[0];
                vm.currentTheme = _.filter(vm.themes, function(item) {
                    return item.id === parseInt(data.theme_id);
                })[0];


            });
        }



        ////////////// /////members


        vm.addMember = addMember;
        vm.removeMember = removeMember;

        function queryMembers($query) {
            var lowercaseQuery = angular.lowercase($query);

            var members = localStorage.getItem("currentOrg") ? JSON.parse(localStorage.getItem("currentOrg")).members : [];
            members = _.map(members, function(member) {

                member.name = member.name + ' - ' + member.email;
                return member;
            });
            return members.filter(function(member) {
                var lowercaseName = angular.lowercase(member.name);
                if (lowercaseName.indexOf(lowercaseQuery) !== -1) {
                    vm.memberNotFound = false;

                    return member;
                } else {
                    vm.memberNotFound = true;
                }
            });
        }

        function memberChanged() {
            console.log(vm.selectedMember)
        }

        function addMember() {
            _.each(vm.selectedMembers, function(member) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    member_id: member.id,
                    projectId: $stateParams.projectId
                }
                projectService.addMember(paramObj);
            });

        }

        function removeMember(id) {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                member_id: id,
                projectId: $stateParams.projectId
            }
            projectService.removeMember(paramObj);
        }

        function inviteMember() {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                email_id: vm.memberToBeAdded,
                projectId: $stateParams.projectId

            }
            projectService.sendInvite(paramObj);
        }

    }
})();
