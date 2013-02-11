var mongo = require('mongodb');
var BSON = mongo.BSONPure
    , _ = require('underscore')._;

var db;

exports.setdb = function(dbObject) {
    db = dbObject;

    db.collection('orders', {safe:true}, function(err, collection) {
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
    console.log('Retrieving order: ' + id);
    db.collection('orders', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('orders', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByKeyword = function(req, res) {
    var query = req.params.query;
    db.collection('orders', function(err, collection) {
        collection.find({ name: { $regex: '.*' + query + '*.', $options: 'i' } }).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addOrder = function(req, res) {
    var order = req.body;
    console.log('Adding order: ' + JSON.stringify(order));
    db.collection('orders', function(err, collection) {
        collection.insert(order, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateOrder = function(req, res) {
    var id = req.params.id;
    var order = req.body;
    delete order._id;
    console.log('Updating order: ' + id);
    console.log(JSON.stringify(order));
    db.collection('orders', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, order, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating order: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(order);
            }
        });
    });
}

exports.deleteOrder = function(req, res) {
    var id = req.params.id;
    console.log('Deleting order: ' + id);
    db.collection('orders', function(err, collection) {
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

    var orders = [];

    db.collection('orders', function(err, collection) {
        collection.insert(orders, {safe:true}, function(err, result) {});
    });

};