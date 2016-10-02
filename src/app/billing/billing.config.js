(function() {
    'use strict';

    angular
        .module('app.billing')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        triMenuProvider.addMenu({
            name: 'Billing',
            icon: 'fa fa-list',
            state: 'triangular.organizations.detail.billing',
            type: 'link',
            id: 'billing',
            priority: 5
        });



        $stateProvider
            .state('triangular.organizations.detail.billing', {
                url: '/billing',
                templateUrl: 'app/billing/billing.tmpl.html',
                controller: 'billingController',
                controllerAs: 'vm',
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }


            }).state('triangular.organizations.detail.billing.change', {
                url: '/change-plan',
                templateUrl: 'app/billing/change-plan.tmpl.html',
                controller: 'billingController',
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
