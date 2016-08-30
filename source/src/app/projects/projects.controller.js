(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsController', projectsController);

    /* @ngInject */
    function projectsController($mdSidenav, $state, members, triBreadcrumbsService) {
        var vm = this;
        vm.deleteProject = deleteProject;
        vm.showProject = showProject;
        vm.selectProject = selectProject;
        vm.isProjectSelected = false;
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
        vm.projects = [{
            name: 'Project 1',
            createdBy: 'John',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }, {
            name: 'Project 1',
            createdBy: 'Jane',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }, {
            name: 'Project 1',
            createdBy: 'Cyril',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }, {
            name: 'Project 1',
            createdBy: 'Jack',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }, {
            name: 'Project 1',
            createdBy: 'Will',
            doc: '17/11/2015',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et d'

        }]

        function deleteProject() {
            console.log('delete');
        }

        function showProject() {
            $state.go('triangular.organizations.detail.projects.detail', {
                id: 123
            });
        }

        function selectProject(flag) {
            console.log('select');
            vm.isProjectSelected = !flag;
        }

    }
})();
