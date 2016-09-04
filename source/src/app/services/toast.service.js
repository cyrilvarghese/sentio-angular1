(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('toastService', toastService)
        .controller('ToastCtrl', function($scope, $mdToast, $mdDialog, message, action1Text, action2Text) {
            $scope.action1Text = action1Text;
            $scope.action2Text = action2Text;
            $scope.message = message;
           


            $scope.action1 = function() {
                $mdToast.hide();
                console.log('asdasd');
                dfd.resolve();
            };
            $scope.action2 = function(e) {
                $mdToast.cancel()
                console.log('lllll');
                dfd.reject();
            };
        });


    /* @ngInject */
    function toastService($rootScope, $mdToast, $q) {
        var crumbs = [];

        return {
            show: show,
            showCustomToast: showCustomToast
        };

        ////////////////

        function show(message) {
            $mdToast.show({
                template: "<md-toast><div class='md-toast-content'>" + message + "</div></md-toast>",
                position: 'bottom right',
                hideDelay: 3000
            });
        }

        // function showCustomToast(message, action1Text, action2Text) {
        //     var dfd= $q.defer();
        //     var pinTo = 'bottom right';
        //     var toast = $mdToast.simple()
        //         .textContent('Confirm Delete?')
        //         .action('ok')   
        //         .hideDelay(5000)
        //         .highlightAction(true)
        //         .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
        //         .position(pinTo);
        //      $mdToast.show(toast).then(function(response) {
        //         if (response == 'ok') {
        //            dfd.resolve();
        //         }
        //     });
        //     return dfd.promise;
        // };

        function showCustomToast(message, action1Text, action2Text) {
            var dfd= $q.defer();
             $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastCtrl',

                locals: {
                    message: message,
                    action1Text: action1Text,
                    action2Text: action2Text,
                    dfd:dfd
                },
                templateUrl: '../app/services/customToast.html'
            });
            return dfd.promise;
        };




    }
})();
