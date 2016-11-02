var PORT = 8081;
var ENDPOINT = "/data";
var READ_ENDPOINT = "/dataread";
var DEL_ENDPOINT = "/datadel";
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
/**
 *  To create a new user, pass an object like this to this API:
 *
 *  {
 *      'username': username,
 *      'password': password,
 *      'firstName': firstName,
 *      'lastName': lastName,
 *      'email': email
 *  }
 */
application.post(ENDPOINT, function (req, res) {
    var documentToInsert = req.body;

    MongoClient.connect(DATABASE_URL, function(err, db) {
        if(err) {
            res.status(StatusEnum.SERVER_ERROR);
            res.write("error connecting to database");
            res.end();
            return;
        }

        checkUsernameExists(db, documentToInsert.username, function(exists) {
            if (exists) {
                res.status(StatusEnum.CONFLICT);
                res.write("username already exists");
                res.end();
            }
            else {  // username doesn't already exist
                upsertDocument(db, documentToInsert, function() {
                    res.write("insert success");
                    res.end();
                });
            }
        });
    });
});

// post to READ_ENDPOINT = read from CRUD
/**
 *  Pass labeled search parameters for find()
 *
 *  example:
 *  to return all users with usernames and names:
 *  {
 *      'query': {},
 *      'fields': {
 *          'username': true,
 *          'firstName': true,
 *          'lastName': true
 *      }
 *  }
 *
 *  to return user with specified username
 *  {
 *      'query': { 'username': username }
 *  }
 *
 *  @returns: array of search results
 */
application.post(READ_ENDPOINT, function (req, res) {
    var searchParameters = req.body;

    console.log("received read request for:");
    console.log(searchParameters);

    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) {
            res.status(StatusEnum.SERVER_ERROR);
            res.write("error connecting to database");
            res.end();
        }

        getResults(db, searchParameters, function(results) {
            res.contentType('application/json');
            res.write(JSON.stringify({'results': results}));
            res.end();
        });
    });
});

// put = update from CRUD
application.put(ENDPOINT, function(req, res) {
    var documentToUpdate = req.body;

    if (! documentToUpdate._id) {
        res.status(StatusEnum.BAD_REQUEST);
        res.write("need an already existing user");
        res.end();
        return;
    }
    delete documentToUpdate._id;
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) {
            res.status(StatusEnum.SERVER_ERROR);
            res.write("error connecting to database");
            res.end();
            return;
        }

        upsertDocument(db, documentToUpdate, function(err) {
            if (err) {
                res.status(StatusEnum.SERVER_ERROR);
                res.write(err);
                res.end();
                return;
            }
            res.write("update success");
            res.end();
        });
    });
});

var testPut = function() {
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) {
            console.log("error connecting to database");
            return;
        }

        getResults(db, {'username': "un"}, function(results) {
            var copy = results[0];

            copy.lastName = "ln7";

            upsertDocument(db, copy, function() {
                console.log("update success");
            });
        });
    });
};

// post to DEL_ENDPOINT = delete from CRUD
/**
 *  pass a document with a username
 */
application.post(DEL_ENDPOINT, function(req, res) {
    var usernameToDelete = req.body.username;

    if (! usernameToDelete) {
        res.status(StatusEnum.BAD_REQUEST);
        res.write("need a document with a username");
        res.end();
        return;
    }
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) {
            res.status(StatusEnum.SERVER_ERROR);
            res.write("error connecting to database");
            res.end();
            return;
        }

        removeDocument(db, usernameToDelete, function() {
            res.write("user removed");
            res.end();
        });
    });
});

var testDelete = function() {
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) {
            console.log("error connecting to database");
            return;
        }

        removeDocument(db, "un2", function() {
            console.log("user removed");
        });
    });
};

var upsertDocument = function(db, data, callback) {
    db.collection(COLLECTION).updateOne({'username':data.username}, data, {upsert:true, w: 1}, function(err, res) {
        if(err) {
            console.log("error creating user");
            console.log(err);
            callback(err);
            return;
        }
        console.log("inserted a document into the " + COLLECTION + " collection");
        console.log("res: " + res);
        callback(null);  // no error
    });
};

var removeDocument = function(db, usernameToDelete, callback) {
    db.collection(COLLECTION).findOneAndDelete({'username': usernameToDelete}, function(err, res) {
        if(err) {
            res.status(StatusEnum.SERVER_ERROR);
            res.write("error deleting user");
            res.end();
            return;
        }
        console.log("remove success");
        callback();
    });
};

var checkUsernameExists = function(db, username, callback) {
    db.collection(COLLECTION).findOne({'username':username}, function(err, document) {
        if (err) {
            console.log("error looking for username in database");
        }
        console.log(document);
        callback(document !== null);
    });
};

var getResults = function(db, searchParameter, callback) {
    db.collection(COLLECTION).find(searchParameter.query,
                                   searchParameter.fields,
                                   {},  // options
                                   function(err, resultCursor) {
        console.log("callback function of find");
        if (err) {
            console.log("error searching database");
            callback([]);
        }
        else {
            resultCursor.toArray(function(err, resultArray) {
                if (err) {
                    console.log("error retrieving search results from database");
                    callback([]);
                }
                else {
                    console.log("callback function of toArray");
                    // console.log(resultArray);
                    callback(resultArray);
                }
            });
        }
    });
};

// static files served
application.use(express.static("public"));

var server = application.listen(PORT, function () {
    var port = server.address().port;

    console.log("server listening at http://localhost:%s", port);
    console.log("serving API at http://localhost:%s%s", port, ENDPOINT);
});
