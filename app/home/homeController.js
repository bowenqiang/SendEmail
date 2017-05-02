(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('homeController', ["$scope","googleService",function($scope,googleService){
            
            $scope.sendEmail = function(){
                
                console.log($scope.email);
                googleService.sendMessage($scope.email,$scope.message,googleService.doneSending);
                //alert("sent");

            };


        }]);

}());