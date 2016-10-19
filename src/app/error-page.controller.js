(function() {
    angular
        .module('app')
        .controller('ErrorPageController', ErrorPageController);

    /* @ngInject */
    function ErrorPageController($state) {
        var vm = this;
 
        vm.goBack = goBack;

        /////////

        function goBack() {
            $state.go('triangular.organization.detail.projects')
            
        }
         
    }
})();
