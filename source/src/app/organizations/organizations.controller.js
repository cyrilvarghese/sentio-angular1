 (function() {
     'use strict';

     angular
         .module('app.organizations')
         .controller('organizationsController', organizationsController);

     /* @ngInject */
     function organizationsController($state, triLayout, $mdSidenav, triBreadcrumbsService, organizationService, $scope, $element, $myElementInkRipple) {
         var vm = this;


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
             $state.go('triangular.organizations.detail.projects',{
                 id: id
             });
         }

         function selectMember(ev) {
             $myElementInkRipple.attach($scope, angular.element(ev.target));
         }

     }

 })();
