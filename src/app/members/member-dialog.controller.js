(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('memberDialogController', memberDialogController);

    /* @ngInject */
    function memberDialogController($mdDialog, $state, $stateParams, projectService) {
        var vm = this;

        vm.cancel = cancel;
        vm.addMember = addMember;
        vm.queryMembers = queryMembers;
        vm.inviteMember = inviteMember;
        vm.selectedMembers = [];

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
            var members = localStorage.getItem("currentOrg") ? JSON.parse(localStorage.getItem("currentOrg")).members : [];
            members = _.map(members, function(member) {

                member.name = member.name + ' - ' + member.email;
                return member;
            });
            return members.filter(function(member) {
                var lowercaseName = angular.lowercase(member.name);
                if (lowercaseName.indexOf(lowercaseQuery) !== -1) {
                    vm.memberNotFound = false;

                    return member;
                } else {
                    vm.memberNotFound = true;
                }
            });
        }

        function inviteMember() {
            var paramObj = {
                api_token: localStorage.getItem('apiToken'),
                email_id: vm.memberToBeAdded,
                projectId: $stateParams.projectId

            }
            projectService.sendInvite(paramObj);
        }

    }
})();
