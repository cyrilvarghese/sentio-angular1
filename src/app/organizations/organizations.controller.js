 (function() {
     'use strict';

     angular
         .module('app.organizations')
         .controller('organizationsController', organizationsController);

     /* @ngInject */
     function organizationsController($state, triLayout,$rootScope, $mdSidenav, triBreadcrumbsService, organizationService, $scope, $element, $myElementInkRipple) {
         var vm = this;
        if(!localStorage.getItem('userInfo')){
            $state.go('authentication.login');
            return;
        }

         vm.navigateToDetail = navigateToDetail;
         vm.showMembers = showMembers;
         vm.selectMember = selectMember;
         vm.navigateToProjects = navigateToProjects;
         triBreadcrumbsService.reset();
         triBreadcrumbsService.addCrumb({ name: 'Organizations' })

         init();
         console.log($state.current);

         function init() {

             organizationService.getOrgList().then(function(data) {
                 vm.orgList = data;
        
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
                 id: id
             });
         }

         function navigateToProjects(org, id) {

            
             // $rootScope.accountExpired=true;
             $state.go('triangular.organizations.detail.projects',{
                 id: id
             });
         }

         function selectMember(ev) {
             $myElementInkRipple.attach($scope, angular.element(ev.target));
         }

     }

 })();
