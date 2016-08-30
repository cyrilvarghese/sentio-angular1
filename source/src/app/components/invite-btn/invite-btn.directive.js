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
            template:"<md-button>  <md-icon md-font-icon='zmdi zmdi-accounts-add'></md-icon>Invite Member</md-button>",
            link: link,
            restrict: 'EAC'
        };
        return directive;

        function link(scope, element, attrs, require) {
            
        }
    }
})();