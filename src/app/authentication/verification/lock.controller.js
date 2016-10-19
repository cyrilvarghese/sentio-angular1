(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LockController', LockController);

    /* @ngInject */
    function LockController($state, $stateParams, userService, triSettings, API_CONFIG) {
        var vm = this;
        vm.triSettings=triSettings;
        vm.showLoader = true;
        var paramObj = {
            email: $stateParams.email || "",
            key: $stateParams.key || "",
            api_token: API_CONFIG.apiKey
        }
        if ($stateParams.email && $stateParams.email) {
            userService.verifyEmail(paramObj).then(function() {
                $state.go('authentication.login', { verified: 1 }, { reload: true });

            },function() {
                $state.go('authentication.login', { verified: 0 }, { reload: true });

            })
        }
    }
})();
