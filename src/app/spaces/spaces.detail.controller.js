  (function() {
      'use strict';

      angular
          .module('app.spaces')
          .controller('spacesDetailController', spacesDetailController);

      /* @ngInject */
      function spacesDetailController($mdSidenav, spaceService, galleryService, toastService, Upload, utilService, $stateParams, triBreadcrumbsService) {
          var vm = this;
          vm.isOpen = false;
          vm.showErr = 0;
          vm.fileCount = 0;
          vm.files = [];
          if ($stateParams.spaceId) {
              vm.id = parseInt($stateParams.spaceId);
          } else {
              vm.id = 0;
          }
          vm.status = 'idle'; // idle | uploading | complete
          vm.createSpace = createSpace;
          vm.updateSpace = updateSpace;
          vm.addToArr = addToArr;
          vm.addToGallery = addToGallery;
          vm.removeFromGallery = removeFromGallery;

          if (vm.id !== 0) {
              init();
          }
          vm.removeFile = removeFile;


          function removeFile(file, index) {
              vm.files = _.map(vm.files, function(value, key) {
                  if (index === key) {
                      value.deleted = true;

                  }
                  return value;
              });
              vm.fileCount = _.filter(vm.files, function(item) {
                  return !item.deleted;
              }).length || 0;

          }

          function init() {
              var paramObj = {
                  api_token: localStorage.getItem('apiToken'),
                  space_id: vm.id

              }

              spaceService.getSpace(paramObj).then(function(data) {
                  vm.generalInfo = {
                      name: data.name,
                      description: data.description,

                  }

              });
          }
          var fileList;
          ////////////////
          function addToArr(selectedFiles) {
              vm.files.push.apply(vm.files, selectedFiles);
               vm.fileCount = _.filter(vm.files, function(item) {
                  return !item.deleted;
              }).length || 0;

          }

          function createSpace() {
              vm.showErr = 0;
              vm.disableWizardSteps = true;
              vm.files = _.filter(vm.files, function(item) {
                  return !item.deleted;
              })

              var paramObj = {
                  projectId: $stateParams.projectId,
                  name: vm.generalInfo.name,
                  description: vm.generalInfo.description
              }
              spaceService.upload(vm.files, paramObj).then(function(data) {
                  vm.showErr = 0;
              }, function(data) {
                  vm.disableWizardSteps = false;

                  vm.showErr = 1;
                  vm.errMssg = data.data.message;
              });
              // fileList=$files;

          }


          function updateSpace() {
              var paramObj = {
                  project_id: $stateParams.projectId,
                  id: vm.id || 0,
                  name: vm.generalInfo.name,
                  description: vm.generalInfo.description,
                  api_token: localStorage.getItem('apiToken')

              }
              spaceService.updateSpace(paramObj).then(function(data) {
                  vm.spaceUrl = data.space_url;

              });
          }

          function addToGallery() {
              var paramObj = {
                  space_id: vm.id,
                  api_token: localStorage.getItem('apiToken')
              }
              galleryService.addToGallery(paramObj);
          }

          function removeFromGallery() {
              // var paramObj = {
              //     user_id:
              //      gallery_id: space_id:
              // }
              galleryService.removeFromGallery();
          }
      }
  })();
