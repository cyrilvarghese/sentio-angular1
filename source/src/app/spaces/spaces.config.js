(function() {
    'use strict';

    angular
        .module('app.spaces')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        $stateProvider
            .state('triangular.organizations.detail.projects.detail.spaces', {
                url: '/spaces',
                templateUrl: 'app/spaces/spaces-list.tmpl.html',
                // set the controller to load for this page
                controller: 'spacesController',
                controllerAs: 'vm',
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    members: function($http, API_CONFIG) {
                        return $http({
                            method: 'GET',
                            url: API_CONFIG.url + 'email/inbox'/*sample data*/
                        });
                    }
                }

            }).state('triangular.organizations.detail.projects.detail.spaces.detail', {
                url: '/:id',

                // set the controller to load for this page

                // layout-column class added to make footer move to
                // bottom of the page on short pages
                views: {
                    'toolbar@triangular': {
                        templateUrl: 'app/examples/email/layout/toolbar/toolbar.tmpl.html',
                        controller: 'EmailToolbarController',
                        controllerAs: 'vm'
                    },
                    '@triangular': {
                        templateUrl: 'app/spaces/spaces-detail.tmpl.html',
                        controller: 'spacesDetailController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            }) 
      
    }
})();
