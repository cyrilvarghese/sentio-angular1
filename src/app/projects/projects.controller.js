(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsController', projectsController);

    /* @ngInject */
    function projectsController($mdSidenav, $mdDialog, userService, $state, $timeout, utilService, $stateParams, organizationService, triBreadcrumbsService, projectService, toastService) {

        var vm = this;
        vm.deleteProject = deleteProject;
        vm.showProject = showProject;
        vm.role = $stateParams.role;
        vm.selectProject = selectProject;
        vm.navigateToSpaces = navigateToSpaces;
        vm.navigateToProject = navigateToProject;

        vm.isProjectSelected = false;
        $timeout(function() {
            angular.element('#projects').addClass('md-hue-1');

        }, 100);
        // vm.projects = $stateParams.projects;
        init();

        function init() {
            if (vm.role)
               { userService.setRole([vm.role]);}
             
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                id: $stateParams.id
            };
            organizationService.getOrg(paramObj).then(function(data) {
                vm.selectedOrg = data;
                organizationService.setCurrentOrganization(vm.selectedOrg);

                vm.plan = data.plan;
                vm.members = data.members;
                vm.projects = data.projects;
            });
        }


        triBreadcrumbsService.reset();

        triBreadcrumbsService.addCrumb({ name: 'Projects' });


        function navigateToProject(id, project) {
            if (id === 0 && vm.projects.length + 1 > parseInt(vm.plan.num_projects)) {
                utilService.customConfirmDialog('Plan limit exceeded!', 'You have exceeded the allowed number of projects, upgrade your plan or contact the organization admin.', false, "Upgrade", "cancel", navigateToPlanChange, null);

                return;
            }
            var id = id || 0;
            $state.go('triangular.organizations.detail.projects.detail', {
                projectId: parseInt(id),
                selectedProject: project
            });
        }

        function navigateToSpaces(id, project) {
            var id = id || 0;
            $state.go('triangular.organizations.detail.projects.detail.spaces', {
                projectId: parseInt(id),
                selectedProject: project,
                // members:project.members,
                // galleryId:project.galleryId
            });
        }






        function deleteProject(id, project, $event) {
            var message = 'confirm deleting project - ' + project.name;

            var confirm = $mdDialog.confirm()
                .title('Delete Project')
                .textContent(message)
                .ariaLabel('delete')
                .targetEvent($event)
                .ok('Confirm')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                var paramObj = {
                    project_id: id,
                    api_token: localStorage.getItem('apiToken')
                }
                projectService.deleteProject(paramObj);
            }, function() {

            });
            $event.stopPropagation();

        };
    }

    function showProject() {
        $state.go('triangular.projects.detail', {
            id: 123
        });
    }

    function selectProject(flag, project) {
        console.log('select');
        vm.isProjectSelected = !flag;
        vm.selectedProject = project;
    }


})();
