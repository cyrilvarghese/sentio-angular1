(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('projectService', projectService);

    /* @ngInject */
    function projectService($q, $http, RoleStore,Upload, toastService, API_CONFIG, utilService) {

        var service = {

            getProjectList: getProjectList,
            getProject: getProject,
            createProject: createProject,
            updateProject: updateProject,
            deleteProject: deleteProject,
            addLogo: addLogo,
            removeLogo: removeLogo,
            leaveProject: leaveProject
        };

        return service;

        function getCurrentOrganization() {

        }

        function getProjectList(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.organizationsUrl + 'project_list/' + paramObj.orgId + '?' + $.param(paramObj),
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
            }, utilService.handleError);

            return dfd.promise;

        }

        function deleteProject(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + 'delete?' + $.param(paramObj),
                headers: utilService.getHeaders(),

            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;

        }

        function leaveProject() {

        }

        function addLogo(paramObj) {
            var dfd = $q.defer();
            if (paramObj.files !== null) {
                Upload.upload({
                    url: API_CONFIG.baseUrl + API_CONFIG.logoUrl + 'create?' + $.param({ api_token: localStorage.getItem('apiToken') }),
                    data: {
                        image: paramObj.files,
                        info: Upload.json({
                            project_id: paramObj.projectId,
                            
                        })
                    },
                    headers: utilService.getHeaders()
                }).then(function(response) {
                    dfd.resolve(response);
                    // console.log('Success? ' + response.config.data.file.name + 'uploaded. responseonse: ' + response.data);
                }, function(response) {
                    dfd.reject(response);
                    // console.log('Error status: ' + response.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image[0].name);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image[1].name);
                });;


            }
            return dfd.promise;
        }
        function removeLogo(paramObj){
              var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.logoUrl + 'delete?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;
        }

    }
})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
