(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('dataFactory', function(){
            let factory = {
                "profile": {},
                "ReceiverList":[],
                "CcList":[]
            };

            factory.getProfile = function(){
                return factory.profile;
            }
            factory.setProfile = function(profile){
                factory.profile = profile;

            }
            factory.getCcList = function(){
                return factory.Cclist;
            }
            factory.setCcList = function(CcList){
                factory.CcList = CcList;
            }
            factory.setReceiverList = function(receiverlist){
                factory.ReceiverList = receiverlist
            }
            factory.getReceiverList = function(receiverlist){
                factory.ReceiverList = receiverlist
            }



            return factory;

        })
}());