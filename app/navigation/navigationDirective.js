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
        //console.log(self);
        //console.log($location);
        self.$location = $location;
        self.isLogin = false;
        self.username = "Jack";
        $window.onload = function(){
            //alert("onload");
            googleService.handleClientLoad();

        };
        $scope.login = function(){          
            googleService.handleAuthClick();
            //googleService.handleAuthClick();
            self.isLogin = true;
        }

        $scope.logout = function($event){
            alert("logout");
            googleService.handleSignoutClick();
            //TODO call logout service
            $event.preventDefault();
            self.isLogin = false;
        }


    }]);


}());

