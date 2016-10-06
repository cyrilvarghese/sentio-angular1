(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('changePlanController', changePlanController);

    /* @ngInject */
    function changePlanController($mdSidenav, $rootScope, $state, $timeout, $stateParams, billingService, $scope, triLoaderService, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;

        vm.token=localStorage.getItem('apiToken')||0;
        // triLoaderService.setLoaderActive(true);
        $rootScope.$broadcast('updateBreadcrumbs', 'Change Billing Plan');

        // vm.projects = $stateParams.projects;
        init();
        vm.navigateToPlanChange = navigateToPlanChange;

        function navigateToPlanChange() {
            $state.go('triangular.organizations.detail.billing.change');
        }

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

            };

           
            billingService.getPlanList(paramObj).then(function(data) {
                vm.plans = data;
                // triLoaderService.setLoaderActive(false);
            });
        }

        vm.goToSummary = function goToSummary(selectedPlan) {
            angular.element('#payment-btn').click();
            vm.selectedPlan = selectedPlan;
        }

        vm.proceeedToPay = function proceeedToPay(selectedPlan) {
            angular.element('#payment-btn button').click();
        }




    }
})();
