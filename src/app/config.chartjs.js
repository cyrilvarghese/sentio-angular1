(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config($httpProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfCookieName = 'X-CSRF-TOKEN';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
        $httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = localStorage.getItem('csrf');
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // // Configure all charts to use material design colors
        // ChartJsProvider.setOptions({
        //     colours: [
        //         '#4285F4', // blue
        //         '#DB4437', // red
        //         '#F4B400', // yellow
        //         '#0F9D58', // green
        //         '#AB47BC', // purple
        //         '#00ACC1', // light blue
        //         '#FF7043', // orange
        //         '#9E9D24', // browny yellow
        //         '#5C6BC0' // dark blue
        //     ],
        //     responsive: true
        // });
    }
})();
