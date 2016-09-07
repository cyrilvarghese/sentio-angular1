(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('logoAndThemeService', logoAndThemeService);

    /* @ngInject */
    function logoAndThemeService($q, $http, RoleStore, Upload, toastService, API_CONFIG, utilService) {

        var service = {
            addLogo: addLogo,
            removeLogo: removeLogo,
            getLogo: getLogo,
            addTheme: addTheme,
            getTheme: getTheme,
            removeTheme: removeTheme
        };

        return service;

        function addLogo(paramObj) {
            var dfd = $q.defer();
            if (paramObj.files !== null) {
                Upload.upload({
                    url: API_CONFIG.baseUrl + API_CONFIG.logoUrl + 'create?' + $.param({ api_token: localStorage.getItem('apiToken') }),
                    data: {
                        image: paramObj.files,
                        info: Upload.json({
                            project_id: paramObj.project_id,

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

        function removeLogo(paramObj) {
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

        function getLogo(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.logoUrl + 'getDetails/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }

        function addTheme(paramObj) {
            var dfd = $q.defer();
            if (paramObj.files !== null) {
                Upload.upload({
                    url: API_CONFIG.baseUrl + API_CONFIG.themeUrl + 'create?' + $.param({ api_token: localStorage.getItem('apiToken') }),
                    data: {
                        image: paramObj.files,
                        info: Upload.json({
                            project_id: paramObj.projectId,
                            name: paramObj.name,
                            user_id: paramObj.userId
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

        function removeTheme(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.themeUrl + 'delete/'+paramObj.id+'?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;
        }

        function getTheme(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.themeUrl + 'getDetails/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }
    }
})();
