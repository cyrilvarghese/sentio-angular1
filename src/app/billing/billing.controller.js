(function() {
    'use strict';

    angular
        .module('app.billing')
        .controller('billingController', billingController);

    /* @ngInject */
    function billingController($mdSidenav, $state, $timeout, $stateParams, billingService, organizationService, triBreadcrumbsService, projectService, toastService) {
        var vm = this;

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
            billingService.getSubscriptionDetails(paramObj).then(function(data) {
               vm.plan=data;
            });
             billingService.getInvoicesList(paramObj).then(function(data) {
               vm.invoices=data;
            });
       
        }




    }
})();
