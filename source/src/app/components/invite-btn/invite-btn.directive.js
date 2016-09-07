(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('inviteBtn', inviteBtn);

    /* @ngInject */
    function inviteBtn() {
        // Usage:
        //  <div tri-wizard>
        //      <form tri-wizard-form>
        //      </form>
        //  </div>
        //
        var directive = {
            template: "<md-button ng-click='inviteMember()'>  <md-icon md-font-icon='zmdi zmdi-accounts-add'></md-icon>Invite Member</md-button>",
            link: link,
            controller: ['$scope', '$mdDialog', inviteButtonController],
            scope:{
                'showMembers': '&showMembers'
            },
            restrict: 'EAC'
        };
        return directive;

        function inviteButtonController($scope, $mdDialog,projectService) {
            $scope.inviteMember = function() {
                console.log('asdas');
            }

        }

        function link(scope, element, attrs, require) {
            
        }
    }
})();
