(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('contactController', ["$scope", "$timeout", "$rootScope", "dataFactory","firebaseFactory", function ($scope, $timeout, $rootScope, dataFactory,firebaseFactory) {
            let self = this;
            let ref = {};
            $scope.isAddformShown = false;
            $scope.contactList = [];
            $scope.userProfile = {};
            $scope.receiverList = [];
            $scope.ccList = [];
            function selfInit(){
                $timeout(function(){
                    console.log("Self Init");
                $scope.contactList = dataFactory.getContactList();
                $scope.ccList = dataFactory.getCcList();
                $scope.receiverList = dataFactory.getReceiverList();
                if(firebaseFactory.isRefSet()){
                    firebaseFactory.readFirebase('value',gotData,errData);
                }
                
                //console.log($scope.contactList);
                });
                
            }
            selfInit();

            $rootScope.$on("ContactInitEvent",function(){
                console.log("contact init event");
                selfInit();
            });

            $rootScope.$on("LogoutEvent",function(){
                console.log("logout event");
                selfInit();
            })
            

            // $rootScope.initContactPage = function () {
            //     console.log("contact initl");
            //     //Initialize Firebase
            //     let config = {
            //         apiKey: "AIzaSyDQAH8rJjuen65aqrpBFOyTi5TRGyWVPPM",
            //         authDomain: "crack-descent-166316.firebaseapp.com",
            //         databaseURL: "https://crack-descent-166316.firebaseio.com",
            //         projectId: "crack-descent-166316",
            //         storageBucket: "crack-descent-166316.appspot.com",
            //         messagingSenderId: "113580546624"
            //     };
            //     if ($scope.userProfile != [])
            //         firebase.initializeApp(config);
            //     let databasse = firebase.database();
            //     $scope.userProfile = dataFactory.getProfile();
            //     console.log("user's id" + $scope.userProfile['id']);
            //     ref = databasse.ref($scope.userProfile['id']);
            //     ref.on('value', gotData, errData);

    
            // }

            //ref.on('value', gotData, errData);

            $scope.addContact = function () {
                ref.push($scope.contact);
                $scope.contact = {};
            }

            $scope.editContact = function () {

            }

            function gotData(data) {
                $timeout(function () {
                    let rawData = data.val();
                    $scope.contactList = processRawData(rawData);
                    dataFactory.setContactList($scope.contactList);
                });
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

            $scope.listClick = function (index) {
                //alert(index);
                $scope.isAddformShown = false;
                $scope.contactDetail = $scope.contactList[index];
            }

            $scope.showAddForm = function () {
                $scope.isAddformShown = true;
            }

            $scope.addToList = function () {
                $scope.receiverList.push($scope.contactDetail);
                //$scope.isAddformShown = false;


            }

            $scope.addCcList = function () {
                $scope.ccList.push($scope.contactDetail);
            }

            $scope.confirmList = function () {
                dataFactory.setCcList($scope.ccList);
                dataFactory.setReceiverList($scope.receiverList);
            }

        }])

}());