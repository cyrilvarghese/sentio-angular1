 (function() {
     'use strict';

     angular
         .module('app.services')
         .factory('utilService', utilService);

     /* @ngInject */
     function utilService($q, $http, RoleStore, toastService, API_CONFIG) {

         var service = {
             handleError: handleError,
             getHeaders: getHeaders
         };

         return service;



         function handleError(resp) {
             console.log(resp.data.message);
             if (resp.data.message) {
                 toastService.show(resp.data.message);
             } else {
                 toastService.show("Unable to complete action, please contact support.");

             }

         }

         function getHeaders() {
             return {
                 'Content-Type': 'application/json',
                 // 'X-CSRF-TOKEN': localStorage.getItem('csrf'),
                 'Accept': 'application/json',
                 'api-key': '7nZOLvhjP21/XqzuQCb0uylmBnbAtcPMil+6momlp5E='

             }
         }
     }
 })();
 // cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
