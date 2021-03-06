(function() {
    'use strict';

    angular
        .module('app.organizations')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        triMenuProvider.addMenu({
            name: 'Account info',
            icon: 'fa fa-info',
            state: 'triangular.organizations.detail',
            type: 'link',
            id: 'account',

            priority: 2
        });


        $stateProvider
            .state('triangular.organizations', {
                url: '/organizations',
                templateUrl: 'app/organizations/organizations-list.tmpl.html',
                // set the controller to load for this page
                controller: 'organizationsController',
                controllerAs: 'vm',
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }

            }).state('triangular.organizations.detail', {
                url: '/:id',

                // set the controller to load for this page

                // layout-column class added to make footer move to
                // bottom of the page on short pages

                controllerAs: 'vm',
                views: {
                    'toolbar@triangular': {
                        templateUrl: 'app/organizations/layout/toolbar/toolbar.tmpl.html',
                        controller: 'organizationsDetailToolbarController',
                        controllerAs: 'vm'
                    },
                    '@triangular': {
                        templateUrl: 'app/organizations/organizations-detail.tmpl.html',
                        controller: 'organizationsDetailController',
                        controllerAs: 'vm'
                    }
                },

                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            });


    }
})();
