(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('projectService', projectService);

    /* @ngInject */
    function projectService($q, $http, RoleStore, Upload, toastService, $state, API_CONFIG, utilService) {

        var service = {

            getProjectList: getProjectList,
            getProject: getProject,
            createProject: createProject,
            updateProject: updateProject,
            deleteProject: deleteProject,

            addMember: addMember,
            removeMember: removeMember,
            sendInvite: sendInvite
        };

        return service;

        function getCurrentOrganization() {

        }

        function getProjectList(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.organizationsUrl + paramObj.orgId + '/project_list?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {

                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }

        function getProject(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }


        function createProject(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + 'create?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                // currentUser = user;
                toastService.show(response.data.message);
                dfd.resolve();
                $state.go('triangular.organizations.detail.projects', {}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;

        }

        function updateProject(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + 'edit/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
                $state.go('triangular.organizations.detail.projects', {}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;

        }

        function deleteProject(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + 'delete/' + paramObj.project_id +'?'+ $.param(paramObj),
                headers: utilService.getHeaders(),

            }
            $http(req).then(function(response) {
                dfd.resolve();
                $state.go($state.current, {}, { reload: true });
                toastService.show(response.data.message);

            }, utilService.handleError);

            return dfd.promise;

        }

        function leaveProject() {

        }

 
        function addMember(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + paramObj.projectId + '/add_member?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                // currentUser = user;
                toastService.show(response.data.message);
                dfd.resolve();
                $state.go($state.current, {selectedTabIndex:1}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;

        }

        function removeMember(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + paramObj.projectId + '/remove_member?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                // currentUser = user;
                toastService.show(response.data.message);
                dfd.resolve();
                $state.go($state.current,  {selectedTabIndex:1}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;

        }

        function sendInvite(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + paramObj.projectId + '/invite_member?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                $state.go($state.current,  {selectedTabIndex:1}, { reload: true });

                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;
        }

    }
})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
