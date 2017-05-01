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
            'https://www.googleapis.com/auth/gmail.readonly ' +
            'https://www.googleapis.com/auth/gmail.send';

        this.handleClientLoad = function () {
            gapi.client.setApiKey(apiKey);
            window.setTimeout(this.checkAuth, 1);
        };

        this.checkAuth = function () {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: true
            }, this.handleAuthResult);
        };

        this.handleAuthClick = function () {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false
            }, this.handleAuthResult);
            return false;
        };

        this.handleAuthResult = function (authResult) {
            if (authResult && !authResult.error) {
                this.loadGmailApi();

            }
        };

        this.loadGmailApi = function () {
            gapi.client.load('gmail', 'v1', function () {
                let request = gapi.client.oauth2.userinfo.get();
                request.execute(function (resp) {
                    console.log(resp.email);
                    ///TO DO
                    // Save User Info to Service or Session or Cookies
                }
                );

            });
        };


    });



}());