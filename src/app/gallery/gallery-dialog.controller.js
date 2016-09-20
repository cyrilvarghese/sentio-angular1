(function() {
    'use strict';

    angular
        .module('app.gallery')
        .controller('GalleryDialogController', GalleryDialogController);

    /* @ngInject */
    function GalleryDialogController($mdDialog,images,image,type,logoAndThemeService) {
        // var vm = this;
        // vm.currentImage = image;
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
        // function remove(id){
        //     if(type==='logo'){
        //          var paramObj = {
        //             api_token: localStorage.getItem('apiToken'),
        //             logo_id: id,
        //             user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
        //         }
        //         logoAndThemeService.removeLogo(paramObj);
        //     }else{
        //          var paramObj = {
        //             api_token: localStorage.getItem('apiToken'),
        //             theme_id: id,
        //             user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
        //         }
        //         logoAndThemeService.removeTheme(paramObj);
        //     }
        // }
    }
})();
