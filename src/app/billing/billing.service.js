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
            getInvoicesList: getInvoicesList,
            getSubscriptionDetails: getSubscriptionDetails
        };

        return service;


        function getCurrentOrganization() {

        }




        function getPlanList(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.sharedUrl + 'plans?' + $.param(paramObj),
                // url: 'http://127.0.0.1:9000/plans?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                response.data.plans = _.map(response.data.plans, function(value, key) {
                    if (key === 0) {
                        value.color = "light-blue:600";
                    } else if (key === 1) {
                        value.color = "light-blue:700";

                    } else if (key === 2) {
                        value.color = "light-blue:900";

                    }
                    return value;
                })
                dfd.resolve(response.data.plans);
            }, utilService.handleError);

            return dfd.promise;
        }


        function getSubscriptionDetails(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'subscription_details?' + $.param(paramObj),
                // url:  'http://127.0.0.1:9000/subscription_details?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data.plan);
            }, utilService.handleError);

            return dfd.promise;
        }

        function cancelSubscription(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'subscription_cancel?' + $.param(paramObj),
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
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'invoices?' + $.param(paramObj),
                // url: 'http://127.0.0.1:9000/invoices?' + $.param(paramObj),
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
