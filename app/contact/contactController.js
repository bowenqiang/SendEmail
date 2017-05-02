(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('contactController', ["$scope","$rootScope","dataFactory","$firebaseObject","$firebaseArray","$firebaseAuth",function($scope,$rootScope,dataFactory,$firebaseObject,$firebaseArray,$firebaseAuth){
            //Initialize Firebase
            // let config = {
            //     apiKey: "AIzaSyDQAH8rJjuen65aqrpBFOyTi5TRGyWVPPM",
            //     authDomain: "crack-descent-166316.firebaseapp.com",
            //     databaseURL: "https://crack-descent-166316.firebaseio.com",
            //     projectId: "crack-descent-166316",
            //     storageBucket: "crack-descent-166316.appspot.com",
            //     messagingSenderId: "113580546624"
            // };
            // firebase.initializeApp(config);
            let self = this;
            self.authObj = $firebaseAuth();
            self.authObj.$createUserWithEmailAndPassword("my@gmail.com","123456")
            .then(function(firebaseUser){
                cconsole.log("User " + firebaseUser.uid + " created successfully!");
            }).catch(function(){
                console.error("Error: ", error);
            });



        }])

}());