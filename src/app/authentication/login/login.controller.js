(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state,$stateParams, toastService, triSettings, userService) {
        var vm = this;
        vm.loginClick = loginClick;

        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: $stateParams.email || '',
            password: '',
            confirm: '',
            org_name: $stateParams.org || '',
            invitation_code: $stateParams.invitation_code || ''

        };

        ////////////////

        function loginClick() {
            userService.login(vm.user).then(function() {
                toastService.show('Login successful');

                $state.go('triangular.organizations');
            });
            toastService.show('Logging in..')

        }
    }
})();
