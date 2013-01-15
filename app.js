
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , doc = require('./routes/doc')
  , manage = require('./routes/manage')
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


app.get('/', routes.index);
app.get('/doc', doc.index);
app.get('/socketiotest', function (req, res) {
  res.sendfile(__dirname + '/socketiotest.html');
});

// management interface
app.get('/manage', manage.index)

// api
var appData = require('./models/appdata');
appData.configure();

// api routes
app.get('/categories/test', appData.categories.test);

/*
// tasklist test app

var mongoConnection = 'mongodb://mngoldo:hjk78Ttgs98@ds045107.mongolab.com:45107/disco1';
var TaskList = require('./routes/tasklist');
var taskList = new TaskList(mongoConnection);

app.get('/tasks/list', taskList.list.bind(taskList));
app.post('/tasks/add', taskList.add.bind(taskList));
app.post('/tasks/complete', taskList.complete.bind(taskList));
*/

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});