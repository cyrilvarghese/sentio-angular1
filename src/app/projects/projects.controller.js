(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsController', projectsController);

    /* @ngInject */
    function projectsController($mdSidenav, $mdDialog, $state, $timeout, $stateParams, organizationService, triBreadcrumbsService, projectService, toastService) {

        var vm = this;
        vm.deleteProject = deleteProject;
        vm.showProject = showProject;
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
            // var paramObj = {
            //     orgId:organizationService.getCurrentOrganization().org_id,
            //     api_token: localStorage.getItem('apiToken')
            // }


            // projectService.getProjectList(paramObj).then(function(data) {
            //     vm.projects = data.project_list;
            // });
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                id: $stateParams.id
            };
            organizationService.getOrg(paramObj).then(function(data) {
                vm.selectedOrg = data;
                // organizationService.setCurrentOrganization(vm.selectedOrg);
                organizationService.setCurrentOrganization({
                    "org_id": "15",
                    "org_name": "the org",
                    "description": "",
                    "creator": "cyril varghese",
                    "role": "admin",
                    "plan": {
                        "plan_id": 1,
                        "plan_name": "trial",
                        "num_projects": "1",
                        "num_spaces": "4",
                        "num_members": "3",
                        "price_usd": "0"
                    }
                });
                vm.members = data.members;
                vm.projects = data.projects;
                // setBreadCrumbs();
            });
        }


        triBreadcrumbsService.reset();

        triBreadcrumbsService.addCrumb({ name: 'Projects' });


        function navigateToProject(id, project) {
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
