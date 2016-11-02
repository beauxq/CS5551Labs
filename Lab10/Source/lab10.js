var PORT = 8081;
var SUCCESS = 200;
var ENDPOINT = "/data";
var DATABASE_URL = "mongodb://beauxq:beauxq@ds051873.mlab.com:51873/tut8test";

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var request = require('request');
var cors = require('cors');

var application = express();

application.use(cors());
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

application.post(ENDPOINT, function (req, res) {
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

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

var insertDocument = function(db, data, callback) {
    db.collection('demoase').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};

// static files served
application.use(express.static("public"));

var server = application.listen(PORT, function () {
    var port = server.address().port;

    console.log("server listening at http://localhost:%s", port);
    console.log("serving API at http://localhost:%s%s", port, ENDPOINT)
});
