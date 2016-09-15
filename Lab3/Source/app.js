/**
 * js for app.html
 */

function appButtonClick() {
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Analyzing...";
    var thisButton = document.getElementById("appButton");
    thisButton.disabled = true;
    var inputUrl = document.getElementById("inputUrl").value;
    if (! inputUrl.startsWith("http://")) {
        inputUrl = "http://" + inputUrl;
    }

    // ajax call to alchemy
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

            // ajax call to google
            var speedUrl = "https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=" + encodeURI(inputUrl) + "&key=AIzaSyB5iB3hXTLR2JXODYudokbXLVa26tgi-cE";
            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (xhttp2.readyState == 4 && xhttp2.status == 200) {
                    var responseObj = JSON.parse(xhttp2.responseText);
                    var speedScore = responseObj.ruleGroups.SPEED.score;

                    resultDiv.innerHTML = "This web page about " + topics + " has a speed score of " + speedScore + ".";
                    thisButton.disabled = false;
                }
            };
            xhttp2.open("GET", speedUrl, true);
            xhttp2.send();
        }
    };
    xhttp.open("GET", alchemyUrl, true);
    xhttp.send();
}

// enter key listener for text box
document.getElementById("inputUrl")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("appButton").click();
        }
    });
