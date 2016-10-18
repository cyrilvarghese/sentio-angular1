(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $stateParams, utilService, toastService, triSettings, userService) {
        var vm = this;
        if ($stateParams.verified && $stateParams.verified === "1") {
            utilService.messageDialog("Account verified", "Your account was verified successfully.Please login to continue.", true);
        } else if ($stateParams.verified && $stateParams.verified === "0") {
            utilService.messageDialog("Account unverified", "Unable to verify account.Please retry.", false);
        }else if($stateParams.sessionExpired){
            utilService.messageDialog("Session Expired", "Your session has expired please login again...", false);

        }



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
