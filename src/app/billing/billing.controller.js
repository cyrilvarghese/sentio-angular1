(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('billingController', billingController);

    /* @ngInject */
    function billingController($mdSidenav, $state, $timeout, $stateParams, $mdDialog, billingService, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;

        // vm.projects = $stateParams.projects;
        init();
        vm.navigateToPlanChange = navigateToPlanChange;
        vm.removePlan = removePlan;
  vm.orgId = $stateParams.id;
        vm.token = localStorage.getItem('apiToken') || 0;
     
        function navigateToPlanChange() {
            $state.go('triangular.organizations.detail.billing.change', {
                currentPlanId: vm.plan.plan_id,
            });
        }

        function init() {

            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),

            };
            billingService.getSubscriptionDetails(paramObj).then(function(data) {
                vm.plan = data;
            });
            billingService.getInvoicesList(paramObj).then(function(data) {
                vm.invoices = data;
            });

            if ($stateParams.subscriptionCreated && $state.current.name === "triangular.organizations.detail.billing") {
                openDialog($stateParams.subscriptionCreated === "1")
            }

        }


        function removePlan(plan) {
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'plan_id': vm.plan.id
            };
            billingService.cancelSubscription(paramObj);
        }

        function openDialog(success) {
            if (success) {
                $mdDialog.show({
                    controller: 'statusDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/billing/dialogs/status-dialog.tmpl.html',
                    clickOutsideToClose: true,
                    focusOnOpen: false,
                    locals: {
                        title: "Transaction Success",
                        color: "green:500",
                        message: "Thankyou we have received the payment and have successfully updated your plan."
                    },
                    fullscreen: true,
                });
            } else {
                $mdDialog.show({
                    controller: 'statusDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/billing/dialogs/status-dialog.tmpl.html',
                    clickOutsideToClose: true,
                    focusOnOpen: false,
                    locals: {
                        title: "Transaction Failed",
                        color: "red:500",
                        message: "We were unable to procees the pament and  update your plan.Please contact support."
                    },
                    fullscreen: true,
                });
            }
        }


    }
})();
