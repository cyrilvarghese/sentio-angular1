(function() {
    'use strict';

    angular
        .module('app.billing')
        .factory('billingService', billingService);

    /* @ngInject */
    function billingService($q, $http, RoleStore, Upload, toastService, organizationService, API_CONFIG, $state, utilService) {

        var service = {

            getPlanList: getPlanList,
            cancelSubscription: cancelSubscription,
            getInvoicesList: getInvoicesList,
            getSubscriptionDetails: getSubscriptionDetails,
            changePlan: changePlan
        };

        return service;


        function changePlan(paramObj) {
            toastService.show("changing plan subscription...");
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.changePlan + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                // currentUser = user;
                toastService.show(response.data.message);

                dfd.resolve();
                $state.go('triangular.organizations.detail.billing', { subscriptionCreated: 1 }, { reload: true });

            }, function() {
                toastService.show(response.data.message);
                dfd.reject();
                $state.go('triangular.organizations.detail.billing', { subscriptionCreated: 0 }, { reload: true });

            });

            return dfd.promise;

        }




        function getPlanList(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.sharedUrl + 'plans?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                response.data.plans = _.map(response.data.plans, function(value, key) {
                    value.price_cents = value.price_usd * 100;
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
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }

        function cancelSubscription(paramObj) {
            toastService.show("cancelling subscription...");

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'subscription_cancel?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                $state.go($state.current, {}, { reload: true });

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
