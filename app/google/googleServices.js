(function () {
    'use strict';
    angular.module("myApp")
        .service('googleService', function () {
            // let clientId = '{CLIENT_ID}',
            //     apiKey = '{API_KEY}',
            //     scopes = '{SCOPES}';
            let self = this;
            let clientId = '113580546624-h19v75qfojgcqt8bskd5d9utck254teq.apps.googleusercontent.com';
            let apiKey = 'AIzaSyCzhQV-jOIWWK_YS45Qtq8xxtCPELP9wWE';
            let peopleApiDiscovery;
            let scopes ='profile';
            let GoogleUser = {};

            self.handleClientLoad = function(){
                console.log("handleClientLoad");
                let loadGapiClient = new Promise(function(resolve,reject){
                    gapi.load('client:auth2',resolve);
                });

                let fetchPeopleApiDiscovery = fetch('people/people_rest_v1.json').then(
                    function(resp){
                        return resp.json();
                    }).then(function(json){
                        peopleApiDiscovery = json;
                        return Promise.resolve();
                    });
                    Promise.all([loadGapiClient,fetchPeopleApiDiscovery]).then(self.initClient);
            }

            self.initClient = function(){
                console.log("iniClient");
                gapi.client.init({
                    apiKey:apiKey,
                    discoveryDocs:[peopleApiDiscovery],
                    clientId: clientId,
                    scope: scopes
                }).then(function(){
                    console.log("isSignedIn");
                    gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);

                    self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

                })
            }

            self.updateSigninStatus = function(isSignedIn) {
                console.log("updateSigninStatus");
                console.log(isSignedIn);
                if(isSignedIn){
                    console.log("signin successfully");
                    self.makeApiCall();
                }else{
                    console.log("failed to signin");
                }
            }

            self.handleAuthClick = function(event){
                console.log("handleauthClick");
                gapi.auth2.getAuthInstance().signIn();
                GoogleUser = gapi.auth2.getAuthInstance().currentUser.get();
            }

            self.handleSignoutClick = function(event) {
                console.log("handleSignoutClick");
                gapi.auth2.getAuthInstance().signOut();
                
                gapi.auth2.getAuthInstance().disconnect();
            }

            self.makeApiCall = function(){
                console.log("makeApiCall");
            }

            self.getBasicProfile = function(){
                return {
                    'id':GoogleUser.getBasicProfile().getId(),
                    'name':GoogleUser.getBasicProfile().getName(),
                    'givename':GoogleUser.getBasicProfile().getGivenName(),
                    'familyname':GoogleUser.getBasicProfile().getFamilyName(),
                    'imageurl':GoogleUser.getBasicProfile().getImageUrl(),
                    'email':GoogleUser.getBasicProfile().getEmail()
                };
            }


            

            








        });



}());