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
                    'To': listToArray($scope.receiverList),
                    'Cc': listToArray($scope.ccList),
                    'Subject': self.email['Subject']
                }
                googleService.sendMessage(emailHead,self.email['message'],function(){ alert("email sent!")});
                //alert("sent");
            };

            function listToArray(lists){
                let array=[];               
                for(let list of lists ){
                    array.push(list["email"]);
                }
                return array;
            }

        }]);

}());