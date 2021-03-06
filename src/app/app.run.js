(function() {
    'use strict';

    angular
        .module('app')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $state, triLayout, toastService, API_CONFIG) {

        // default redirect if access is denied
        function redirectError() {
            $state.go('500');
        }
        if (localStorage.getItem('userInfo')) {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));

            window.Intercom('boot', {
                app_id: API_CONFIG.intercomAppId,
                email: userInfo.email,
                user_id: userInfo.user_id,
                custom_launcher_selector: ""
            });
        }
        // watches

        // redirect all errors to permissions to 500
        var errorHandle = $rootScope.$on('$stateChangeError', redirectError);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            errorHandle();
        });
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {

                var isAuth = toState.name.includes("authentication");
                var isOrgDetail = toState.name.includes("organizations.detail");
                if (isAuth) {
                    return; // no need to redirect 
                }

                if (!localStorage.getItem('userInfo')) {
                    event.preventDefault(); // stop current execution
                    $state.go('authentication.login'); // go to login
                } else {

                }
            });
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams, options) {
                $rootScope.accountExpired = JSON.parse(localStorage.getItem('accountExpired'));
                if (toState.name === 'triangular.organizations' || toState.name === 'triangular.profile') {
                    triLayout.setOption('sideMenuSize', 'off');

                } else if ($rootScope.accountExpired && toState.name !== 'triangular.organizations.detail.billing.change') {
                    $state.go('triangular.organizations.detail.billing', {
                        accountExpired: 1
                    });
                    triLayout.setOption('sideMenuSize', 'off');
                }
                window.Intercom('update');

            });
    }
    /*global services usedby app*/
    angular
        .module('app').factory('$myElementInkRipple', function($mdInkRipple) {
            return {
                attach: function(scope, element, options) {
                    return $mdInkRipple.attach(scope, element, angular.extend({
                        center: false,
                        dimBackground: true
                    }, options));
                }
            };
        });

    angular.module('app').filter('trusted', ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
    angular.module('app').filter('capitalize', function() {
        return function(textToTitleCase) {
            if (textToTitleCase)
                return textToTitleCase.charAt(0).toUpperCase() + textToTitleCase.substring(1).toLowerCase();
            return textToTitleCase;
        };
    });
})();
