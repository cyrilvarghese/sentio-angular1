(function() {
    'use strict';

    angular
        .module('app')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $state, triLayout) {

        // default redirect if access is denied
        function redirectError() {
            $state.go('500');
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
                if (isAuth) {
                    return; // no need to redirect 
                }

                if (!localStorage.getItem('userInfo')) {
                    event.preventDefault(); // stop current execution
                    $state.go('authentication.login'); // go to login
                }

            });
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams, options) {
                // $rootScope.accountExpired=localstorage.getItem('accountExpired');
                if (toState.name === 'triangular.organizations' || toState.name === 'triangular.profile') {
                    triLayout.setOption('sideMenuSize', 'off');

                } else if ($rootScope.accountExpired && toState.name !== 'triangular.organizations.detail.billing.change') {
                    $state.go('triangular.organizations.detail.billing', {
                        accountExpired: 1
                    });
                    triLayout.setOption('sideMenuSize', 'off');
                }

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
