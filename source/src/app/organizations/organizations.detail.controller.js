(function() {
    'use strict';

    angular
        .module('app.organizations')
        .controller('organizationsDetailController', organizationsDetailController);

    /* @ngInject */
    function organizationsDetailController($mdSidenav, userService,organizationService, $state, $stateParams, members) {
        var vm = this;
       
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
        
        function selectProject() {
            console.log('select');
        }

        function navigateToProjects() {
            $state.go('triangular.organizations.detail.projects', {
                id: 123,
                projects:vm.selectedOrg.projects
            });
        }
    }
})();
