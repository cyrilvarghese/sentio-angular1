(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsDetailController', projectsDetailController);

    /* @ngInject */
    function projectsDetailController($mdSidenav, $mdDialog, $state, organizationService, utilService, projectService, $stateParams, logoAndThemeService, userService, triBreadcrumbsService) {
        var vm = this;
        vm.showSpaces = showSpaces;

        vm.createOrUpdate = createOrUpdate;
        vm.leaveProject = leaveProject;
        vm.showMembers = showMembers;
        vm.id = parseInt($stateParams.projectId, 10) || 0;
        vm.plan = organizationService.getCurrentOrganization().plan;
        vm.projects = organizationService.getCurrentOrganization().projects;

        init();

        function init() {
            if (vm.projects.length + 1 > parseInt(vm.plan.num_projects)) {
                utilService.limitExceededDialog("projects");
                $state.go('triangular.organizations.detail.projects');
                return;
            }
            if (vm.id !== 0) { /*edit*/
                var paramObj = {
                    'api_token': localStorage.getItem('apiToken'),
                    id: vm.id
                };
                projectService.getProject(paramObj).then(function(data) {
                    vm.selectedProject = data;
                    vm.members = data.members;
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

        function showMembers(componentId) {
            $mdSidenav(componentId)
                .open()
                .then(function() {

                });
        }

    }
})();
