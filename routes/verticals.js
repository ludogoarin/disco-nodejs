var mongo = require('mongodb');
var BSON = mongo.BSONPure
    , _ = require('underscore')._;

var db;

exports.setdb = function(dbObject) {
    db = dbObject;

    db.collection('verticals', {safe:true}, function(err, collection) {
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
    console.log('Retrieving vertical: ' + id);
    db.collection('verticals', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('verticals', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addVertical = function(req, res) {
    var vertical = req.body;
    console.log('Adding vertical: ' + JSON.stringify(vertical));
    db.collection('verticals', function(err, collection) {
        collection.insert(vertical, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateVertical = function(req, res) {
    var id = req.params.id;
    var vertical = req.body;
    delete vertical._id;
    console.log('Updating vertical: ' + id);
    console.log(JSON.stringify(vertical));
    db.collection('verticals', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, vertical, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating vertical: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(vertical);
            }
        });
    });
}

exports.deleteVertical = function(req, res) {
    var id = req.params.id;
    console.log('Deleting vertical: ' + id);
    db.collection('verticals', function(err, collection) {
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
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var verticals = [
    {
        name: "Industrial Equipment",
        image_url: "http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png"
    },
    {
        name: "Construction",
        image_url: "http://www.coasttocoasteventrentals.com/img/showroomSmLabel.jpg"
    }];

    db.collection('verticals', function(err, collection) {
        collection.insert(verticals, {safe:true}, function(err, result) {});
    });

};