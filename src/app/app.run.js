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
                if (toState.name !== "authentication.login" && !localStorage.getItem('userInfo')) {
                    $state.go('authentication.login');
                } else {
                    return;
                }

            });
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams, options) {
                if (toState.name === 'triangular.organizations' ||toState.name === 'triangular.profile') {
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
})();
