(function() {
    'use strict';
    angular
        .module('app.authentication')
        .controller('resetPasswordController', resetPasswordController);
    /* @ngInject */
    function resetPasswordController($state, $stateParams, userService, triSettings, API_CONFIG) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.resetPass = resetPass;

        function resetPass() {
            vm.showLoader = true;
            var paramObj = {
                email: $stateParams.email || "",
                code: $stateParams.code || "",
                password: vm.user.password,
                api_token: API_CONFIG.apiKey
            }
            if ($stateParams.email && $stateParams.code) {
                userService.resetPass(paramObj).then(function() {
                    vm.showLoader = false;

                    $state.go('authentication.login', { reload: true });

                }, function() {
                    vm.showLoader = false;

                    $state.go('authentication.login', { reload: true });

                })
            }
        }
    }
})();
