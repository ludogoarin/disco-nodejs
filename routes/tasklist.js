

// client
var mongo = require('mongodb')
  , mongoClient = mongo.MongoClient
  , _ = require('underscore')._;

module.exports = TaskList;

function TaskList(connection) {
  mongoClient.connect(connection, function(err, db) {
    console.log('opened db connection');
    TaskList.db = db;
    db.createCollection('tasks', function(err, collection) {});
  });
}

TaskList.prototype = {
  db: null,

  list: function(req, res) {
    var taskCollection = TaskList.db.collection('tasks');
    //var items = taskCollection.find({}, {'sort':[['itemName', 1]]}).items;

    taskCollection.find({}, {'sort':[['itemName', 1]]}).toArray(function(err, items) {

      console.log("===================================================================================");        
      console.log(">> Items ordered by name ascending");        
      console.log("==================================================================================="); 

      res.render('tasks',{title: 'My ToDo List', tasks: items, activetab: 'doc'})
    });

    // close connection
    TaskList.db.close();
  },

  add: function(req,res) {
    var item = req.body.item;
    var newTask = {
      itemName: item.name,
      itemCategory: item.category,
      itemCompleted: false,
      itemDate: new Date()
    };

    console.log("===================================================================================");        
    console.log(">> Add new item");        
    console.log("==================================================================================="); 

    var taskCollection = TaskList.db.collection('tasks');
    taskCollection.insert(newTask, {w:1}, function(err, result) {});
    
    // close connection
    TaskList.db.close();

    // redirect user
    res.redirect('/tasks/list');
  },

  complete: function(req,res) {
    var completedTasks = req.body.completedids;
    var allTasks = req.body.taskids;
    var taskCollection = TaskList.db.collection('tasks');
    var BSON = mongo.BSONPure;

    console.log("===================================================================================");        
    console.log(">> Update item to 'completed'");        
    console.log("==================================================================================="); 
    console.log(req.body);
    console.log(completedTasks);
    console.log(allTasks);

    _.each(allTasks, function(taskId, i, list){
      console.log('taskId: ' + taskId);
      console.log('i: ' + i);
      console.log('list: ' + list);
      
      var isCompleted = _.contains(completedTasks, taskId);
      console.log('isCompleted: ' + isCompleted);
      console.log('taskId: ' + taskId);
      var o_id = new BSON.ObjectID(taskId);

      var conditions = { _id: o_id };
      var updates = { itemCompleted: isCompleted };

      taskCollection.update(conditions, { $set:updates }, {w:1}, function (err, result) {
        if(err) {
          throw err;
        }
        console.log('result: ' + result);
      });
    });
    
    // close connection
    TaskList.db.close();

    // redirect user
    res.redirect('/tasks/list');
  }
}