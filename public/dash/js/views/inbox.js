window.InboxView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var items = this.model.models;

        if (items != null) {
            var len = items.length;
            var startPos = (this.options.page - 1) * 8;
            var endPos = Math.min(startPos + 8, len);

            $(this.el).html(this.template());

            for (var i = startPos; i < endPos; i++) {
                $('#inbox tbody', this.el).append(new InboxItemView({model: items[i]}).render().el);
            }

            //$(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);
        }

        return this;
    },

    // Add new item
    addOne: function(item) {
        alert("called");
        var view = new InvoiceItemView({model: item});
        $('#inbox tbody', this.el).prepend(new InboxItemView({model: item}).render().el);
    }
});

window.InboxItemView = Backbone.View.extend({

    tagName: "tr",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});