(function() {
    'use strict';

    angular
        .module('app.projects')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        triMenuProvider.addMenu({
            name: 'Projects',
            icon: 'fa fa-list',
            state: 'triangular.organizations.detail.projects',
            type: 'link',

            priority: 1.1
        });
         triMenuProvider.addMenu({
            name: 'FAQs',
            icon: 'fa fa-question',
            state: 'triangular.faq',
            type: 'link',

            priority: 1.5
        });
          triMenuProvider.addMenu({
            name: 'Profile',
            icon: 'fa fa-user',
            state: 'triangular.profile',
            type: 'link',

            priority: 1.4
        });
        //  triMenuProvider.addMenu({
        //     name: 'Current Project',
        //     icon: 'fa fa-list',
        //     state: 'triangular.organizations.detail.projects.detail',
        //     type: 'link',

        //     priority: 1.2
        // });
        triMenuProvider.addMenu({
            name: 'Billing Info',
            icon: 'fa fa-dollar',
            state: 'triangular.organizations.detail',
            type: 'link',

            priority: 1.3
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
