(function() {
    'use strict';

    angular
        .module('app.projects')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        triMenuProvider.addMenu({
            name: 'Projects',
            icon: 'fa fa-tree',
            state: 'triangular.organizations.detail.projects',
            type: 'link',

            priority: 1.1
        });

        $stateProvider
            .state('triangular.organizations.detail.projects', {
                url: '/projects',
                views: {
                    '@triangular': {
                        templateUrl: 'app/projects/projects-list.tmpl.html',
                        controller: 'projectsController',
                        controllerAs: 'vm'
                    },
                    'toolbar@triangular': {
                        templateUrl: 'app/projects/layout/toolbar/toolbar.tmpl.html',
                        controller: 'projectsToolbarController',
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
