(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('changePlanController', changePlanController);

    /* @ngInject */
    function changePlanController($mdSidenav, $rootScope, $state, utilService, userService, API_CONFIG,$timeout, $stateParams, billingService, $scope, triLoaderService, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;

        // vm.currentPlan = organizationService.getCurrentOrganization().plan;
        vm.baseUrl = API_CONFIG.baseUrl;
        vm.stripeKey = API_CONFIG.stripeKey;
        vm.stripeURL = API_CONFIG.stripeURL;
        vm.currentPlanId = organizationService.getCurrentOrganization().plan.plan_id || 0;
        vm.currentPlanName = organizationService.getCurrentOrganization().plan.plan_name || "trial";
        vm.paymentAllowed = userService.getCurrentUser().verified === 1;
        vm.userId = userService.getCurrentUser().user_id;
        vm.userEmail=userService.getCurrentUser().email;
        vm.orgId = $stateParams.id;
        vm.accountExpired = $stateParams.accountExpired ? parseInt($stateParams.accountExpired, 10) : 0;
        vm.token = localStorage.getItem('apiToken') || 0;
        $rootScope.$broadcast('updateBreadcrumbs', 'Change Billing Plan');

        init();
        vm.navigateToPlanChange = navigateToPlanChange;
        vm.resendEmail = resendEmail;

        function navigateToPlanChange() {
            $state.go('triangular.organizations.detail.billing.change');
        }

        function init() {
            vm.btnName = "Confirm";
            if (vm.accountExpired === 1) {
                vm.btnName = "Renew selected"
            }
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'id': vm.orgId

            };
            organizationService.getOrgStats(paramObj).then(function(data) {
                vm.currentPlan = data.max_stats;
                var paramObj = {
                    'api_token': localStorage.getItem('apiToken'),

                };
                billingService.getPlanList(paramObj).then(function(data) {
                    vm.plans = data;
                });
            })

        }

        function resendEmail() {
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'id': vm.userId

            };
            return userService.resendVerificationEmail(paramObj);

        }

        vm.goToSummary = function goToSummary(selectedPlan) {
            if (isValidPlan(selectedPlan)) {
                angular.element('#payment-btn').click();
                vm.selectedPlan = selectedPlan;
            } else {
                utilService.messageDialog("Plan Invalid", "You have more projects/spaces/members created than the limit of the selected plan.Please remove projects/spaces/members and retry.", false)
            }
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

        function isValidPlan(selectedPlan) {

            return !(selectedPlan.num_projects < vm.currentPlan.project ||
                selectedPlan.num_spaces < vm.currentPlan.space ||
                selectedPlan.num_members < vm.currentPlan.member)

        }





    }
})();
