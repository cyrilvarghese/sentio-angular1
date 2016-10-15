 (function() {
     'use strict';

     angular
         .module('app.services')
         .factory('utilService', utilService);

     /* @ngInject */
     function utilService($q, $http, RoleStore, $state, toastService, API_CONFIG, $mdDialog) {

         var service = {
             handleError: handleError,
             getHeaders: getHeaders,
             messageDialog: messageDialog,
             confirmDialog: confirmDialog,
             limitExceededDialog: limitExceededDialog
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

         function limitExceededDialog(type) {

             var confirm = $mdDialog.confirm()
                 .title('Account Limit Exceeded!')
                 .textContent('You have exceeded the allowed number of ' + type + ', click proceed to change plan.')
                 .ariaLabel('renew')
                 .ok('Proceed')
                 .cancel('Go to Billing');

             $mdDialog.show(confirm).then(function() {
                 navigateToPlanChange();
             }, function() {
                 navigateToBilling();
                 // $scope.status = 'You decided to keep your debt.';
             });
         }

         function messageDialog(title, message, status) {
             $mdDialog.show({
                 controller: 'statusDialogController',
                 controllerAs: 'vm',
                 templateUrl: 'app/billing/dialogs/status-dialog.tmpl.html',
                 clickOutsideToClose: true,
                 focusOnOpen: false,
                 locals: {
                     title: title,
                     color: status ? "green:500" : "red:500",
                     message: message
                 },
                 fullscreen: true,
             });
         }

         function confirmDialog(title, message, action1Text, action2Text, action1, action2) {

             var confirm = $mdDialog.confirm()
                 .title(title)
                 .textContent(message)
                 .ariaLabel(title)
                 .ok(action1Text)
                 .cancel(action2Text);

             $mdDialog.show(confirm).then(function() {
                 action1().then(function() {
                     $mdDialog.hide();
                 });
             }, function() {
                 if (action2)
                     action2();
                 // $scope.status = 'You decided to keep your debt.';
             });
         }

         function navigateToPlanChange() {
             $state.go('triangular.organizations.detail.billing.change');
         }

         function navigateToBilling() {
             $state.go('triangular.organizations.detail.billing');
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
