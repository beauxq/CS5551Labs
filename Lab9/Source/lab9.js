var PORT = 8081;
var SUCCESS = 200;
var ENDPOINT = "/thingInfo";

var API1 = "https://kgsearch.googleapis.com/v1/entities:search?key=AIzaSyB5iB3hXTLR2JXODYudokbXLVa26tgi-cE&limit=1&indent=True&query=";  // append query string
var API2 = "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyB5iB3hXTLR2JXODYudokbXLVa26tgi-cE";  // post with object {"longUrl": url }

var express = require('express');
var application = express();
var request = require('request');
application.get(ENDPOINT, function (req, res) {
    var result={
        "thing": req.query.thing,
        "type": "",
        "shortUrl": ""
    };

    if (! result.thing) {
        return console.log('Error: parameter "thing" required');
    }

    request(API1 + result.thing, function (error, response, body) {
        if(error){
            return console.log('API1 error:', error);
        }

        if(response.statusCode !== SUCCESS){
            return console.log('API1 invalid status code returned:', response.statusCode);
        }

        console.log(body);
        body = JSON.parse(body);
        var description = body.itemListElement[0].result.description;
        var url = body.itemListElement[0].result.detailedDescription.url;
        result.type = description;

        request.post({
            url: API2,
            json: { longUrl: url }
        }, function(error, response, body){
            if(error){
                return console.log('API2 error:', error);
            }

            if(response.statusCode !== SUCCESS){
                return console.log('API2 invalid status code returned:', response.statusCode);
            }

            console.log(body);
            // body = JSON.parse(body);
            result.shortUrl = body.id;

            res.contentType('application/json');
            res.write(JSON.stringify(result));
            console.log(result);
            res.end();
        });
    });
});

var server = application.listen(PORT, function () {
    var port = server.address().port;

    console.log("server listening at http://localhost:%s%s", port, ENDPOINT)
});
