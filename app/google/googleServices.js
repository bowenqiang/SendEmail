(function () {
    'use strict';
    angular.module("myApp")
        .service('googleService', function () {
            // let clientId = '{CLIENT_ID}',
            //     apiKey = '{API_KEY}',
            //     scopes = '{SCOPES}';
            let clientId = '113580546624-h19v75qfojgcqt8bskd5d9utck254teq.apps.googleusercontent.com';
            let apiKey = 'AIzaSyCzhQV-jOIWWK_YS45Qtq8xxtCPELP9wWE';
            let scopes =
                'https://www.googleapis.com/auth/userinfo.profile'
            'https://www.googleapis.com/auth/gmail.send';

            let self = this;
            self.handleClientLoad = function () {
                gapi.client.setApiKey(apiKey);
                window.setTimeout(self.checkAuth, 1);
            };

            self.checkAuth = function () {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: true
                }, self.handleAuthResult);
            };

            self.handleAuthClick = function () {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: false
                }, self.handleAuthResult);
                return false;
            };

            self.handleAuthResult = function (authResult) {
                if (authResult && !authResult.error) {

                    self.loadGmailApi();

                }
            };

            self.loadGmailApi = function () {
                gapi.client.load('gmail', 'v1', self.displayInbox);
            }

            self.displayInbox = function () {


                var request = gapi.client.gmail.users.messages.list({
                    'userId': 'me',
                    'labelIds': 'INBOX',
                    'maxResults': 10
                });
                request.execute(function (response) {
                    $.each(response.messages, function () {
                        var messageRequest = gapi.client.gmail.users.messages.get({
                            'userId': 'me',
                            'id': this.id
                        });
                        console.log(messageRequest);
                        //messageRequest.execute(appendMessageRow);
                    });
                });
            }


            self.sendMessage = function(headers_obj, message,callback)
            {
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

            self.doneSending = function(){
                alert("email is sented");
            }








        });



}());