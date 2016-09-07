(function() {
    'use strict';

    angular
        .module('app.spaces')
        .controller('spacesToolbarController', spacesToolbarController);

    /* @ngInject */
    function spacesToolbarController($rootScope, $mdMedia, $filter, Upload,$mdUtil, $mdSidenav, $state, triBreadcrumbsService, triLayout) {
        var vm = this;
        vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        vm.filterEmailList = filterEmailList;
        vm.hideMenuButton = hideMenuButton;
        vm.openSideNav = openSideNav;
        vm.showSearch = false;
        vm.toggleSearch = toggleSearch;
        vm.toolbarMenu = [];
 

        /////////////////
        function upload(){

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
            $mdUtil.debounce(function(){
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
