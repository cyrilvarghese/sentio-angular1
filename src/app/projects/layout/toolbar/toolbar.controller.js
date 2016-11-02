(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsToolbarController', projectsToolbarController);

    /* @ngInject */
    function projectsToolbarController($rootScope,organizationService,navigationService, $stateParams, projectService, $mdMedia, $filter, Upload, $mdUtil, $mdSidenav, $state, triBreadcrumbsService, triLayout) {
        var vm = this;
        vm.breadcrumbs = ['Projects'];

        vm.hideMenuButton = hideMenuButton;
        vm.navigateToProjects = navigateToProjects;
        vm.openSideNav = openSideNav;
        vm.logOut = logOut;
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        vm.currentUser = {
            displayName: userInfo.name,
            username: userInfo.email,
            avatar: userInfo.image,
            roles: userInfo.roles
        }
        vm.toolbarMenu = [];
        $rootScope.$on('updateBreadcrumbs', function(event, args) {
            vm.breadcrumbs = args;
        });
        $rootScope.$on('updateOrg', function(event, args) {
            vm.selectedOrg = args;
        });
        init();
        vm.changeOrg = changeOrg;

        function init() {
            organizationService.getOrgListUnparsed().then(function(data) {
                vm.orgList = data;

            });
        }

        function changeOrg(org) {
             navigationService.navigateToProjects(org, org.org_id);

        }

        function hideMenuButton() {
            return triLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-sm');
        }

        function logOut() {
            localStorage.clear();
            $state.go('authentication.login');
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
