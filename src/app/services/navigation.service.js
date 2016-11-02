 (function() {
     'use strict';

     angular
         .module('app.services')
         .factory('navigationService', navigationService);

     /* @ngInject */
     function navigationService($q, $http, RoleStore, $state,userService, toastService, API_CONFIG, $mdDialog) {
         var service = {
             navigateToProjects: navigateToProjects
         }
         return service;


         function navigateToProjects(org, id) {
             userService.setRole([org.role]);

             if (_.isEmpty(org.plan)) {
                 localStorage.setItem("accountExpired", true);
                 $state.go('triangular.organizations.detail.billing', {
                     id: id
                 });
             } else {
                 localStorage.setItem("accountExpired", false);

                 $state.go('triangular.organizations.detail.projects', {
                     id: id,
                     role: org.role
                 });
             }
         }
     }
 })();
