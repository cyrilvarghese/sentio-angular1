(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsDetailController', projectsDetailController);

    /* @ngInject */
    function projectsDetailController($mdSidenav, $state, $stateParams, members, triBreadcrumbsService) {
        var vm = this;
        vm.showSpaces = showSpaces;
        vm.selectedProject = $stateParams.selectedProject;/*needs to replaced wiht api*/



        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Project Detail' });
        triBreadcrumbsService.addCrumb({ name: 'Project' });

        vm.navigateToProjects = navigateToProjects;
        vm.updateOrCreate = updateOrCreate;
        vm.leaveOrg = leaveOrg;
        vm.id = parseInt($stateParams.id, 10) || 0;
        init();

        function init() {
            if (vm.id !== 0) {
                var paramObj = {
                    'api_token': localStorage.getItem('apiToken'),
                    id: vm.id
                };
                projectService.getProject(paramObj).then(function(data) {
                    vm.selectedOrg = data;
                });
            }
        }

        function updateOrCreate() {
            var paramObj = {
                'name': vm.selectedOrg.name,
                'id': vm.selectedOrg.org_id,
                'description': vm.selectedOrg.description,
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
                id: 123
            });
        }

    }
})();
