var mongo = require('mongodb');
var BSON = mongo.BSONPure
    , _ = require('underscore')._;

var db;

exports.setdb = function(dbObject) {
    db = dbObject;

    db.collection('requests', {safe:true}, function(err, collection) {
        if (err) {
            //console.log("Collection doesn't exist. Creating it with sample data...");
            //populateDB();
            //console.log('Collection created and populated with sample data.')
        } else {
            console.log('Ok. Collection exists.');
        }
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving request: ' + id);
    db.collection('requests', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('requests', function(err, collection) {
        collection.find().sort({_id: 0}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByKeyword = function(req, res) {
    var query = req.params.query;
    db.collection('requests', function(err, collection) {
        collection.find({ name: { $regex: '.*' + query + '*.', $options: 'i' } }).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addRequest = function(req, res, callback) {
    //var request = req.body;
    var request = {
        time_stamp:(new Date()).toString(),
        start: (new Date()).toString(),
        customer: "Kevin Halter",
        line_items: [
            {
                product_id: "50fdcf2133fe79581b000008",
                quantity: 1
            },
            {
                product_id: "50fdcced33fe79581b000001",
                quantity: 2
            }]
    };

    console.log('Adding request: ' + JSON.stringify(request));
    db.collection('requests', function(err, collection) {
        collection.insert(request, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);

                callback(result[0]);
            }
        });
    });
}

exports.updateRequest = function(req, res) {
    var id = req.params.id;
    var request = req.body;
    delete request._id;
    console.log('Updating request: ' + id);
    console.log(JSON.stringify(request));
    db.collection('requests', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, request, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating request: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(request);
            }
        });
    });
}

exports.deleteRequest = function(req, res) {
    var id = req.params.id;
    console.log('Deleting request: ' + id);
    db.collection('requests', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
exports.deleteRequestsAll = function(req, res) {
    console.log('Deleting all requests');
    db.collection('requests', function(err, collection) {
        collection.remove(null, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var requests = [];

    db.collection('requests', function(err, collection) {
        collection.insert(requests, {safe:true}, function(err, result) {});
    });

};