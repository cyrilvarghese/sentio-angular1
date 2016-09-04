(function() {
    'use strict';

    angular
        .module('app.gallery')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {
        $stateProvider
            .state('triangular.gallery', {
                url: '/gallery',
                templateUrl: 'app/gallery/gallery.tmpl.html',
                // set the controller to load for this page
                controller: 'galleryController',
                controllerAs: 'vm',
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }

            }).state('triangular.gallery.edit', {
                url: '/gallery',
                templateUrl: 'app/gallery/gallery.tmpl.html',
                // set the controller to load for this page
                controller: 'editGalleryController',
                controllerAs: 'vm',
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }

            });
        triMenuProvider.addMenu({
            name: 'Edit Gallery',
            icon: 'fa fa-image',
            state: 'triangular.gallery.edit',
            type: 'link',

            priority: 1.2
        });


    }
})();
