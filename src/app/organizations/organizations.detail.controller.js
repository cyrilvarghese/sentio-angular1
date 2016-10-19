(function() {
    'use strict';

    angular
        .module('app.organizations')
        .controller('organizationsDetailController', organizationsDetailController);

    /* @ngInject */
    function organizationsDetailController($mdSidenav, triLayout, $timeout, $scope, $rootScope, toastService, userService, triBreadcrumbsService, organizationService, $state, $stateParams) {
        var vm = this;
        vm.id = parseInt($stateParams.id, 10) || 0;
        vm.navigateToProjects = navigateToProjects;
        vm.showMembers = showMembers;
        vm.updateOrCreate = updateOrCreate;
        vm.leaveOrg = leaveOrg;
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Organizations' })
        init();

        function init() {

            if (userService.getCurrentUser().roles[0] !== 'admin' && vm.id !== 0) {
                toastService.show('You are not authorized to make any changes in this view');
                vm.disableForm = true;
            }
            if (vm.id !== 0) {
                var paramObj = {
                    'api_token': localStorage.getItem('apiToken'),
                    id: organizationService.getCurrentOrganization().org_id
                };
                organizationService.getOrg(paramObj).then(function(data) {
                    vm.selectedOrg = data;
                    vm.members = data.members;
                    // setBreadCrumbs();
                });
            }
            if (vm.id === 0) {
                triLayout.setOption('sideMenuSize', 'off');
                $rootScope.$emit('updateBreadcrumbs', 'Spaces > Add New Orgnisation');
            }

            
        }

        function updateOrCreate() {
            var paramObj = {
                'name': vm.selectedOrg.name,
                'id': vm.id,
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
            var paramObj = {
                org_id: vm.selectedOrg.org_id,
                'api_token': localStorage.getItem('apiToken')
            }
            userService.leaveOrg(paramObj);
        }

        function selectProject() {
            console.log('select');
        }

        function navigateToProjects() {
            $state.go('triangular.organizations.detail.projects', {
                id: vm.selectedOrg.org_id,
                projects: vm.selectedOrg.projects
            });
        }

        function showMembers(componentId) {
            $mdSidenav(componentId)
                .open()
                .then(function() {

                });
        }

        function setBreadCrumbs() {
            triBreadcrumbsService.reset();
            triBreadcrumbsService.addCrumb({ name: vm.selectedOrg.name, url: '#/organizations/' + vm.id })
            triBreadcrumbsService.addCrumb({ name: 'Organizations', url: '#/organizations' })

        }
    }
})();
