(function() {
    'use strict';

    angular
        .module('app.organizations')
        .controller('organizationsDetailController', organizationsDetailController);

    /* @ngInject */
    function organizationsDetailController($mdSidenav, userService,organizationService, $state, $stateParams, members) {
        var vm = this;
        vm.deleteProject = deleteProject;
        vm.showProject = showProject;
        vm.selectProject = selectProject;
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
                organizationService.getOrg(paramObj).then(function(data) {
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
                organizationService.createOrganization(paramObj);
            } else {
                organizationService.updateOrganization(paramObj);
            }
        }



        function leaveOrg() {
            var paramObj={
                org_id:vm.selectedOrg.org_id,
                 'api_token': localStorage.getItem('apiToken')
            }
            userService.leaveOrg(paramObj);
        }
        vm.projects = [{
            name: 'Project 1',
            createdBy: 'John',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'
        }, {
            name: 'Project 1',
            createdBy: 'Jane',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }, {
            name: 'Project 1',
            createdBy: 'Cyril',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }, {
            name: 'Project 1',
            createdBy: 'Jack',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }, {
            name: 'Project 1',
            createdBy: 'Will',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }]

        function deleteProject() {
            console.log('delete');
        }

        function showProject() {
            $state.go('triangular.projects.detail', {
                id: 123
            });
        }

        function selectProject() {
            console.log('select');
        }

        function navigateToProjects() {
            $state.go('triangular.organizations.detail.projects', {
                id: 123
            });
        }
    }
})();
