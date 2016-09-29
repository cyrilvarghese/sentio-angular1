(function() {
    'use strict';

    angular
        .module('app.spaces')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        $stateProvider
            .state('triangular.organizations.detail.projects.detail.spaces', {
                url: '/spaces?selectedTabIndex=',

                views: {
                    '@triangular': {
                        templateUrl: 'app/spaces/spaces-list.tmpl.html',
                        controller: 'spacesController',
                        controllerAs: 'vm'
                    },
                    'toolbar@triangular': {
                        templateUrl: 'app/spaces/layout/toolbar/toolbar.tmpl.html',
                        controller: 'spacesToolbarController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            }).state('triangular.organizations.detail.projects.detail.spaces.detail', {
                url: '/:spaceId',
                templateUrl: 'app/spaces/spaces-detail.tmpl.html',
                controller: 'spacesDetailController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            })

    }
})();
