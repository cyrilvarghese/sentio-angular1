(function() {
    'use strict';

    angular
        .module('app.projects')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        $stateProvider
            .state('triangular.organizations.detail.projects', {
                url: '/projects',
                templateUrl: 'app/projects/projects-list.tmpl.html',
                // set the controller to load for this page
                controller: 'projectsController',
                controllerAs: 'vm',
                params: {
                    projects: null
                },
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }


            }).state('triangular.organizations.detail.projects.detail', {
                url: '/:projectId',
                templateUrl: 'app/projects/projects-detail.tmpl.html',
                controller: 'projectsDetailController',
                controllerAs: 'vm',
                params: {
                    selectedProject: null
                },
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            });


    }
})();
