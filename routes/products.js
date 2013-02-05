var mongo = require('mongodb');
var BSON = mongo.BSONPure
    , _ = require('underscore')._;

var db;

exports.setdb = function(dbObject) {
    db = dbObject;

    db.collection('products', {safe:true}, function(err, collection) {
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
    console.log('Retrieving product: ' + id);
    db.collection('products', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('products', function(err, collection) {
        collection.find().sort({name: 1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByCategoryId = function(req, res) {
    var categoryId = req.params.categoryId;
    db.collection('products', function(err, collection) {
        collection.find({ category_ids: { $all: [categoryId]} }).sort({name: 1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addProduct = function(req, res) {
    var product = req.body;
    console.log('Adding product: ' + JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.insert(product, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateProduct = function(req, res) {
    var id = req.params.id;
    var product = req.body;
    delete product._id;
    console.log('Updating product: ' + id);
    console.log(JSON.stringify(product));
    db.collection('products', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, product, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating product: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(product);
            }
        });
    });
}

exports.deleteProduct = function(req, res) {
    var id = req.params.id;
    console.log('Deleting product: ' + id);
    db.collection('products', function(err, collection) {
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

    var products = [
    {
        category_ids: [], // array of category ids
        name: "Telescopic Boom",
        type: "rental",
        sku: "asd",
        image_url: "http://dsc.discovery.com/tv/how-stuff-works/img/beer.jpg",
        attribute_ids: [],
        rates: [{
            unit: "day",
            unit_count: 1,
            price: 10.00
        }]
    },
    {
        category_ids: [], // array of category ids
        name: "Telescopic Boom",
        type: "rental",
        sku: "asd",
        image_url: "http://dsc.discovery.com/tv/how-stuff-works/img/beer.jpg",
        attribute_ids: [],
        rates: [{
            unit: "day",
            unit_count: 1,
            price: 10.00
        }]
    },
    {
        category_ids: [], // array of category ids
        name: "Telescopic Boom, 40FT",
        type: "rental",
        sku: "asd",
        image_url: "http://dsc.discovery.com/tv/how-stuff-works/img/beer.jpg",
        attribute_ids: [],
        rates: [{
            unit: "day",
            unit_count: 1,
            price: 10.00
        }]
    }];

    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {});
    });

};