(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsController', projectsController);

    /* @ngInject */
    function projectsController($mdSidenav, $state, $stateParams, organizationService, triBreadcrumbsService, projectService, toastService) {
       
        var vm = this;
        vm.deleteProject = deleteProject;
        vm.showProject = showProject;
        vm.selectProject = selectProject;
        vm.navigateToSpaces = navigateToSpaces;
        vm.navigateToProject = navigateToProject;
        vm.isProjectSelected = false;
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
                organizationService.setCurrentOrganization(vm.selectedOrg);
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


        function deleteProject(id,project) {
            var message = 'confirm deleting project - ' +project.name;
            toastService.showCustomToast(message, 'yes', 'no').then(function(response) {
                console.log(response);
                var paramObj = {
                    project_id:id,
                    api_token: localStorage.getItem('apiToken')
                }
                projectService.deleteProject(paramObj);
            });

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

    }
})();
