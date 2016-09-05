(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsDetailController', projectsDetailController);

    /* @ngInject */
    function projectsDetailController($mdSidenav, $state, projectService, $stateParams, members, userService, triBreadcrumbsService) {
        var vm = this;
        vm.showSpaces = showSpaces;
        vm.addLogo = addLogo;
        vm.removeLogo = removeLogo;
       
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Project Detail' });
        triBreadcrumbsService.addCrumb({ name: 'Project' });
       
        vm.createOrUpdate = createOrUpdate;
        vm.leaveProject = leaveProject;
        vm.id = parseInt($stateParams.projectId, 10) || 0;
        init();

        function init() {
            if (vm.id !== 0) { /*edit*/
                var paramObj = {
                    'api_token': localStorage.getItem('apiToken'),
                    id: vm.id
                };
                projectService.getProject(paramObj).then(function(data) {
                    vm.selectedProject = data;
                });
            }
        }

        function createOrUpdate() {
            var paramObj = {
                'name': vm.selectedProject.name,
                'id': vm.id,
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


        function showSpaces() {
            $state.go('triangular.organizations.detail.projects.detail.spaces', {
                projectId: vm.selectedProject.project_id,
                spaceList: vm.selectedProject.spaces,
                members: vm.selectedProject.members
            });
        }

       
 uploadReset();
        /////////////////
        function addLogo(files) {
            uploadStarted();
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                files: files,
                project_id: $stateParams.projectId
            }
            projectService.addLogo(paramObj).then(function() {
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
                projectService.addLogo(paramObj);
            }
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

    }
})();
