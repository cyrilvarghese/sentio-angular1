(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('galleryService', galleryService);

    /* @ngInject */
    function galleryService($q, $http, RoleStore,$state, Upload, toastService, API_CONFIG, utilService) {

        var service = {
            addSpaceToGallery: addSpaceToGallery,
            removeSpaceFromGallery: removeSpaceFromGallery,
            getGallery: getGallery,
            updateGallery: updateGallery

        };

        return service;

        function getGallery(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.galleryUrl + 'getDetails/' + paramObj.gallery_id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }

        function updateGallery(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.galleryUrl + 'design/' + paramObj.gallery_id + '?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve(response.data);
                $state.go($state.current, {selectedTabIndex:2}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;
        }

        function removeSpaceFromGallery(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'removeFromGallery/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
                $state.go($state.current, {}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;
        }

        function addSpaceToGallery(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'addToGallery/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
                $state.go($state.current, {}, { reload: true });

            }, utilService.handleError);

            return dfd.promise;
        }

    }
})();
