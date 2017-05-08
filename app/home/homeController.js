(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('homeController', ["$scope","$http","googleService","$rootScope","dataFactory",function($scope,$http,googleService,$rootScope,dataFactory){
            let self=this;
            $scope.ccList = [];
            $scope.receiverList = [];
            function initPage(){
                $scope.ccList=dataFactory.getCcList();
                $scope.receiverList=dataFactory.getReceiverList();
            }

            initPage();
            
            $scope.sendEmail = function(){
                
                // let emailHead = {
                //     'To': listToArray($scope.receiverList),
                //     'Cc': listToArray($scope.ccList),
                //     'Subject': self.email['Subject']
                // }
                // console.log(self.email['message']);
                // googleService.sendMessage(emailHead,self.email['message'],function(){ alert("email sent!")});


                for(let receiver of $scope.receiverList){
                    let emailHead = {
                    'To': receiver.email,
                    'Cc': listToArray($scope.ccList),
                    'Subject': self.email['Subject']
                }
                let processedMail = messageProcess(self.email['message'],receiver);
                googleService.sendMessage(emailHead,processedMail,function(){ alert("Sent")});
                

                }
                
            };

            function listToArray(lists){
                let array=[];               
                for(let list of lists ){
                    array.push(list["email"]);
                }
                return array;
            }

            $scope.addTemplateEvent = function(val){
                $rootScope.$broadcast('addTemplateEvent',val);
            }

            function messageProcess(message,contact){
                let msg=message;
                msg = msg.replace(/\{\@fn\}/g,contact.firstname);
                msg = msg.replace(/\{\@ln\}/g,contact.familyname);
                msg = msg.replace(/\{\@tt\}/g,contact.title);
                return msg;
            }

        }]);

}());