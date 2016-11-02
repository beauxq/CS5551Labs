var PORT = 8081;
var ENDPOINT = "/data";
var DATABASE_URL = "mongodb://beauxq:beauxq@ds051873.mlab.com:51873/tut8test";
var COLLECTION = "lab10Collection";
var StatusEnum = Object.freeze({
    SUCCESS: 200,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500
});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
//var request = require('request');
var cors = require('cors');

var application = express();

application.use(cors());
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

// post = create from CRUD
application.post(ENDPOINT, function (req, res) {
    var documentToInsert = req.body;

    MongoClient.connect(DATABASE_URL, function(err, db) {
        if(err)
        {
            res.status(StatusEnum.SERVER_ERROR);
            res.write("error connecting to database");
            res.end();
        }

        checkUsernameExists(db, documentToInsert.username, function(exists) {
            if (exists) {
                res.status(StatusEnum.CONFLICT);
                res.write("username already exists");
                res.end();
            }
            else {  // username doesn't already exist
                insertDocument(db, documentToInsert, function() {
                    res.write("insert success");
                    res.end();
                });
            }
        });
    });
});

// get = read from CRUD
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

        if(response.statusCode !== StatusEnum.SUCCESS){
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
    db.collection(COLLECTION).insertOne(data, function(err, res) {
        if(err)
        {
            res.status(StatusEnum.SERVER_ERROR);
            res.write("error creating user");
            res.end();
        }
        console.log("inserted a document into the " + COLLECTION + " collection");
        callback();
    });
};

var checkUsernameExists = function(db, username, callback) {
    db.collection(COLLECTION).findOne({'username':username}, function(err, document) {
        console.log(document);
        callback(document !== null);
    });
};

// static files served
application.use(express.static("public"));

var server = application.listen(PORT, function () {
    var port = server.address().port;

    console.log("server listening at http://localhost:%s", port);
    console.log("serving API at http://localhost:%s%s", port, ENDPOINT)
});
