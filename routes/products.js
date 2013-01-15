var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('gtbl_disco', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'gtbl_disco' database");
        db.collection('products', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

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
        collection.find().toArray(function(err, items) {
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
                res.send(wine);
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
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var products = [
    {
        category_ids: [], // aray of category ids
        name: "Telescopic Boom",
        type: "rental",
        sku: "asd",
        image_url: "http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg",
        attributes: [
        {
            name: "length (FT)",
            options: "20,40"
        },
        {
            name: "fuel",
            value: "diesel,gasoline"
        }
        ],
        rates: [{
            unit: "day",
            unit_count: 1,
            price: 10.00
        }]
    },
    {
        category_ids: [], // aray of category ids
        name: "Telescopic Boom",
        type: "rental",
        sku: "asd",
        image_url: "http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg",
        attributes: [{
            name: "drive",
            value: "2WD"
        },{
            name: "fuel",
            value: "diesel"
        }
        ],
        rates: [{
            unit: "day",
            unit_count: 1,
            price: 10.00
        }]
    },
    {
        category_ids: [], // aray of category ids
        name: "Telescopic Boom, 40FT",
        type: "rental",
        sku: "asd",
        image_url: "http://dsc.discovery.com/tv/how-stuff-works/images/beer.jpg",
        attributes: [{
            name: "drive",
            value: "2WD"
        },{
            name: "fuel",
            value: "diesel"
        }
        ],
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