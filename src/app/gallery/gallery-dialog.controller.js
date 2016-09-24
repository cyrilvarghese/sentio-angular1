(function() {
    'use strict';

    angular
        .module('app.gallery')
        .controller('GalleryDialogController', GalleryDialogController);

    /* @ngInject */
    function GalleryDialogController($mdDialog,$state,logoAndThemeService, list, type, selectedProject, galleryService, currentGallery) {
        var vm = this;
        vm.list = list;
        vm.selectedProject = selectedProject;
        vm.updateGallery = updateGallery;
        vm.currentGallery = currentGallery;
        vm.type = type;
        vm.selectImage = selectImage;
        vm.cancel = cancel;
        vm.remove = remove;
         
        function cancel() {
            $mdDialog.cancel();
        }

        function remove() {
            if (type === 'logo') {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    logo_id:  vm.selectedId,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeLogo(paramObj).then(function () {
                    $mdDialog.hide();
                },function () {
                    $mdDialog.hide();
                });
            } else {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    theme_id:  vm.selectedId,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeTheme(paramObj).then(function () {
                    $mdDialog.hide();
                },function () {
                    $mdDialog.hide();
                });
            }
        }

        function selectImage(id) {
            vm.selectedId = id;
        }

        function updateGallery() {
            var themeId, logoId = '';
            if (type === 'logo') {
                logoId = vm.selectedId;
            } else {
                themeId = vm.selectedId;

            }
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                gallery_id: vm.selectedProject.gallery.id,
                theme_id: themeId || vm.currentGallery.theme_id,
                logo_id: logoId || vm.currentGallery.logo_id


            }
            galleryService.updateGallery(paramObj).then(function() {
                $mdDialog.hide();

            });
        }


    }
})();
