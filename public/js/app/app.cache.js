if (!app) var app = {};

// requires underscore.js

app.cache = {
    categories: {
        items: null,
        findById: function(id){
            return _.find(this.items, function(item){
                return item._id == id;
            });
        },
        add: function(item){
            items.push(item);
        },
        removeById: function(id){
            this.items = _.reject(this.items, function(item){
                return item._id == id;
            });
            return this.items;
        }
    },
    attributes: {
        items: null,
        findById: function(id){
            return _.find(this.items, function(item){
                return item._id == id;
            });
        },
        add: function(item){
            items.push(item);
        },
        removeById: function(id){
            this.items = _.reject(this.items, function(item){
                return item._id == id;
            });
            return this.items;
        }
    },
    products: {

    }
}