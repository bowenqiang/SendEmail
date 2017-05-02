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
        self.userProfile = {};
        $scope.init = function(){
            console.log("onload");
            googleService.handleClientLoad();

        };
        $scope.login = function($event){          
            googleService.handleAuthClick($event);
            //googleService.handleAuthClick();
            self.userProfile = googleService.getBasicProfile();
            self.isLogin = true;
        }

        $scope.logout = function($event){
            console.log("logout");
            googleService.handleSignoutClick($event);
            //TODO call logout service
            $event.preventDefault();
            self.isLogin = false;
        }


    }]);


}());

