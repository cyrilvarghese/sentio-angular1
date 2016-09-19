(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, toastService, triSettings, userService) {
        var vm = this;
        vm.loginClick = loginClick;
    
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
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
