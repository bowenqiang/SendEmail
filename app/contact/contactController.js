(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('contactController', ["$scope", "$timeout", "$rootScope", "dataFactory", function ($scope, $timeout, $rootScope, dataFactory) {
            let self = this;
            $scope.contactList = [];
            $scope.userProfile = {};
            //Initialize Firebase     
            $scope.contactList = [];
            let config = {
                apiKey: "AIzaSyDQAH8rJjuen65aqrpBFOyTi5TRGyWVPPM",
                authDomain: "crack-descent-166316.firebaseapp.com",
                databaseURL: "https://crack-descent-166316.firebaseio.com",
                projectId: "crack-descent-166316",
                storageBucket: "crack-descent-166316.appspot.com",
                messagingSenderId: "113580546624"
            };
            // let testdata = {
            //     "firstname": "zhazha",
            //     "familyname": "xiao",
            //     "email": "zhazha@gmail.com"
            // };
            firebase.initializeApp(config);
            let databasse = firebase.database();
            let ref = {};
            $scope.userProfile = dataFactory.getProfile();
            console.log("user's id" + $scope.userProfile['id']);
            ref = databasse.ref($scope.userProfile['id']);
            ref.on('value', gotData, errData);


            $scope.addContact = function () {
                ref.push($scope.contact);
                $scope.contact = {};
            }



            function gotData(data) {
                $timeout(function(){
                let rawData = data.val();
                $scope.contactList = processRawData(rawData);
                console.log("contactlist: ");
                console.log($scope.contactList);

                });

                // $scope.$digest();
            }

            function errData(err) {
                Console.log("Error!");
                console.log(err);
            }

            function processRawData(rawData) {
                let cleanData = [];
                angular.forEach(rawData, function (value, key) {
                    cleanData.push(value);
                });
                return cleanData;
            }

            // $scope.addContact = function(){
            //     console.log("AddContact");
            //     ref.push($scope.contact);
            // }

            //ref.push(testdata);

            // $scope.addContact = function(){
            //     $scope.contactList.push($scope.contact);
            //     $scope.contact={};
            // }

            // $scope.showDetail = function(){
            //     alert("you clicked");

            // }

            // $scope.importClick = function(){

            // }

            // $scope.exportClick = function(){

            // }




        }])

}());