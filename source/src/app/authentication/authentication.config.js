(function() {
    'use strict';

    angular
        .module('app.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('authentication', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: 'app/authentication/layouts/authentication.tmpl.html'
                    }
                },
                data: {
                    permission: {
                        only: ['viewAuthentication']
                    }
                },
                resolve: {
                    csrf: function($http, API_CONFIG,toastService) {
                        return $http({
                            method: 'GET',
                            url: API_CONFIG.baseUrl + 'csrf' /*sample data*/
                        }).then(function(resp) {

                            if (resp.status === 200) {
                                localStorage.setItem('csrf', resp.data);
                            } else {
                                toastService.show('unable to load site properly please retry in some time.')
                            }
                        });
                    }
                }
            })
            .state('authentication.login', {
                url: '/login',
                templateUrl: 'app/authentication/login/login.tmpl.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('authentication.signup', {
                url: '/signup?invitation_code=',
                templateUrl: 'app/authentication/signup/signup.tmpl.html',
                controller: 'SignupController',
                controllerAs: 'vm'

            })
            .state('authentication.lock', {
                url: '/lock',
                templateUrl: 'app/authentication/lock/lock.tmpl.html',
                controller: 'LockController',
                controllerAs: 'vm'
            })
            .state('authentication.forgot', {
                url: '/forgot',
                templateUrl: 'app/authentication/forgot/forgot.tmpl.html',
                controller: 'ForgotController',
                controllerAs: 'vm'
            })
            .state('triangular.profile', {
                url: '/profile?code',
                templateUrl: 'app/authentication/profile/profile.tmpl.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
               
            });

    }
})();
