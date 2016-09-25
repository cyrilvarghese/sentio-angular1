(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('spaceEditorDialogController', spaceEditorDialogController);

    /* @ngInject */
    function spaceEditorDialogController($mdDialog, $timeout, $state, $stateParams, url,title) {
        var vm = this;
        vm.url = 'http://' + url;
        vm.title = title;
        vm.cancel = cancel;

        function cancel() {
            $mdDialog.cancel();
        }
        console.log(url);
    }
})();
