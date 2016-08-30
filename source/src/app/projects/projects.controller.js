(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsController', projectsController);

    /* @ngInject */
    function projectsController($mdSidenav, $state, $stateParams,members, triBreadcrumbsService) {
        var vm = this;
        vm.deleteProject = deleteProject;
        vm.showProject = showProject;
        vm.selectProject = selectProject;
        vm.isProjectSelected = false;
        vm.projects = $stateParams.projects||[];

        var crumb = {
            // give the menu a name to show (should be translatable and in the il8n folder json)
            name: 'project detail',
            // point this menu to the state we created in the $stateProvider above
            state: 'project.detail',
            // set the menu type to a link
            type: 'link',
            // set an icon for this menu
            icon: 'zmdi zmdi-calendar-alt',
            // set a proirity for this menu item, menu is sorted by priority
            priority: 2.3,
            permission: 'viewCalendar'
        }

        triBreadcrumbsService.reset();
      
        triBreadcrumbsService.addCrumb({ name: 'Project' });
        function deleteProject() {
            console.log('delete');
        }

        function navigateToProject(id) {
            var id=id||0;
            $state.go('triangular.organizations.detail.projects.detail', {
                id: parseInt(id)
            });
        }
        

        function deleteProject() {
            console.log('delete');
        }

        function showProject() {
            $state.go('triangular.projects.detail', {
                id: 123
            });
        }
        function selectProject(flag) {
            console.log('select');
            vm.isProjectSelected = !flag;
        }

    }
})();
