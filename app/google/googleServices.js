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
            let scopes = 'profile ' +
                'https://www.googleapis.com/auth/gmail.readonly '
                + 'https://www.googleapis.com/auth/gmail.send';
            let GoogleUser = {};

            self.handleClientLoad = function () {
                console.log("handleClientLoad");
                let loadGapiClient = new Promise(function (resolve, reject) {
                    gapi.load('client:auth2', resolve);
                });

                let fetchPeopleApiDiscovery = fetch('people/people_rest_v1.json').then(
                    function (resp) {
                        return resp.json();
                    }).then(function (json) {
                        peopleApiDiscovery = json;
                        return Promise.resolve();
                    });
                Promise.all([loadGapiClient, fetchPeopleApiDiscovery]).then(self.initClient);
            }

            self.initClient = function () {
                console.log("iniClient");
                gapi.client.init({
                    apiKey: apiKey,
                    discoveryDocs: [peopleApiDiscovery, "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
                    clientId: clientId,
                    scope: scopes
                }).then(function () {
                    console.log("isSignedIn");
                    gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);

                    self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

                })
            }

            // self.SigninStatus = function() {
            //     return gapi.auth2.getAuthInstance().isSignedIn.get();
            // }

            self.updateSigninStatus = function (isSignedIn) {
                console.log("updateSigninStatus");
                console.log(isSignedIn);
                if (isSignedIn) {
                    console.log("signin successfully");
                    self.makeApiCall();
                } else {
                    console.log("failed to signin");
                }
            }

            self.handleAuthClick = function (event) {
                console.log("handleauthClick");
                gapi.auth2.getAuthInstance().signIn();
                GoogleUser = gapi.auth2.getAuthInstance().currentUser.get();
            }

            self.handleSignoutClick = function (event) {
                console.log("handleSignoutClick");
                gapi.auth2.getAuthInstance().signOut();


            }
            self.revokeAllScopes = function () {
                gapi.auth2.getAuthInstance().disconnect();
            }

            self.makeApiCall = function () {
                console.log("makeApiCall");
                //TO DO
            }

            self.getBasicProfile = function () {
                return {
                    'id': GoogleUser.getBasicProfile().getId(),
                    'name': GoogleUser.getBasicProfile().getName(),
                    'givename': GoogleUser.getBasicProfile().getGivenName(),
                    'familyname': GoogleUser.getBasicProfile().getFamilyName(),
                    'imageurl': GoogleUser.getBasicProfile().getImageUrl(),
                    'email': GoogleUser.getBasicProfile().getEmail()
                };
            }


            // self.sendMessage = function(userId, email, callback) {
            //     // Using the js-base64 library for encoding:
            //     // https://www.npmjs.com/package/js-base64
            //     var base64EncodedEmail = Base64.encodeURI(email);
            //     var request = gapi.client.gmail.users.messages.send({
            //         'userId': userId,
            //         'resource': {
            //             'raw': base64EncodedEmail
            //         }
            //     });
            //     request.execute(callback);
            // }

            self.sendMessage = function (headers_obj, message, callback) {
                console.log("sendMessage");
                var email = '';
                for (var header in headers_obj)
                    email += header += ": " + headers_obj[header] + "\r\n";
                email += "\r\n" + message;
                console.log(email);
                var sendRequest = gapi.client.gmail.users.messages.send({
                    'userId': 'me',
                    'resource': {
                        'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
                    }
                });
                sendRequest.execute(callback)
            }















        });



}());