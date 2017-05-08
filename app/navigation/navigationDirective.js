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

    app.controller("navigationController", ["$scope", "$location", "googleService", "$rootScope", "dataFactory","firebaseFactory", "$timeout",function ($scope, $location, googleService, $rootScope, dataFactory,firebaseFactory,$timeout) {
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
                $timeout(googleService.handleAuthClick($event));
                
                resolve();
            });

            authPromise.then(function () {
                self.userProfile = googleService.getBasicProfile();

                dataFactory.setProfile(self.userProfile);
                self.isLogin = googleService.signinStatus();

                firebaseFactory.initFirebase(self.userProfile['id']);

                $rootScope.$broadcast("ContactInitEvent");

                $event.preventDefault();
            });

        }


        $scope.logout = function ($event) {
            console.log("logout");
            googleService.handleSignoutClick($event);
            //TODO call logout service
            $event.preventDefault();
            self.isLogin = googleService.signinStatus();
            dataFactory.clearData();
            $rootScope.$broadcast("LogoutEvent");
        }
        //TO DO fix switchUser 
        $scope.switchUser = function ($event) {
            googleService.revokeAllScopes();
            $event.preventDefault();
            self.isLogin = googleService.signinStatus();

        }

    }]);


}());

