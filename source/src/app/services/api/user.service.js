(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('userService', userService);

    /* @ngInject */
    function userService($q, $http, RoleStore, toastService, API_CONFIG) {
        var userInfo = {
            name: 'guest',
            username: '-'
        };
        if (localStorage.getItem('userInfo')) {
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        var currentUser = {
            displayName: userInfo.name,
            username: userInfo.email,
            avatar: userInfo.image ? userInfo.image : 'assets/images/avatars/avatar-5.png',
            roles: ['SUPERADMIN']
        };

        var service = {
            getCurrentUser: getCurrentUser,
            getUsers: getUsers,
            hasPermission: hasPermission,
            signUp: signUp,
            forgotPass: forgotPass,
            leaveOrg: leaveOrg,
            leaveProject: leaveProject,
            login: login
        };

        return service;

        ///////////////

        function getCurrentUser() {
            return currentUser;
        }

        function getUsers() {
            return $http.get('app/permission/data/users.json');
        }

        function hasPermission(permission) {
            var deferred = $q.defer();
            var hasPermission = false;

            // check if user has permission via its roles
            angular.forEach(currentUser.roles, function(role) {
                // check role exists
                if (RoleStore.hasRoleDefinition(role)) {
                    // get the role
                    var roles = RoleStore.getStore();

                    if (angular.isDefined(roles[role])) {
                        // check if the permission we are validating is in this role's permissions
                        if (-1 !== roles[role].validationFunction.indexOf(permission)) {
                            hasPermission = true;
                        }
                    }
                }
            });

            // if we have permission resolve otherwise reject the promise
            if (hasPermission) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            // return promise
            return deferred.promise;
        }

        // function login(userDetails) {
        //     var dfd = $q.defer();
        //     $http.get('').then(function(user) {
        //         currentUser = user;
        //         localStorage.setItem('userInfo', JSON.stringify(user));
        //         dfd.resolve();
        //     }, handleError('login'));

        //     return dfd.promise;

        // }

        function login(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'signin',
                headers: getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                // currentUser = user;s
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                localStorage.setItem('apiToken', response.data.auth_key);

                dfd.resolve();
            }, handleError);

            return dfd.promise;

        }

        function signUp(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'signup',
                headers: getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                currentUser = response.data.user_id;
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                localStorage.setItem('apiToken', response.data.auth_key);
                dfd.resolve();
            }, handleError);

            return dfd.promise;

        }

        function forgotPass(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'forgot_password?' + $.param(paramObj),
                headers: getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message)
                dfd.resolve();
            }, handleError);

            return dfd.promise;

        }

        function leaveOrg(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'leave_org?' + $.param(paramObj),
                headers: getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message)
                dfd.resolve();
            }, handleError);

            return dfd.promise;

        }

        function leaveProject(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'leave_proj/'+paramObj.id+'?' + $.param(paramObj),
                headers: getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message)
                dfd.resolve();
            }, handleError);

            return dfd.promise;

        }


        function getCSRF() {
            var dfd = $q.defer();
            $http.get(API_CONFIG.baseUrl + 'csrf').then(function(resp) {
                localStorage.setItem('csrf', resp);
                dfd.resolve();
            }, handleError('getting csrf'));

            return dfd.promise;
        }

        function handleError(resp) {
            console.log(resp.data.error);
            toastService.show(resp.data.error);
        }

        function getHeaders() {
            return {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem('csrf'),
                'Accept': 'application/json',
                'api-key': '7nZOLvhjP21/XqzuQCb0uylmBnbAtcPMil+6momlp5E='

            }
        }

        function getUserDetails() {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'details?' + $.param({ 'api_token': localStorage.getItem('apiToken') }),
                headers: getHeaders()

            }
            $http(req).then(function(response) {
                currentUser = response.data.user_id;
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                dfd.resolve();
            }, handleError);

            return dfd.promise;

        }
    }
})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
