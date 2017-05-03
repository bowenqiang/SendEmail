(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('contactController', ["$scope", "$rootScope", "dataFactory", function ($scope, $rootScope, dataFactory) {
            //Initialize Firebase
            let self = this;
            $scope.contactList = [];
            let config = {
                apiKey: "AIzaSyDQAH8rJjuen65aqrpBFOyTi5TRGyWVPPM",
                authDomain: "crack-descent-166316.firebaseapp.com",
                databaseURL: "https://crack-descent-166316.firebaseio.com",
                projectId: "crack-descent-166316",
                storageBucket: "crack-descent-166316.appspot.com",
                messagingSenderId: "113580546624"
            };
            let testdata = {
                "firstname": "zhazha",
                "familyname": "xiao",
                "email": "zhazha@gmail.com"
            };
            firebase.initializeApp(config);
            let databasse = firebase.database();
            let userProfile = dataFactory.getProfile();

            let ref = databasse.ref(userProfile['id']);
            
            ref.on('value', gotData, errData);

            function gotData(data) {
                let rawData = data.val();
                $scope.contactList = processRawData(rawData);
                console.log("contactlist: ");
                console.log($scope.contactList);
                //$scope.$apply();
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

            $scope.addContact = function(){
                console.log("AddContact");
                ref.push($scope.contact);


            }



            //ref.push(testdata);




        }])

}());