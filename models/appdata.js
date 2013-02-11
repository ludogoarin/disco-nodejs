// data connection
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// Connect to database
//var dbConn = 'mongodb://mngoldo:hjk78Ttgs98@ds045107.mongolab.com:45107/disco1';
var dbConn = process.env.DB_CONNECTION || 'mongodb://localhost:27017/gtbl_disco';

mongo.MongoClient.connect(dbConn, function(err, db) {
    console.log('opened db connection');
    initDataRepos(db);
});

function initDataRepos(dbInstance){
    // ensure database is filled with starting data & indexes
    prepareDb();

    // send db object to each data repo
    exports.categories.setdb(dbInstance);
    exports.products.setdb(dbInstance);
    exports.attributes.setdb(dbInstance);
    exports.vendors.setdb(dbInstance);
    exports.requests.setdb(dbInstance);
}

exports.categories = require('../routes/categories');
exports.products = require('../routes/products');
exports.attributes = require('../routes/attributes');
exports.vendors = require('../routes/vendors');
exports.requests = require('../routes/requests');

var prepareDb = function(){
    // 1. build default data collections

    // 2. ensure indexes on default collection properties
}