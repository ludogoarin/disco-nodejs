if (!app) var app = {};

app.util = {
    alertType: {
        error: function(){
            return 'alert-error';
        },
        success: function(){
            return 'alert-success';
        },
        info: function(){
            return 'alert-info';
        },
        warning: function(){
            return 'alert-warning';
        }
    },
    message: function(message, options) {
        var alertContainer = options && options.placeholderId ? $(options.placeholderId):$('#alert_global');
        var alertType = options && options.alertType ? options.alertType:'';
        alertContainer.html('<div class="alert ' + alertType + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')

        var timeout = options && options.timeout ? options.timeout:3000;
        window.setTimeout("$('.alert').alert('close')",timeout);
    }
};
