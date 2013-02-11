var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "inbox"	            : "inbox",
        "inbox/drafts"      : "drafts",
        "inbox/replied"	    : "replied",
        "inbox/archived"	: "archived"
    },

    el: $("#content"),

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        this.el.html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    inbox: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var inboxModel = new InboxCollection();
        var el = this.el;
        inboxModel.fetch({success: function(){
            this.inboxView = new InboxView({model: inboxModel, page: p});
            el.html(this.inboxView.el);
        }});
        this.headerView.selectMenuItem('inbox-menu');
    },

    drafts: function (id) {
        this.headerView.selectMenuItem('drafts-menu');
    },

    replied: function (id) {
        this.headerView.selectMenuItem('replied-menu');
    },

    archived: function (id) {
        this.headerView.selectMenuItem('archived-menu');
    },

    reloadInbox: function(){
        console.log(this);
        this.inbox();
    }

});

utils.loadTemplate(['HeaderView', 'HomeView', 'InboxView', 'InboxItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
