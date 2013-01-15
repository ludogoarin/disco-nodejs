var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('gtbl_disco', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'gtbl_disco' database");
        db.collection('vendors', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'vendors' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving vendor: ' + id);
    db.collection('vendors', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('vendors', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addVendor = function(req, res) {
    var vendor = req.body;
    console.log('Adding vendor: ' + JSON.stringify(vendor));
    db.collection('vendors', function(err, collection) {
        collection.insert(vendor, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateVendor = function(req, res) {
    var id = req.params.id;
    var vendor = req.body;
    delete vendor._id;
    console.log('Updating vendor: ' + id);
    console.log(JSON.stringify(vendor));
    db.collection('vendors', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, vendor, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating vendor: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteVendor = function(req, res) {
    var id = req.params.id;
    console.log('Deleting vendor: ' + id);
    db.collection('vendors', function(err, collection) {
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

    var vendors = [
    {
        vertical_ids: [VERTICAL_ID],
        name: "United Rentals",
        image_url: "http://www.ohs.org/shop/images/Museum-Store_1.jpg",
        coordinates: {
            long: 37.75771992816863,
            lat: -122.43760000000003
        },
        address: {
            street: "4440 20th Street",
            street2: "",
            city: "San Francisco",
            state: "CA",
            postal_code: "94114",
            country: "USA"
        },
        contact: {
            phone: "",
            url: "http://ur.com",
            email: "info@unitedrentals.com"
        },
        products: [{
            product_id: PRODUCT_ID,
            sku: "",
            manufacturer: ""
        }]
    },
    {
        vertical_ids: [VERTICAL_ID],
        name: "Cresco Rent",
        image_url: "http://www.ohs.org/shop/images/Museum-Store_1.jpg",
        coordinates: {
            long: 37.73980315483037,
            lat: -122.40601430664066
        },
        address: {
            street: "120 Loomis Street",
            street2: "",
            city: "San Francisco",
            state: "CA",
            postal_code: "94124",
            country: "USA"
        },
        contact: {
            phone: "",
            url: "http://www.crescorent.com",
            email: "info@crescorent.com"
        },
        products: [{
            product_id: PRODUCT_ID,
            sku: "",
            manufacturer: ""
        }]
    }];

    db.collection('vendors', function(err, collection) {
        collection.insert(vendors, {safe:true}, function(err, result) {});
    });

};