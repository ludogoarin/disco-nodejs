var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var db = null;

exports.setdb = function(dbObject) {
    console.log('db set');
    db = dbObject;
};

exports.test = function(){
    console.log(0);

    db.collection('test', {safe:true}, function(err, collection) {
        console.log(1);
        if (err) {
            console.log(2);
            console.log("The 'test' collection doesn't exist. Creating it with sample data...");
            populateDB();
        } else {
            console.log(3);
            //console.log(collection);
            var doc = {mykey:1, fieldtoupdate:1};
            console.log(doc);
            collection.insert(doc, {w:1}, function(err, result) {
                console.log(4);
                if (err){
                    console.log('error: ' + err);
                } else {
                    collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, function(err, result) {});
                    console.log('done updating!');
                }
            });
        }
    });

    console.log(5);
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving category: ' + id);
    db.collection('categories', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('categories', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addCategory = function(req, res) {
    var category = req.body;
    console.log('Adding category: ' + JSON.stringify(category));
    db.collection('categories', function(err, collection) {
        collection.insert(category, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateCategory = function(req, res) {
    var id = req.params.id;
    var category = req.body;
    delete category._id;
    console.log('Updating category: ' + id);
    console.log(JSON.stringify(category));
    db.collection('categories', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, category, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating category: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteCategory = function(req, res) {
    var id = req.params.id;
    console.log('Deleting category: ' + id);
    db.collection('categories', function(err, collection) {
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

    var categories = [
    {
        key: "areial-lifts",
        parent_key: "",
        name: "Aerial Lifts",
        image_url: "http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png"
    },
    {
        key: "air-compressors",
        parent_key: "",
        name: "Air Compressors",
        image_url: "http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png"
    },
    {
        key: "compaction",
        parent_key: "",
        name: "Compaction",
        image_url: "http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png"
    },
    {
        key: "power-tools",
        parent_key: "",
        name: "Power Tools",
        image_url: "http://www.free-press-release.com/members/members_pic/200901/img/1232470709.png"
    }];

    db.collection('categories', function(err, collection) {
        collection.insert(categories, {safe:true}, function(err, result) {});
    });

};