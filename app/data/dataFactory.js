(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('dataFactory', function(){
            let factory = {
                "profile": {},
                "ReceiverList":[],
                "CcList":[],
                "ContactList":[]
            };

            factory.getProfile = function(){
                return factory.profile;
            }
            factory.setProfile = function(profile){
                factory.profile = profile;

            }
            factory.getCcList = function(){
                return factory.CcList;
            }
            factory.setCcList = function(CcList){
                factory.CcList = CcList;
            }
            factory.setReceiverList = function(receiverlist){
                factory.ReceiverList = receiverlist
            }
            factory.getReceiverList = function(){
                return factory.ReceiverList;
            }

            factory.setContactList = function(contactlist){
                factory.ContactList = contactlist
            }

            factory.getContactList = function(receiverlist){
                return factory.ContactList;
            }

            factory.clearData = function(){
                factory.profile = {};
                factory.ReceiverList = [];
                factory.CcList = [];
                factory.ContactList = [];
            }






            return factory;

        })
}());