(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter, triSettings, $stateParams,userService,toastService) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: '',
            org_name: $stateParams.org || '',
            invitation_code: $stateParams.invitation_code || ''
        };

        ////////////////

        function signupClick() {
            userService.signUp(vm.user).then(function() {
                toastService.show('sign Up complete');
                $state.go('triangular.organizations');
            });

        }
    }
})();
