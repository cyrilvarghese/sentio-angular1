(function() {
    'use strict';

    angular
        .module('app.billing')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        triMenuProvider.addMenu({
            name: 'Billing',
            icon: 'fa fa-dollar',
            state: 'triangular.organizations.detail.billing',
            type: 'link',
            id: 'billing',
            priority: 5
        });



        $stateProvider
            .state('triangular.organizations.detail.billing', {
                url: '/billing?subscriptionCreated&cardUpdated&accountExpired',
                templateUrl: 'app/billing/billing-disabled.tmpl.html',
                controller: 'billingController',
                controllerAs: 'vm',
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    },
                    
                },



            }).state('triangular.organizations.detail.billing.change', {
                url: '/change-plan?currentPlanId=',
                templateUrl: 'app/billing/change-plan.tmpl.html',
                controller: 'changePlanController',
                controllerAs: 'vm',

                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }


            })

    }
})();
