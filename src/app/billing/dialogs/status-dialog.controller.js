(function() {
    'use strict';

    angular
        .module('app.gallery')
        .controller('statusDialogController', statusDialogController);

    /* @ngInject */
    function statusDialogController($mdDialog, $state, message, title,color) {
        var vm = this;


        vm.title = title;
        vm.message = message;
        vm.color = color;

        vm.cancel = cancel;

        function cancel() {
            $mdDialog.cancel();
        }




    }
})();
