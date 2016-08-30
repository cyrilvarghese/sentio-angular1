(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsDetailController', projectsDetailController);

    /* @ngInject */
    function projectsDetailController($mdSidenav,$state, members,triBreadcrumbsService) {
        var vm = this;
          vm.showSpaces = showSpaces;

 
        
        triBreadcrumbsService.reset();
        triBreadcrumbsService.addCrumb({name:'Project Detail'});
        triBreadcrumbsService.addCrumb({name:'Project'});
       

         function showSpaces(){
             $state.go('triangular.organizations.detail.projects.detail.spaces',{
                id:123
            });
        }
    }
})();
