(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('Factory', function () {
            factory = {
                "ref": {},
                "config":{
                apiKey: "AIzaSyDQAH8rJjuen65aqrpBFOyTi5TRGyWVPPM",
                authDomain: "crack-descent-166316.firebaseapp.com",
                databaseURL: "https://crack-descent-166316.firebaseio.com",
                projectId: "crack-descent-166316",
                storageBucket: "crack-descent-166316.appspot.com",
                messagingSenderId: "113580546624"
            }
            };

            factory.initFirebase = function (id) {
                firebase.initializeApp(factory.config);
                factory.ref = firebase.database().ref(id);
            }

            factory.readFirebase = function(eventType,callback,cancelCallback){
                factory.ref.on(eventType,callback,cancelCallback);
            }

            factory.setConfig = function(config){
                factory.config=config;


            }




            return factory;
        })


}());