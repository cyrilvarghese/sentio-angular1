(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('projectsDetailController', projectsDetailController);

    /* @ngInject */
    function projectsDetailController($mdSidenav, $mdDialog, $state, projectService, $stateParams, logoAndThemeService, userService, triBreadcrumbsService) {
        var vm = this;
        vm.showSpaces = showSpaces;
        vm.addLogo = addLogo;
        vm.removeLogo = removeLogo;
        vm.createOrUpdate = createOrUpdate;
        vm.leaveProject = leaveProject;
        vm.showMembers = showMembers;
        vm.id = parseInt($stateParams.projectId, 10) || 0;
        init();

        function init() {
            if (vm.id !== 0) { /*edit*/
                var paramObj = {
                    'api_token': localStorage.getItem('apiToken'),
                    id: vm.id
                };
                projectService.getProject(paramObj).then(function(data) {
                    vm.selectedProject = data;
                    vm.members = data.members;
                });
            }
        }

        function createOrUpdate() {
            var paramObj = {
                'name': vm.selectedProject.name,
                'id': vm.id,
                /*current view id*/
                'org_id': $stateParams.id,
                /*org id*/
                'description': vm.selectedProject.description,
                'api_token': localStorage.getItem('apiToken')
            }
            if (vm.id === 0) {
                projectService.createProject(paramObj);
            } else {
                projectService.updateProject(paramObj);
            }
        }



        function leaveProject() {
            var paramObj = {
                id: vm.selectedProject.id,
                'api_token': localStorage.getItem('apiToken')
            }
            userService.leaveProject(paramObj);
        }

        function selectProject() {
            console.log('select');
        }


        function showSpaces() {
            $state.go('triangular.organizations.detail.projects.detail.spaces', {
                projectId: vm.selectedProject.project_id,
                spaceList: vm.selectedProject.spaces,
                members: vm.selectedProject.members
            });
        }


        uploadReset();
        /////////////////
        function addLogo(files) {
            uploadStarted();
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                files: files,
                project_id: $stateParams.projectId
            }
            logoAndThemeService.addLogo(paramObj).then(function() {
                uploadComplete();
            }, function() {
                uploadReset();
            })
        }

        function removeLogo(files) {
            if (localStorage.getItem('userInfo')) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    logo_id: vm.selectedLogo.id,
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                logoAndThemeService.removeLogo(paramObj);
            }
        }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function showMembers(componentId) {
            $mdSidenav(componentId)
                .open()
                .then(function() {

                });
        }

        function uploadComplete() {
            vm.status = 'complete';

        }

        function uploadReset() {
            vm.status = 'idle';
        }


        vm.feed = [];
        vm.openImage = openImage;

        ////////////////

        // number of days of dummy data to show
        var numberOfFeedDays = 1;
        var loremPixelCategories = ['abstract', 'city', 'people', 'nature', 'food', 'fashion', 'nightlife'];

        function randomImage(title) {
            var randImage = Math.floor((Math.random() * 10) + 1);
            var randomCategory = loremPixelCategories[Math.floor((Math.random() * (loremPixelCategories.length - 1)) + 1)];

            var width = [300, 640];
            var height = [225, 480];

            var image = {
                url: 'http://lorempixel.com/',
                urlFull: 'http://lorempixel.com/',
                title: title
            };


            if (Math.random() < 0.7) {
                image.url += width[0] + '/' + height[0];
                image.urlFull += width[1] + '/' + height[1];
                image.rowspan = 2;
                image.colspan = 2;
            } else {
                image.url += height[0] + '/' + width[0];
                image.urlFull += height[1] + '/' + width[1];
                image.rowspan = 2;
                image.colspan = 1;
            }

            image.url += '/' + randomCategory + '/' + randImage;
            image.urlFull += '/' + randomCategory + '/' + randImage;

            return image;
        }

        function createDayOfImages(day) {
            var dayFeed = {
                date: moment().subtract(day, 'days'),
                images: []
            };

            var numberOfImages = Math.floor((Math.random() * 4) + 6);
            for (var i = 0; i < numberOfImages; i++) {
                dayFeed.images.push(randomImage('Photo ' + (i + 1)));
            }

            return dayFeed;
        }

        function openImage(day, image, $event) {
            $mdDialog.show({
                controller: 'GalleryDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/gallery/gallery-dialog.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                targetEvent: $event,
                locals: {
                    day: day,
                    image: image
                }
            });
        }

        function createFeed() {
            for (var day = 0; day < numberOfFeedDays; day++) {
                vm.feed.push(createDayOfImages(day));
            }
        }

        function GalleryDialogController($mdDialog, day, image) {
            var vm = this;
            vm.currentImage = image;
            vm.next = next;
            vm.prev = prev;

            function next() {
                var index = day.images.indexOf(vm.currentImage);
                index = index + 1 < day.images.length ? index + 1 : 0;
                vm.currentImage = day.images[index];
            }

            function prev() {
                var index = day.images.indexOf(vm.currentImage);
                index = index - 1 < 0 ? day.images.length - 1 : index - 1;
                vm.currentImage = day.images[index];
            }
        }
        // init

        createFeed();
        // getGalleryDetails();

        function getGalleryDetails() {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                gallery_id: JSON.parse(localStorage.getItem('userInfo')).gallery_id || 0,

            }
            galleryService.getGallery(paramObj);
        }


    }
})();
