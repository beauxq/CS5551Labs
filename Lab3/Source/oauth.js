/**
 * google sign in
 */

var googleUser;

function onSignIn(response) {
    googleUser = response;


    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

/* ideas
GET https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=http%3A%2F%2Fwww.zophar.net&key={YOUR_API_KEY}

 http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
 "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
 "&outputMode=json&text=" +
 */
