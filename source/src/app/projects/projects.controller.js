(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsController', projectsController);

    /* @ngInject */
    function projectsController($mdSidenav, $state, $stateParams, triBreadcrumbsService, projectService, toastService) {
        if(!$stateParams.id){
            toastService.show('Select An Orgnization First');
            $state.go('triangular.organizations');
            return;
        }
        var vm = this;
        vm.deleteProject = deleteProject;
        vm.showProject = showProject;
        vm.selectProject = selectProject;
        vm.navigateToProject = navigateToProject;
        vm.isProjectSelected = false;
        // vm.projects = $stateParams.projects;
        init();
        function init() {
            var paramObj = {
                orgId: $stateParams.id,
                api_token: localStorage.getItem('apiToken')
            }
            projectService.getProjectList(paramObj).then(function(data) {
                vm.projects = data.project_list;
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


        function deleteProject() {
            var message = 'confirm deleting project - ' + vm.selectedProject.name;
            toastService.showCustomToast(message, 'yes', 'no').then(function(response) {
                console.log(response);
                var paramObj = {
                    project_id: vm.selectedProject.id,
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
