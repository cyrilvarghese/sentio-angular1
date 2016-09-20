(function() {
    'use strict';

    angular
        .module('app.organizations')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        // triMenuProvider.addMenu({
        //     name: 'Organizations',
        //     icon: 'fa fa-th-list',
        //     state: 'triangular.organizations',
        //     type: 'link',

        //     priority: 1.1
        // });

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

                templateUrl: 'app/organizations/organizations-detail.tmpl.html',
                controller: 'organizationsDetailController',
                controllerAs: 'vm',

                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            });


    }
})();
