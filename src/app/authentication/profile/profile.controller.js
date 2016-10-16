(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController(userService,$stateParams,API_CONFIG, utilService,triBreadcrumbsService) {
        var vm = this;
        uploadReset();
        vm.uploadProfilePic = uploadProfilePic;
        vm.resendResetPasswordLink = resendResetPasswordLink;
          triBreadcrumbsService.reset();
         triBreadcrumbsService.addCrumb({ name: 'Profile'});

        vm.settingsGroups = [{
            name: 'Account Settings',
            settings: [{
                title: 'Show my location',
                icon: 'zmdi zmdi-pin',
                enabled: true
            }, {
                title: 'Show my avatar',
                icon: 'zmdi zmdi-face',
                enabled: false
            }, {
                title: 'Send me notifications',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        }, {
            name: 'Chat Settings',
            settings: [{
                title: 'Show my username',
                icon: 'zmdi zmdi-account',
                enabled: true
            }, {
                title: 'Make my profile public',
                icon: 'zmdi zmdi-account-box',
                enabled: false
            }, {
                title: 'Allow cloud backups',
                icon: 'zmdi zmdi-cloud-upload',
                enabled: true
            }]
        }];
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));

        vm.user = {
            name: userInfo.name,
            email: userInfo.email,
            image:userInfo.image
        };

        function uploadProfilePic(id, file) {
            var paramObj = {
                user_id: userInfo.user_id,
                image: file
            }
            uploadStarted();
            userService.uploadProfilePic(paramObj).then(function() {
                uploadReset();
            }, utilService.handleError);
        }
         function resendResetPasswordLink(){
            var paramObj={
                email:vm.user.email,
                api_token:API_CONFIG.apiKey
            }
            userService.forgotPass(paramObj);
         }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function uploadComplete() {
            vm.status = 'complete';
        }

        function uploadReset() {
            vm.status = 'idle';
        }
    }
})();
