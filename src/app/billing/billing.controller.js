(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('billingController', billingController);

    /* @ngInject */
    function billingController($mdSidenav, $state, $timeout, $stateParams, $mdDialog, billingService,$q, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;
        vm.btnName = "Change"; /*initially set to change plan/set to renew plan for expired*/
        vm.projects = $stateParams.projects;
        init();
        vm.navigateToPlanChange = navigateToPlanChange;
        vm.removePlan = removePlan;
        vm.orgId = $stateParams.id;
        vm.token = localStorage.getItem('apiToken') || 0;

        vm.accountExpired = $stateParams.accountExpired ? parseInt($stateParams.accountExpired, 10) : 0;


        function navigateToPlanChange() {
            $state.go('triangular.organizations.detail.billing.change');
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

                openDialog($stateParams.subscriptionCreated === "1", "payment");

            } else if ($stateParams.cardUpdated) {
                openDialog($stateParams.cardUpdated === "1", "card");
            } else if ($stateParams.accountExpired) {
                expiryDialog();
            }


        }


        function removePlan(plan) {
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'plan_id': vm.plan.plan_id
            };
            billingService.cancelSubscription(paramObj);
        }

        function expiryDialog() {
            vm.btnName = "Renew"; /*initially set to change plan/set to renew plan for expired*/

            var confirm = $mdDialog.confirm()
                .title('Account Expired!')
                .textContent('Your account has expired,click proceed to renew plan.')
                .ariaLabel('renew')
                .ok('Proceed to renew')
                .cancel('cancel');

            $mdDialog.show(confirm).then(function() {
                vm.navigateToPlanChange();
            }, function() {
                // $scope.status = 'You decided to keep your debt.';
            });
        }

        function getOrg() { /*updating org*/
            var dfd = $q.defer();
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                id: $stateParams.id
            };
            organizationService.getOrg(paramObj).then(function(data) {
                vm.selectedOrg = data;
                organizationService.setCurrentOrganization(vm.selectedOrg);
                vm.showLoader = false;
                dfd.resolve();
            });
            return dfd.promise;
        }

        function openDialog(success, type) {
            vm.showLoader = true;
            getOrg().then(function() {
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
            });

        }


    }
})();
