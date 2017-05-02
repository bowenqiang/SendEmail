(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('homeController', ["$scope","googleService","dataFactory",function($scope,googleService,dataFactory){
            let self=this;
            self.userProfile = dataFactory.getProfile();
            self.email = {};
            $scope.sendEmail = function(){
                
                console.log("email: "+self.userProfile["email"]); ///can not get data from datafactory
                let emailHead = {
                    'To': self.email['To'],
                    'Subject': self.email['Subject']
                }
                googleService.sendMessage(emailHead,self.email['message'],function(){ alert("email sent!")});
                //alert("sent");
            };





        }]);

}());