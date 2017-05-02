(function () {
    'use strict';

    angular
        .module('myApp', ['ngRoute', 'firebase'])
        .config(ConfigConfig)

    /** @ngInject */
    function ConfigConfig($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: "app/home/index.html",
                controller: "homeController",
                controllerAs: "home"
            })
            .when('/home', {
                templateUrl: "app/home/index.html",
                controller: "homeController",
                controllerAs: "home"
            })
            .when('/contact', {
                templateUrl: "app/contact/index.html",
                controller: "contactController",
                controllerAs: "contact"
            })
            .otherwise({
                template: "<h1>None</h1><p>The page you are looking for is not exist anymore or haven't been created yet.</p>"
            });
        let config = {
            apiKey: "AIzaSyDQAH8rJjuen65aqrpBFOyTi5TRGyWVPPM",
            authDomain: "crack-descent-166316.firebaseapp.com",
            databaseURL: "https://crack-descent-166316.firebaseio.com",
            projectId: "crack-descent-166316",
            storageBucket: "crack-descent-166316.appspot.com",
            messagingSenderId: "113580546624"
        };
        firebase.initializeApp(config);

    }

}());