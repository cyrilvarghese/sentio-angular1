(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('changePlanController', changePlanController);

    /* @ngInject */
    function changePlanController($mdSidenav, $rootScope, $state, $timeout, $stateParams, billingService, $scope, triLoaderService, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;

        vm.currentPlan = organizationService.getCurrentOrganization().plan;
        vm.currentPlanId = vm.currentPlan.plan_id || 0;

        vm.orgId = $stateParams.id;
        vm.accountExpired = $stateParams.accountExpired ? parseInt($stateParams.accountExpired, 10) : 0;
        vm.token = localStorage.getItem('apiToken') || 0;
        $rootScope.$broadcast('updateBreadcrumbs', 'Change Billing Plan');

        init();
        vm.navigateToPlanChange = navigateToPlanChange;

        function navigateToPlanChange() {
            $state.go('triangular.organizations.detail.billing.change');
        }

        function init() {
            vm.btnName = "Change";
            if (vm.accountExpired === 1) {
                vm.btnName = "Renew selected"
            }

            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),

            };
            billingService.getPlanList(paramObj).then(function(data) {
                vm.plans = data;
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
                'plan_id': selectedPlan.id

            };
            billingService.changePlan(paramObj).then(function(data) {
                vm.plans = data;
            });
        }





    }
})();
