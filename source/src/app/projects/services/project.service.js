(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('projectService', projectService);

    /* @ngInject */
    function projectService($q, $http, RoleStore, toastService, API_CONFIG, utilService) {

        var service = {
            
            getProjectList: getProjectList,
            getProject: getProject,
            createProject: createProject,
            updateProject: updateProject,
            deleteProject: deleteProject,
            leaveProject: leaveProject
        };

        return service;

        function getCurrentOrganization() {

        }

        function getOrgList() {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'org_list?' + $.param({ 'api_token': localStorage.getItem('apiToken') }),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                var parsedData = _.groupBy(response.data, function(org) {
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
                toastService.show('Organisation updated successfully');
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;

        }

        function leaveOrganization() {

        }

    }
})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
