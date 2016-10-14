(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('memberDialogController', memberDialogController);

    /* @ngInject */
    function memberDialogController($mdDialog, $state, $stateParams, plan, organizationService, projectService) {
        var vm = this;

        vm.cancel = cancel;
        vm.addMember = addMember;
        vm.queryMembers = queryMembers;
        vm.inviteMember = inviteMember;
        vm.selectedMembers = [];
        vm.plan = plan;
        vm.members = organizationService.getCurrentOrganization().members || [];
        vm.members = _.map(vm.members, function(member) {
            member.name = member.name + ' - ' + member.email;
            return member;
        });

        function cancel() {
            $mdDialog.cancel();
        }

        function addMember() {

            _.each(vm.selectedMembers, function(member) {
                var paramObj = {
                    api_token: localStorage.getItem('apiToken'),
                    member_id: member.id,
                    projectId: $stateParams.projectId
                }
                projectService.addMember(paramObj).then(closeDialog, closeDialog);
            });

        }

        function closeDialog() {
            $mdDialog.hide();
        }

        function queryMembers($query) {
            var lowercaseQuery = angular.lowercase($query);

            vm.memberToBeAdded = lowercaseQuery;

            if (vm.members === []) {
                vm.memberNotFound = true;
            }

            var result = vm.members.filter(function(member) {
                var lowercaseName = angular.lowercase(member.name);
                if (lowercaseName.indexOf(lowercaseQuery) !== -1) {
                    vm.memberNotFound = false;

                    return member;
                } else {
                    vm.memberNotFound = true;
                }
            });
            return result;
        }

        function inviteMember() {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                email_id: vm.memberToBeAdded,
                projectId: $stateParams.projectId

            }
            projectService.sendInvite(paramObj).then(function() {
                closeDialog();
            });
        }

    }
})();
