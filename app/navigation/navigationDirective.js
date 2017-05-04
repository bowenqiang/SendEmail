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

    app.controller("navigationController", ["$scope", "$location", "googleService", "$rootScope", "dataFactory", function ($scope, $location, googleService, $rootScope, dataFactory) {
        var self = this;
        //console.log(self);
        //console.log($location);
        self.$location = $location;
        self.isLogin = false;  //Temp solution
        self.userProfile = {};
        $scope.init = function () {
            // console.log("onload");
            // googleService.handleClientLoad();

            googleService.handleClientLoad();
            self.isLogin = googleService.signinStatus();

        };
        $scope.login = function ($event) {

            let authPromise = new Promise(function (resolve, reject) {
                console.log("Enter Promoise");
                googleService.handleAuthClick($event);
                resolve();
            });

            authPromise.then(function () {
                self.userProfile = googleService.getBasicProfile();
                console.log("navi profile" + self.userProfile['email']);
                dataFactory.setProfile(self.userProfile);
                self.isLogin = googleService.signinStatus();
                $rootScope.initContactPage();
                $event.preventDefault();
            });

        }


        $scope.logout = function ($event) {
            console.log("logout");
            googleService.handleSignoutClick($event);
            //TODO call logout service
            $event.preventDefault();
            self.isLogin = googleService.signinStatus();
        }
        //TO DO fix switchUser 
        $scope.switchUser = function ($event) {
            googleService.revokeAllScopes();
            $event.preventDefault();
            self.isLogin = googleService.signinStatus();

        }

    }]);


}());

