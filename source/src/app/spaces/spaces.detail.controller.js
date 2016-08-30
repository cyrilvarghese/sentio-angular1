(function() {
    'use strict';

    angular
        .module('app.spaces')
        .controller('spacesDetailController', spacesDetailController);

    /* @ngInject */
    function spacesDetailController($mdSidenav, members, triBreadcrumbsService) {
        var vm = this;
        vm.isOpen = false;
    }
})();
