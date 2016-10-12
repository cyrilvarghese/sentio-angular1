(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('billingController', billingController);

    /* @ngInject */
    function billingController($mdSidenav, $state, $timeout, $stateParams, $mdDialog, billingService, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;

        vm.projects = $stateParams.projects;
        init();
        vm.navigateToPlanChange = navigateToPlanChange;
        vm.removePlan = removePlan;
        vm.orgId = $stateParams.id;
        vm.token = localStorage.getItem('apiToken') || 0;
        vm.planId = organizationService.getCurrentOrganization.plan;


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
                vm.plan = data.plan;
                vm.currentCard = data.current_card;
                vm.statusMessage = data.state.desc;
            });
            billingService.getInvoicesList(paramObj).then(function(data) {
                vm.invoices = data;
            });

            if ($stateParams.subscriptionCreated && $state.current.name === "triangular.organizations.detail.billing") {
                openDialog($stateParams.subscriptionCreated === "1", "payment")
            } else if ($stateParams.cardUpdated) {
                openDialog($stateParams.cardUpdated === "1", "card")
            } else if ($stateParams.accountExpired) {
                // $mdDialog.show({
                //     controller: 'statusDialogController',
                //     controllerAs: 'vm',
                //     templateUrl: 'app/billing/dialogs/status-dialog.tmpl.html',
                //     clickOutsideToClose: true,
                //     focusOnOpen: false,
                //     locals: {
                //         title: "Account Expired!",
                //         color: "red:500",
                //         message: "Your account has expired.Please renew your subscription."
                //     },
                //     fullscreen: true,
                // });
                var confirm = $mdDialog.confirm()
                    .title('Account Expired!')
                    .textContent('Your account has expired,click proceed to renew plan.')
                    .ariaLabel('Lucky day')
                    .ok('Please do it!')
                    .cancel('Sounds like a scam');

                $mdDialog.show(confirm).then(function() {
                    $scope.status = 'You decided to get rid of your debt.';
                }, function() {
                    $scope.status = 'You decided to keep your debt.';
                });
            }


        }


        function removePlan(plan) {
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'plan_id': vm.plan.plan_id
            };
            billingService.cancelSubscription(paramObj);
        }

        function openDialog(success, type) {

            if (type === "payment")

            {
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
            } else {

                if (success) {
                    $mdDialog.show({
                        controller: 'statusDialogController',
                        controllerAs: 'vm',
                        templateUrl: 'app/billing/dialogs/status-dialog.tmpl.html',
                        clickOutsideToClose: true,
                        focusOnOpen: false,
                        locals: {
                            title: "Card Update Success",
                            color: "green:500",
                            message: "We could successfully update your card."
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
                            title: "Card Update Failed",
                            color: "red:500",
                            message: "We could not update your card.Please retry later."
                        },
                        fullscreen: true,
                    });
                }
            }
        }


    }
})();
