(function() {
    'use strict';

    angular
        .module('app.gallery')
        .controller('GalleryDialogController', GalleryDialogController);

    /* @ngInject */
    function GalleryDialogController($mdDialog,$state, list, type, selectedProject, galleryService, currentGallery) {
        var vm = this;
        vm.list = list;
        vm.selectedProject = selectedProject;
        vm.updateGallery = updateGallery;
        vm.currentGallery = currentGallery;
        vm.type = type;
        vm.selectImage = selectImage;
        vm.cancel = cancel;
        // vm.next = next;
        // vm.prev = prev;
        // vm.remove = remove;
        // vm.type = type;

        // function next() {
        //     var index =images.indexOf(vm.currentImage);
        //     index = index + 1 <images.length ? index + 1 : 0;
        //     vm.currentImage =images[index];
        // }

        // function prev() {
        //     var index =images.indexOf(vm.currentImage);
        //     index = index - 1 < 0 ?images.length -1 : index - 1;
        //     vm.currentImage =images[index];
        // }
        function cancel() {
            $mdDialog.cancel();
        }

        function remove(id) {
            if (type === 'logo') {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    logo_id: id,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeLogo(paramObj);
            } else {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    theme_id: id,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeTheme(paramObj);
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
