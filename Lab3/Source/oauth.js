/**
 * google sign in
 */

var googleUser;

function onSignIn(response) {
    googleUser = response;

    if (googleUser.isSignedIn()) {
        document.getElementById("signOutDiv").innerHTML = '<input type="button" onclick="signOut()" value="Sign Out">';
        document.getElementById("gotoApp").innerHTML = '<a href="app.html">Go To App</a>';
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

/* ideas
GET https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=http%3A%2F%2Fwww.zophar.net&key={YOUR_API_KEY}

 http://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8&outputMode=json&url=http://www.zophar.net/"
 */
