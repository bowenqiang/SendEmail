(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('firebaseFactory', function () {
            let factory = {
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

            factory.isRefSet = function(){
                return Object.keys(factory.ref).length ===0 && factory.ref.constructor === Object? false:true;
            }



            return factory;
        })


}());