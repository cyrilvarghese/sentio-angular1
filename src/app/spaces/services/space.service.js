(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('spaceService', spaceService);

    /* @ngInject */
    function spaceService($q, $http, RoleStore, Upload, toastService, API_CONFIG, $state, utilService) {

        var service = {

            getSpaceList: getSpaceList,
            getSpace: getSpace,
            createSpace: createSpace,
            updateSpace: updateSpace,
            deleteSpace: deleteSpace,
            upload: uploadFiles,
            linkSpaces: linkSpaces
        };

        return service;


        function getCurrentOrganization() {

        }

        function uploadFiles(fileList, paramObj) {
            toastService.show('uploading file and creating space.....');

            var dfd = $q.defer();
            if (fileList !== null && fileList.length > 0) {

                Upload.upload({
                    url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'create?' + $.param({ api_token: localStorage.getItem('apiToken') }),
                    data: {
                        image: fileList,
                        info: Upload.json({
                            project_id: paramObj.projectId,
                            name: paramObj.name,
                            description: paramObj.description
                        })
                    },
                    headers: utilService.getHeaders()
                }).then(function(response) {
                    toastService.show(response.data.message);
                    dfd.resolve(response);
                $state.go('triangular.organizations.detail.projects.detail.spaces', { selectedTabIndex: 0 }, { reload: true });
                    
                    // console.log('Success? ' + response.config.data.file.name + 'uploaded. responseonse: ' + response.data);
                }, function(response) {
                    dfd.reject(response);
                    utilService.handleError(response);
                    
                    // console.log('Error status: ' + response.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image[0].name);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image[1].name);
                });;


            }
            return dfd.promise;
        }

        function linkSpaces(paramObj) {
            var dfd = $q.defer();
            if (paramObj.xml_file !== null) {

                Upload.upload({
                    url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'link_space/' + paramObj.space_id + '?' + $.param({ api_token: localStorage.getItem('apiToken'), space_id: paramObj.space_id }),
                    data: {
                        xml_file: paramObj.xml_file
                    },
                    headers: utilService.getHeaders()
                }).then(function(response) {
                    toastService.show(response.data.message);
                    $state.go($state.current,  {selectedTabIndex:0}, { reload: true });
                    dfd.resolve(response);
                    // console.log('Success? ' + response.config.data.file.name + 'uploaded. responseonse: ' + response.data);
                }, function(response) {
                    dfd.reject(response);
                    utilService.handleError(response);
                    // console.log('Error status: ' + response.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image.name);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image[1].name);
                });;


            }
            return dfd.promise;
        }

        function getSpaceList(paramObj) {

            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.projectsUrl + paramObj.projectId + '/space_list?' + $.param({ 'api_token': localStorage.getItem('apiToken') }),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                var parsedData = _.map(response.data.space_list, function(item) {
                    item.editorUrl = item.url.replace('tour.html', 'tour_editor.html');
                    return item;
                })
                dfd.resolve(response.data.space_list);
            }, utilService.handleError);

            return dfd.promise;
        }

        function getSpace(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'getDetails/' + paramObj.space_id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }
        vm.selectedOrg.Spaces

        function createSpace(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'create?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                // currentUser = user;
                toastService.show(response.data.message);
                dfd.resolve(response.data);
                $state.go('triangular.organizations.detail.projects.detail.spaces', { selectedTabIndex: 0 }, { reload: true });

            }, utilService.handleError);

            return dfd.promise;

        }

        function updateSpace(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'edit/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve(response.data);
                $state.go('triangular.organizations.detail.projects.detail.spaces', {selectedTabIndex:0}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;

        }

        function deleteSpace(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'delete/' + paramObj.space_id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()

            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve(response.data);
                $state.go($state.current, { selectedTabIndex: 0 }, { reload: true });

            }, utilService.handleError);

            return dfd.promise;

        }

    }
})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
