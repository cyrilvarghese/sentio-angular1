(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
             'angularMoment', 'md.data.table', 'ngFileUpload',
            // 'seed-module',
            // uncomment above to activate the example seed module
            'app.services',
            'app.components',
            'app.translate',
            // only need one language?  if you want to turn off translations
            // comment out or remove the 'app.translate', line above

            'app.permission',
            'app.authentication',
            'app.organizations',
            'app.projects',
            'app.spaces',
            'app.gallery',
            // dont need permissions?  if you want to turn off permissions
            // comment out or remove the 'app.permission', line above
            // also remove 'permission' from the first line of dependencies
            // https://github.com/Narzerus/angular-permission see here for why
            // 'app.examples',
            'ngFileUpload'
         
        ])

    // set a constant for the API we are connecting to
    .constant('API_CONFIG', {
        'url': 'http://triangular-api.oxygenna.com/',
        'baseUrl': 'http://52.43.239.79/',
        'authenticationUrl': 'api/v1/user/',
        'organizationsUrl': 'api/v1/org/',
        'sharedUrl':'api/v1/sentio/',
        'projectsUrl':'api/v1/project/',
        'spacesUrl':'api/v1/space/',
        'logoUrl':'api/v1/logo/',
        'themeUrl':'api/v1/theme/',
        'galleryUrl':'api/v1/gallery/',
        'apiKey':'7nZOLvhjP21/XqzuQCb0uylmBnbAtcPMil+6momlp5E='
    });
    //         C:\Program Files (x86)\Google\Chrome\Application>chrome.exe --user-data-dir="C:/ Chrome dev session" --disable-web-security
})();
