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
                controller: 'spacesController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    members: function($http, API_CONFIG) {
                        return $http({
                            method: 'GET',
                            url: API_CONFIG.url + 'email/inbox' /*sample data*/
                        });
                    }
                },
                params: {
                    spaceList: null
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
