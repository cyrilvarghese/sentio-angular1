(function() {
    'use strict';

    angular
        .module('app.billing')
        .factory('billingService', billingService);

    /* @ngInject */
    function billingService($q, $http, RoleStore, Upload, toastService, API_CONFIG, $state, utilService) {

        var service = {

            getPlanList: getPlanList,
            cancelSubscription: cancelSubscription,
            getInvoicesList:getInvoicesList,
            getSubscriptionDetails:getSubscriptionDetails
        };

        return service;


        function getCurrentOrganization() {

        }




        function getPlanList(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                // url: API_CONFIG.baseUrl + API_CONFIG.sharedUrl + '/plans?' + $.param(paramObj),
                url: '/plans?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
               dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }


        function getSubscriptionDetails(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                // url: API_CONFIG.baseUrl + API_CONFIG.userUrl + '/subscription_details?' + $.param(paramObj),
                url:  '/subscription_details?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
               dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }

        function cancelSubscription(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.userUrl + '/subscription_cancel?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
               dfd.resolve(response.data);
            }, utilService.handleError);


            return dfd.promise;
        }

        function getInvoicesList(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                // url: API_CONFIG.baseUrl + API_CONFIG.userUrl + '/invoices?' + $.param(paramObj),
                url: '/invoices?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
               dfd.resolve(response.data.invoices);
            }, utilService.handleError);

            return dfd.promise;
        }


    }
})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
