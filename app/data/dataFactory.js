(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('dataFactory', function(){
            let factory = {
                "profile": {},
                "email": {}
            };

            factory.getProfile = function(){
                return factory.profile;
            }
            factory.setProfile = function(profile){
                factory.profile = profile;

            }
            factory.getEmail = function(){
                return factory.email;
            }
            factory.setEmail = function(email){
                factory.email = email;

            }

            return factory;

        })
}());