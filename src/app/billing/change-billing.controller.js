(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('changePlanController', changePlanController);

    /* @ngInject */
    function changePlanController($mdSidenav, $rootScope, $state, $timeout, $stateParams, billingService, $scope, triLoaderService, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;
        if (localStorage.getItem('currentOrg')) {
            vm.currentPlan= JSON.parse(localStorage.getItem('currentOrg')).plan;
            vm.currentPlanId = vm.currentPlan.plan_id;
        } else {
            vm.currentPlanId = 0;
        }
        vm.orgId = $stateParams.id;
        vm.token = localStorage.getItem('apiToken') || 0;
        // triLoaderService.setLoaderActive(true);
        $rootScope.$broadcast('updateBreadcrumbs', 'Change Billing Plan');

        // vm.projects = $stateParams.projects;
        init();
        vm.navigateToPlanChange = navigateToPlanChange;

        function navigateToPlanChange() {
            $state.go('triangular.organizations.detail.billing.change');
        }

        function init() {
         
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
        vm.changePlan = function changePlan(selectedPlan) {
               var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'plan_id':selectedPlan.id

            };
            billingService.changePlan(paramObj).then(function(data) {
                vm.plans = data;
                // triLoaderService.setLoaderActive(false);
            });
        }





    }
})();
