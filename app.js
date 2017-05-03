(function () {
    'use strict';

    angular
        .module('myApp', ['ngRoute'])
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

    }

}());