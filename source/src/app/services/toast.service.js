(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('toastService', toastService);

    /* @ngInject */
    function toastService($rootScope, $mdToast) {
        var crumbs = [];

        return {
            show: show
        };

        ////////////////

        function show(message) {
            $mdToast.show({
                template: "<md-toast><div class='md-toast-content'>"+message+"</div></md-toast>",
                position: 'bottom right',
                hideDelay: 3000
            });
        }
 
    }
})();
