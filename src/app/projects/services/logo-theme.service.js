(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('logoAndThemeService', logoAndThemeService);

    /* @ngInject */
    function logoAndThemeService($q, $http, RoleStore, $state, Upload, toastService, API_CONFIG, utilService) {

        var service = {
            addLogo: addLogo,
            removeLogo: removeLogo,
            getLogo: getLogo,
            getLogoList: getLogoList,
            getThemeList: getThemeList,
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
                toastService.show(response.data.message);

                    dfd.resolve(response);
                    $state.go($state.current, {selectedTabIndex:2}, { reload: true });

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

        function getLogoList(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + paramObj.projectId + '/logo_list?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data.logo_list);
                
            }, utilService.handleError);

            return dfd.promise;
        }

        function getThemeList(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + paramObj.projectId + '/theme_list?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {

                dfd.resolve(response.data.theme_list);
            }, utilService.handleError);

            return dfd.promise;
        }

        function removeLogo(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.logoUrl + 'delete/' + paramObj.logo_id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()

            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                $state.go($state.current, {}, { reload: true });

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
                            project_id: paramObj.project_id,

                        })
                    },
                    headers: utilService.getHeaders()
                }).then(function(response) {
                toastService.show(response.data.message);
                    
                    $state.go($state.current, {}, { reload: true });

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
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.themeUrl + 'delete/' + paramObj.theme_id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                $state.go($state.current, {}, { reload: true });

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
