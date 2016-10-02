(function() {
    'use strict';

    angular
        .module('app.components')
        .directive('paymentBtn', paymentBtn);

    /* @ngInject */
    function paymentBtn() {
        // Usage:
        //  <div tri-wizard>
        //      <form tri-wizard-form>
        //      </form>
        //  </div>
        //
        var directive = {
            templateUrl: '../app/components/payment-btn/payment-btn.html',
            link: link,
            controller: ['$scope', '$mdDialog', paymentButtonController],
            scope: {
                planId: '=planId'
            },
            restrict: 'EAC'
        };
        return directive;

        function paymentButtonController($scope, $mdDialog, projectService) {
             

        }

        function link(scope, element, attrs, require) {

        }
    }
})();
