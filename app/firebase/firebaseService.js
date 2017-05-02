(function () {
    'use strict';

    angular
        .module('myApp')
        .service('firebaseService', function () {
            // Initialize Firebase
            let config = {
                apiKey: "AIzaSyDQAH8rJjuen65aqrpBFOyTi5TRGyWVPPM",
                authDomain: "crack-descent-166316.firebaseapp.com",
                databaseURL: "https://crack-descent-166316.firebaseio.com",
                projectId: "crack-descent-166316",
                storageBucket: "crack-descent-166316.appspot.com",
                messagingSenderId: "113580546624"
            };

            let ref = "";

            this.firebaseInit = function(_ref){
                firebase.initializeApp(config);
                ref = database.ref(_ref)
            }
            
            this.firebasePush = function(data){
                ref.push(data);
            }



        })
    

}());