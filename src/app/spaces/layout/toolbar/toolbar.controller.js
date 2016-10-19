(function() {
    'use strict';

    angular
        .module('app.spaces')
        .controller('spacesToolbarController', spacesToolbarController);

    /* @ngInject */
    function spacesToolbarController($rootScope, $stateParams, $mdMedia, $filter, Upload, $mdUtil, $mdSidenav, $state, triBreadcrumbsService, triLayout) {
        var vm = this;
        // vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        vm.filterEmailList = filterEmailList;
        vm.hideMenuButton = hideMenuButton;
        vm.openSideNav = openSideNav;
        vm.showSearch = false;
        vm.toggleSearch = toggleSearch;
        vm.toolbarMenu = [];
        vm.logOut = logOut;
        vm.goTo = goTo;
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        $rootScope.$on('updateBreadcrumbs', function(event, args) {
            vm.breadcrumbs = args;
        });

        vm.currentUser = {
            displayName: userInfo.name,
            username: userInfo.email,
            avatar: userInfo.image,
            roles: userInfo.roles
        }
        vm.toolbarMenu = [];

        function goTo(state) {
            $state.go(state);
        }

        function logOut() {
            localStorage.clear();
            $state.go('authentication.login');
        }
        /////////////////
        function upload() {

        }

        function filterEmailList(emailSearch) {
            $rootScope.$broadcast('emailSearch', emailSearch);
        }

        function toggleSearch() {
            vm.showSearch = !vm.showSearch;
        }

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

        // for(var i = 0; i < EMAIL_ROUTES.length; i++) {
        //     vm.toolbarMenu.push({
        //         name: $filter('triTranslate')(EMAIL_ROUTES[i].name),
        //         state: EMAIL_ROUTES[i].state,
        //         icon: EMAIL_ROUTES[i].icon
        //     });
        // }
    }
})();
