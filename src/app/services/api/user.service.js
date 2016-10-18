(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('userService', userService);

    /* @ngInject */
    function userService($q, $http, $state,RoleStore, Upload, utilService, toastService, API_CONFIG) {
        var userInfo = {
            name: 'guest',
            username: '-'
        };
        if (localStorage.getItem('userInfo')) {
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        var currentUser = {};

        var service = {
            getCurrentUser: getCurrentUser,
            getUsers: getUsers,
            hasPermission: hasPermission,
            signUp: signUp,
            forgotPass: forgotPass,
            leaveOrg: leaveOrg,
            leaveProject: leaveProject,
            uploadProfilePic: uploadProfilePic,
            resetPass: resetPass,
            setRole: setRole,
            verifyEmail: verifyEmail,
            resendVerificationEmail: resendVerificationEmail,
            login: login,
            logOut: logOut
        };

        return service;

        ///////////////

        function getCurrentUser() {
            return JSON.parse(localStorage.getItem('userInfo'));
        }

        function getUsers() {
            return $http.get('app/permission/data/users.json');
        }

        function logOut() {
            localStorage.clear();
        }

        function hasPermission(permission) {
            var deferred = $q.defer();
            var hasPermission = false;

            // check if user has permission via its roles
            angular.forEach(getCurrentUser().roles, function(role) {
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


        function login(paramObj) {
            $http.defaults.headers.post['X-CSRF-TOKEN'] = localStorage.getItem('csrf');

            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'signin',
                headers: getHeaders(),
                withCredentials: true,
                data: paramObj
            }
            $http(req).then(function(response) {
                currentUser = response.data;
                currentUser.roles = [];
                currentUser.roles.push(currentUser.role);
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                localStorage.setItem('apiToken', response.data.auth_key);

                dfd.resolve();
            }, utilService.handleError);

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
            }, utilService.handleError);

            return dfd.promise;

        }

        function forgotPass(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.sharedUrl + 'forgot_password?' + $.param(paramObj),
                headers: getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message)
                dfd.resolve();
            }, utilService.handleError);

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
            }, utilService.handleError);

            return dfd.promise;

        }

        function leaveProject(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'leave_proj/' + paramObj.id + '?' + $.param(paramObj),
                headers: getHeaders()
            }
            $http(req).then(function(response) {
                toastService.show(response.data.message)
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;

        }


        function getCSRF() {
            var dfd = $q.defer();
            $http.get(API_CONFIG.baseUrl + 'csrf').then(function(resp) {
                localStorage.setItem('csrf', resp);
                dfd.resolve();
            }, utilService.handleError);
            return dfd.promise;
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
            }, utilService.handleError);

            return dfd.promise;

        }

        function uploadProfilePic(paramObj) {
            var dfd = $q.defer();
            if (paramObj.file !== null) {

                Upload.upload({
                    url: API_CONFIG.baseUrl + API_CONFIG.authenticationUrl + 'update_profile_pic?' + $.param({ api_token: localStorage.getItem('apiToken') }),
                    data: {
                        image: paramObj.image,
                        info: Upload.json({
                            user_id: paramObj.user_id
                        })
                    },
                    headers: utilService.getHeaders()
                }).then(function(response) {
                    toastService.show(response.data.message);
                    localStorage.setItem('userInfo', JSON.stringify(response.data));
                    $state.go($state.current, {}, {reload:true});
                    dfd.resolve(response);
                    // console.log('Success? ' + response.config.data.file.name + 'uploaded. responseonse: ' + response.data);
                }, function(response) {
                    dfd.reject(response);
                    utilService.handleError(response);
                    // console.log('Error status: ' + response.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image.name);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image[1].name);
                });;


            }
            return dfd.promise;
        }


        function resetPass(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'POST',
                url: API_CONFIG.baseUrl + API_CONFIG.sharedUrl + 'reset_password?' + $.param(paramObj),
                headers: getHeaders(),
                data: paramObj
            }
            $http(req).then(function(response) {
                currentUser = response.data.user_id;
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                localStorage.setItem('apiToken', response.data.auth_key);
                dfd.resolve();
            }, function() {
                dfd.reject();
                utilService.handleError();
            });

            return dfd.promise;
        }

        function verifyEmail(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.sharedUrl + 'verify_email?' + $.param(paramObj),
                headers: getHeaders()

            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;
        }

        function resendVerificationEmail(paramObj) {
            var dfd = $q.defer();
            var req = {
                method: 'GET',
                url: API_CONFIG.baseUrl + API_CONFIG.sharedUrl + 'resend_verification_link?' + $.param(paramObj),
                headers: getHeaders()

            }
            $http(req).then(function(response) {
                toastService.show(response.data.message);
                dfd.resolve();
            }, utilService.handleError);

            return dfd.promise;
        }

        function setRole(roles) {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            userInfo.roles = roles;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
    }
})();
// cd C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security)
