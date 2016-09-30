(function() {
    'use strict';

    angular
        .module('triangular.components')
        .factory('triLoaderService', LoaderService);

    /* @ngInject */
    function LoaderService($rootScope) {
        var active = false;
        var title="";

        return {
            isActive: isActive,
            title:title,
            setLoaderActive: setLoaderActive
        };

        ////////////////

        function isActive() {
            return active;
        }

        function setLoaderActive(setActive) {
            active = setActive;
            $rootScope.$broadcast('loader', active);
        }
    }
})();
