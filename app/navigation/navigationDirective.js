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

    app.controller("navigationController", ["$scope", "$location","googleService", "dataFactory", function ($scope, $location,googleService,dataFactory) {
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
            dataFactory.setProfile(googleService.getBasicProfile());
            console.log("dataFactory:"+dataFactory["profile"]);
            self.userProfile = dataFactory["profile"];
            $event.preventDefault();
            self.isLogin = true;
        }

        $scope.logout = function($event){
            console.log("logout");
            googleService.handleSignoutClick($event);
            //TODO call logout service
            $event.preventDefault();
            self.isLogin = false;
        }
        $scope.switchUser = function($event){
            googleService.revokeAllScopes();
            $event.preventDefault();
            self.isLogin = false;

        }


    }]);


}());

