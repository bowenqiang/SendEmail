(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('homeController', ["$scope","$http","googleService","$rootScope","dataFactory",function($scope,$http,googleService,$rootScope,dataFactory){
            let self=this;
            $scope.ccList = [];
            $scope.receiverList = [];

            function initPage(){
                console.log("home init");
                $scope.ccList=dataFactory.getCcList();
                $scope.receiverList=dataFactory.getReceiverList();
            }

            initPage();
            
            $scope.sendEmail = function(){
                
                //console.log("email: "+$rootScope.userProfile["email"]); 
                let emailHead = {
                    'To': self.email['To'],
                    'Subject': self.email['Subject']
                }
                googleService.sendMessage(emailHead,self.email['message'],function(){ alert("email sent!")});
                //alert("sent");
            };

            $scope.loadLocalContact = function(){
                $http.get("contactlist.json").then(function(response){
                    self.contacts = response.data;
                    console.log("contact list: ");
                    console.log(self.contacts);


                },function(){
                    console.log("failed to load contact list");
                });

            }

            $scope.sendHandler = function(){
                for(let contact of self.contacts){
                    let emailHead = {
                        'To': contact.email,
                        'Subject': self.email['Subject']
                    }
                    googleService.sendMessage(emailHead,self.email['message'],function(){
                        console.log("Email to "+contact.email+" is sented");
                    });
                }
            }

            $scope.deleteReceiver = function(index){
                //TO Do

            }








        }]);

}());