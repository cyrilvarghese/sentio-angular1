(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('billingController', billingController);

    /* @ngInject */
    function billingController($mdSidenav, $state, $timeout, utilService, userService, $stateParams, $mdDialog, billingService, $q, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;
        vm.btnName = "Change"; /*initially set to change plan/set to renew plan for expired*/
        vm.projects = $stateParams.projects;
        init();
        vm.navigateToPlanChange = navigateToPlanChange;
        vm.removePlan = removePlan;
        vm.orgId = $stateParams.id;
        vm.token = localStorage.getItem('apiToken') || 0;
        vm.user = userService.getCurrentUser();

        vm.accountExpired = $stateParams.accountExpired ? parseInt($stateParams.accountExpired, 10) : 0;


        function navigateToPlanChange() {
            $state.go('triangular.organizations.detail.billing.change');
        }

        function init() {
            getOrg().then(function() {

                if ($stateParams.subscriptionCreated && $state.current.name === "triangular.organizations.detail.billing") {

                    openDialog($stateParams.subscriptionCreated === "1", "payment");

                } else if ($stateParams.cardUpdated) {
                    openDialog($stateParams.cardUpdated === "1", "card");
                } else if ($stateParams.accountExpired) {
                    expiryDialog();
                }

            });
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'org_id':  $stateParams.id

            };
            billingService.getSubscriptionDetails(paramObj).then(function(data) {
                vm.plan = data.plan;
                vm.currentCard = data.current_card;
                vm.statusMessage = data.state.desc;
            });
            billingService.getInvoicesList(paramObj).then(function(data) {
                vm.invoices = data;
            });


        }


        function removePlan(plan) {
            var paramObj = {
                'api_token': localStorage.getItem('apiToken'),
                'plan_id': vm.plan.plan_id
            };
            billingService.cancelSubscription(paramObj);
        }

        function expiryDialog() {

            utilService.customConfirmDialog('Account Expired!', 'The account for this organization has expired, click renew plan to proceed or contact the organisation administrator.', false, "Proceed To Renew", "cancel", navigateToPlanChange, null);
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
                userService.setRole([vm.selectedOrg.role]);

                vm.showLoader = false;
                dfd.resolve();
            });
            return dfd.promise;
        }

        function openDialog(success, type) {
            vm.showLoader = true;
            getOrg().then(function() {
                var title, color, message = "";
                if (type === "payment") {
                    if (success) {

                        title = "Transaction Success";
                        color = "green:500";
                        message = "Thankyou we have received the payment and have successfully updated your plan.";

                    } else {

                        title = "Transaction Failed";
                        color = "red:500";
                        message = "We were unable to procees the pament and  update your plan.Please contact support.";
                    }
                } else if (type === 'card') {

                    if (success) {
                        title = "Card Update Success";
                        color = "green:500";
                        message = "We could successfully update your card."
                    } else {
                        title = "Card Update Failed";
                        color = "red:500";
                        message = "We could not update your card.Please retry later.";
                    }


                }
                utilService.messageDialog(title, message, success);
            });

        }


    }
})();
