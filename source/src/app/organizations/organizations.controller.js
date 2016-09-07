 
    (function() {
    'use strict';

    angular
        .module('app.organizations')
        .controller('organizationsController', organizationsController);

    /* @ngInject */
    function organizationsController($state, $mdSidenav,triBreadcrumbsService, organizationService, $scope, $element, $myElementInkRipple) {
        var vm = this;
        // vm.members = members.data.splice(0, 5);
        vm.navigateToDetail = navigateToDetail;
        vm.showMembers = showMembers;
        vm.selectMember = selectMember;
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({ name: 'Organizations' })
    
        init();
        console.log($state.current);
        function init() {

            organizationService.getOrgList().then(function(data){
               vm.orgList=data;
               vm.orgList=data;
            });
        }

        function showMembers(componentId) {
            $mdSidenav(componentId)
                .open()
                .then(function() {

                });
        }

        function navigateToDetail(id) {
            $state.go('triangular.organizations.detail', {
                id: id,
                
            });
        }

        function selectMember(ev) {
            $myElementInkRipple.attach($scope, angular.element(ev.target));
        }

    }

})();
