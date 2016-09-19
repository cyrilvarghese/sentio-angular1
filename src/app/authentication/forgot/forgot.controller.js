(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('ForgotController', ForgotController);

    /* @ngInject */
    function ForgotController($scope, $state, $mdToast,API_CONFIG, $filter, $http,userService, triSettings) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.user = {
            email: ''
        };
        vm.resetClick = resetClick;

        ////////////////

        function resetClick() {
            var paramObj={
                email_id:vm.user.email,
                api_token:API_CONFIG.apiKey
            }
            userService.forgotPass(paramObj);
        }
    }
})();
