var mongo = require('mongodb');
var BSON = mongo.BSONPure
    , _ = require('underscore')._;

var db = null;

exports.setdb = function(dbObject) {
    db = dbObject;

    db.collection('attributes', {safe:true}, function(err, collection) {
        console.log('*** attributes ***');
        console.log('Checking that collection exists');
        var items = collection.find();
        var rowCount = items.totalNumberOfRecords;
        console.log(items);
        console.log(rowCount);

        if (err || rowCount == 0) {
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
    console.log('Retrieving attribute: ' + id);
    db.collection('attributes', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('attributes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addAttribute = function(req, res) {
    var attribute = req.body;
    console.log('Adding attribute: ' + JSON.stringify(attribute));
    db.collection('attributes', function(err, collection) {
        collection.insert(attribute, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateAttribute = function(req, res) {
    var id = req.params.id;
    var attribute = req.body;
    delete attribute._id;
    console.log('Updating attribute: ' + id);
    console.log(JSON.stringify(attribute));
    db.collection('attributes', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, attribute, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating attribute: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(attribute);
            }
        });
    });
}

exports.deleteAttribute = function(req, res) {
    var id = req.params.id;
    console.log('Deleting attribute: ' + id);
    db.collection('attributes', function(err, collection) {
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

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
var populateDB = function() {

    var attributes = [
    {
        "key": "horse-power",
        "name": "Horse Power",
        "input_type": "select-one",
        "data_type": "text",
        "options": ["100", "150", "200"]
    },
    {
        "key": "length-boom-lift",
        "name": "Length",
        "input_type": "select-one",
        "data_type": "text",
        "options": ["100", "150", "200"]
    }];

    db.collection('attributes', function(err, collection) {
        collection.insert(attributes, {safe:true}, function(err, result) {});
    });

};