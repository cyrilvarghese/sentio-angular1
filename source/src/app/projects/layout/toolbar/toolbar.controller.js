(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsToolbarController', projectsToolbarController);

    /* @ngInject */
    function projectsToolbarController($rootScope, $stateParams, projectService, $mdMedia, $filter, Upload, $mdUtil, $mdSidenav, $state, triBreadcrumbsService, triLayout) {
        var vm = this;
        vm.breadcrumbs = ['Projects'];

        vm.hideMenuButton = hideMenuButton;
        vm.navigateToProjects = navigateToProjects;
        vm.openSideNav = openSideNav;
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        vm.currentUser = {
            displayName: userInfo.name,
            username: userInfo.email,
            avatar: 'assets/images/avatars/avatar-5.png',
            roles: ['admin']
        }
        vm.toolbarMenu = [];

        function hideMenuButton() {
            return triLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-sm');
        }

        function navigateToProjects() {
            $state.go('triangular.organizations.detail.projects');
        }
        /**
         * Build handler to open/close a SideNav;
         */
        function openSideNav(navID) {
            $mdUtil.debounce(function() {
                $mdSidenav(navID).toggle();
            }, 300)();
        }


        // init

        // for (var i = 0; i < EMAIL_ROUTES.length; i++) {
        //     vm.toolbarMenu.push({
        //         name: $filter('triTranslate')(EMAIL_ROUTES[i].name),
        //         state: EMAIL_ROUTES[i].state,
        //         icon: EMAIL_ROUTES[i].icon
        //     });
        // }
    }
})();
