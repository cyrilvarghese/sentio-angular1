(function() {
    'use strict';

    angular
        .module('app.spaces')
        .controller('spacesController', spacesController);

    /* @ngInject */
    function spacesController($state, $mdSidenav, $rootScope, organizationService, utilService, $mdDialog, projectService, galleryService, $stateParams, spaceService, $scope, $element, $myElementInkRipple, logoAndThemeService, triBreadcrumbsService) {
        var vm = this;
        vm.themes = [];
        vm.logos = [];
        console.log($stateParams.members);
        // vm.members = members.data.splice(0, 5);
        vm.navigateToDetail = navigateToDetail;
        vm.selectedTabIndex = $stateParams.selectedTabIndex || 0;
        vm.showMembers = showMembers;
        vm.selectMember = selectMember;
        vm.navigateToDetail = navigateToDetail;
        vm.deleteSpace = deleteSpace;
        vm.uploadForLinking = uploadForLinking;
        vm.createOrUpdate = createOrUpdate;
        vm.leaveProject = leaveProject;
        vm.openEditorModal = openEditorModal;
        // vm.updateGallery = updateGallery;
        vm.addSpaceToGallery = addSpaceToGallery;
        vm.removeSpaceFromGallery = removeSpaceFromGallery;
        vm.getLogoList = getLogoList;
        vm.getThemeList = getThemeList;
        vm.openPreviewModal = openPreviewModal;
        // vm.queryMembers = queryMembers;
        // vm.inviteMember = inviteMember;
        vm.addAction = addAction;
        vm.plan = organizationService.getCurrentOrganization().plan;
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Spaces' });
        init();
        uploadReset();

        function addAction() {
            console.log(vm.selectedTabIndex);
        }

        function init() {

            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                projectId: $stateParams.projectId

            }
            getLogoList(paramObj);
            getThemeList(paramObj);
            getProjectDetails();
        }

        function createOrUpdate() {
            var paramObj = {
                'name': vm.selectedProject.name,
                'id': vm.selectedProject.project_id,
                /*current view id*/
                'org_id': $stateParams.id,
                /*org id*/
                'description': vm.selectedProject.description,
                'api_token': localStorage.getItem('apiToken')
            }
            if (vm.id === 0) {

                projectService.createProject(paramObj);
            } else {
                projectService.updateProject(paramObj);
            }
        }



        function leaveProject() {
            var paramObj = {
                id: vm.selectedProject.id,
                'api_token': localStorage.getItem('apiToken')
            }
            userService.leaveProject(paramObj);
        }

        function selectProject() {
            console.log('select');
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
                    vm.selectedProject = data
                    vm.invited = data.invited;
                    vm.members = _.map(data.members, function(member) {
                        member.image = "assets/images/avatars/avatar-1.png";
                        return member;
                    });
                    vm.spaceList = _.map(data.spaces, function(item) {
                        item.editorUrl = item.url.replace('tour.html', 'tour_editor.html');
                        return item;
                    });
                    vm.selectedMembers = [];

                    $rootScope.$broadcast('updateBreadcrumbs', 'Projects > ' + vm.selectedProject.name);
                    if (vm.selectedProject.gallery.length !== 0) {
                        getGalleryDetails();
                    }

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
            if (id === 0 && vm.spaceList.length + 1 > parseInt(vm.plan.num_spaces)) {
                utilService.limitExceededDialog("spaces");
                return;
            }
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

        function removeSpaceFromGallery(id) {
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
                logoAndThemeService.addTheme(paramObj).then(function(data) {
                    updateGallery(data.id, null);
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
                logoAndThemeService.removeTheme(paramObj).then(function(data) {
                    updateGallery(null, data.id);
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

        function updateGallery(themeId, logoId) {

            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                gallery_id: vm.selectedProject.gallery.id,
                theme_id: themeId || vm.currentGallery.theme_id,
                logo_id: logoId || vm.currentGallery.logo_id
            }
            galleryService.updateGallery(paramObj).then(function() {
                $mdDialog.hide();
                $state.go($state.current, {}, { reload: true })

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


        // vm.addMember = addMember;
        vm.removeMember = removeMember;

        vm.openMemberDialog = openMemberDialog;

        function memberChanged() {
            console.log(vm.selectedMember)
        }



        function removeMember(id) {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                member_id: id,
                projectId: $stateParams.projectId
            }
            projectService.removeMember(paramObj);
        }

        function openMemberDialog($event) {

            if (vm.members.length + 1 > parseInt(vm.plan.num_members)) {
                utilService.limitExceededDialog("members");
                return;
            }
            $mdDialog.show({
                controller: 'memberDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/members/member-dialog.tmpl.html',

                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                fullscreen: true,
                locals: {
                    plan: vm.plan
                }

            });
        }

        function openEditorModal($event, url) {
            $mdDialog.show({
                controller: 'spaceEditorDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/spaces/editor-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                fullscreen: true,
                locals: {
                    url: url,
                    title: "Edit Scene"
                }
            });
        }

        function openPreviewModal($event, url, title) {
            $mdDialog.show({
                controller: 'spaceEditorDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/spaces/editor-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                fullscreen: true,
                locals: {
                    url: url,
                    title: title
                }
            });
        }
    }
})();
