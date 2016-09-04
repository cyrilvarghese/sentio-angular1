(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('galleryService', galleryService);

    /* @ngInject */
    function galleryService($q, $http, RoleStore, Upload, toastService, API_CONFIG, utilService) {

        var service = {
            addSpaceFromGallery: addSpaceFromGalleryremoveSpaceFromGallery,
            removeSpaceFromGallery: removeSpaceFromGallery,
            getGallery: getGallery,
            updateGallery: updateGallery

        };

        return service;

        function getGallery(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.gallery + 'getDetails/' + paramObj.id + '?' + $.param(paramObj),
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
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.gallery + 'getDetails/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders()
            }
            $http(req).then(function(response) {
                dfd.resolve(response.data);
            }, utilService.handleError);

            return dfd.promise;
        }

        function removeSpaceFromGallery(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'addToGallery/' + paramObj.id + '?' + $.param(paramObj),
                headers: utilService.getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;
        }

        function AddSpaceToGallery(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.spacesUrl + 'removeFromGallery/' + paramObj.id + '?' + $.param(paramObj),
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
});
