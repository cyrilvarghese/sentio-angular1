(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('organizationService', organizationService);

    /* @ngInject */
    function organizationService($q, $http, RoleStore, $state, toastService, API_CONFIG, utilService) {

        var service = {
            getCurrentOrganization: getCurrentOrganization,
            setCurrentOrganization: setCurrentOrganization,
            getOrgList: getOrgList,
            getOrg: getOrg,
            createOrganization: createOrganization,
            updateOrganization: updateOrganization

        };

        return service;

        function getCurrentOrganization() {
            if (localStorage.getItem('currentOrg')) {
                return JSON.parse(localStorage.getItem('currentOrg')) || {};
            } else {
                return {};
            }
        }

        function setCurrentOrganization(org) {
            localStorage.setItem('currentOrg', JSON.stringify(org));
        }

        function getOrgList() {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'org_list?' + $.param({ 'api_token': localStorage.getItem('apiToken') }),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                var parsedData = _.groupBy(response.data.org_list, function(org) {
                    return org.role;
                })
                dfd.resolve(parsedData);
            }, utilService.handleError);

            return dfd.promise;
        }

        function getOrg(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.organizationsUrl + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);

            }, utilService.handleError);

            return dfd.promise;
        }

        function createOrganization(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.organizationsUrl + 'create?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                // currentUser = user;
                toastService.show('organisation created successfully');
                dfd.resolve();
                navigateToList();
            }, utilService.handleError);

            return dfd.promise;

        }

        function updateOrganization(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.organizationsUrl + 'edit/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                navigateToList();
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;

        }


        function navigateToList() {
            $state.go('triangular.organizations', {}, { reload: true })

        }
    }

})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
