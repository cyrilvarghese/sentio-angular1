(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, triRouteProvider) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        triSettingsProvider.setName('Sentio');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' sentio.com');
        triSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('2.9.2');
        // set the document title that appears on the browser tab
        triRouteProvider.setTitle('Sentio');
        triRouteProvider.setSeparator('|');
    }
})();
