(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectToolbarController', projectToolbarController);

    /* @ngInject */
    function projectToolbarController($rootScope, $stateParams,projectService,$mdMedia, $filter, Upload, $mdUtil, $mdSidenav, $state, triBreadcrumbsService, triLayout) {
        var vm = this;
        vm.breadcrumbs = ['Projects'];

        vm.hideMenuButton = hideMenuButton;
        vm.openSideNav = openSideNav;

        vm.toolbarMenu = [];
         function hideMenuButton() {
            return triLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-sm');
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
