(function() {
    'use strict';

    angular
        .module('app.gallery')
        .controller('customConfirmDialogController', customConfirmDialogController);

    /* @ngInject */
    function customConfirmDialogController($mdDialog, $state, message, title,color,action1Text,action2Text,action1,action2) {
        var vm = this;


        vm.title = title;
        vm.message = message;
        vm.color = color;
        vm.action1Text = action1Text;
        vm.action2Text = action2Text;
        vm.action1 = action1||cancel;
        vm.action2 = action2||cancel;

        vm.cancel = cancel;

        function cancel() {
            $mdDialog.cancel();
        }




    }
})();
