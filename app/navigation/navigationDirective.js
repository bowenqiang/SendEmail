(function () {
    'use strict';

    var app = angular.module('myApp');
    app.directive('navigation', function () {
        return {
            templateUrl: "app/navigation/navigation.html",
            controller: "navigationController",
            controllerAs: 'navigation',
        }
    });

    app.controller("navigationController", ["$scope", "$location","$window","googleService", function ($scope, $location,$window,googleService) {
        var self = this;
        console.log(self);
        console.log($location);
        self.$location = $location;
        $scope.login = function(){
            
            googleService.handleAuthClick();
        }


    }]);


}());

