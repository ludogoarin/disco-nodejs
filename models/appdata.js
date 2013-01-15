
// data connection
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});

db = new Db('gtbl_disco', server, {safe: true});

// open database
db.open(function(err, db) {
    if(err) {
        throw err;
    } else {
        console.log('connected');

        // ensure database is filled with starting data
        prepareDb();
        
        // send db object to each data repo
        exports.categories.setdb(db);
    }
});

exports.categories = require('../routes/categories');

exports.configure = function() {

}
    
var prepareDb = function(){

}