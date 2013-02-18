var express = require('express')
  , routes = require('./routes')
  , doc = require('./routes/doc')
  , manage = require('./routes/manage')
  , dash = require('./routes/dash')
  , http = require('http')
  , path = require('path');

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// public routes
app.get('/', routes.index);
app.get('/doc', doc.index);

// management interface
app.get('/manage', manage.index)

// data access
var appData = require('./models/appdata');

/** api routes **/
// categories
app.get('/categories/all', appData.categories.findAll);
app.get('/category/:id', appData.categories.findById);
app.delete('/category/:id', appData.categories.deleteCategory);
app.put('/category/:id', appData.categories.updateCategory);
app.post('/categories/add', appData.categories.addCategory);
// products
app.get('/products/all', appData.products.findAll);
app.get('/product/:id', appData.products.findById);
app.get('/products/:categoryId', appData.products.findByCategoryId);
app.delete('/product/:id', appData.products.deleteProduct);
app.put('/product/:id', appData.products.updateProduct);
app.post('/products/add', appData.products.addProduct);
// attributes
app.get('/attributes/all', appData.attributes.findAll);
app.get('/attribute/:id', appData.attributes.findById);
app.delete('/attribute/:id', appData.attributes.deleteAttribute);
app.put('/attribute/:id', appData.attributes.updateAttribute);
app.post('/attributes/add', appData.attributes.addAttribute);
// vendors
app.get('/vendors/all', appData.vendors.findAll);
app.get('/vendors/search/:query', appData.vendors.findByKeyword);
app.get('/vendor/:id', appData.vendors.findById);
app.delete('/vendor/:id', appData.vendors.deleteVendor);
app.put('/vendor/:id', appData.vendors.updateVendor);
app.post('/vendors/add', appData.vendors.addVendor);
// requests
app.get('/requests', appData.requests.findAll);
app.get('/request/:id', appData.requests.findById);
app.delete('/request/:id', appData.requests.deleteRequest);
app.delete('/requests/all', appData.requests.deleteRequestsAll);
app.put('/request/:id', appData.requests.updateRequest);
app.post('/requests/add', function(req, res) {
    console.log(req);
    appData.requests.addRequest(req, res, function(insertedRecord){
        io.sockets.emit('order', { success: true, result: insertedRecord });
    });
});

/** dashboard routes **/
// dashboard area for customers
app.get('/dash', dash.index);

// sockets test
app.get('/socketiotest', function (req, res) {
    // return to all open socket connections
    io.sockets.emit('order', { from: "server" });

    res.sendfile(__dirname + '/routes/dash/socketiotest.html');
});

// launch server
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


// dashboard through socket.io
io.sockets.on('connection', function (socket) {

    socket.on('neworder', function (data) {
      // return to the sending socket connection
      socket.emit('order', data);
      // return to all open socket connections
      io.sockets.volatile.emit('order', data);
    });

    socket.on('set vendor id', function (vid) {
        socket.set('vendor_id', vid, function () {
            socket.emit('ready');
        });
    });

    socket.on('msg', function () {
        socket.get('vendor_id', function (err, vid) {
            console.log('message from vendor ', vid);
        });
    });
});