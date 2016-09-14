/**
 * js for app.html
 */

function appButtonClick() {
    var thisButton = document.getElementById("appButton");
    thisButton.disabled = true;
    var inputUrl = document.getElementById("inputUrl").value;
    var alchemyUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8&outputMode=json&url="
                     + encodeURI(inputUrl);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var responseObj = JSON.parse(this.responseText);
            var topics = "nothing";
            if (responseObj.entities.length) {
                topics = responseObj.entities[0].text;
                if (responseObj.entities.length > 1) {
                    topics += " and " + responseObj.entities[1].text;
                }
            }
            document.getElementById("result").innerHTML = "This web page about " + topics + "...";
            thisButton.disabled = false;
        }
    };
    xhttp.open("GET", alchemyUrl, true);
    xhttp.send();
}
