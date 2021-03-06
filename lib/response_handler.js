/*
 * /lib/response_handler.js
 */

var fs = require('fs');

// Constructor
var response_handler = function(res) {
        this.res = res;
    };
// properties and methods
response_handler.prototype = {

    //req: {},
    res: {},

    serverError: function(code, content) {
        var self = this;
        self.res.writeHead(code, {
            'Content-Type': 'text/plain'
        });
        self.res.end(content);
    },

    renderHtml: function(content) {
        var self = this;
        self.res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        self.res.end(content, 'utf-8');
    },

    getHeadersByFileExtension: function(extension) {
        var self = this;
        var headers = {};

        switch (extension) {
        case 'css':
            headers['Content-Type'] = 'text/css';
            break;
        case 'js':
            headers['Content-Type'] = 'application/javascript';
            break;
        case 'ico':
            headers['Content-Type'] = 'image/x-icon';
            break;
        default:
            headers['Content-Type'] = 'text/plain';
        }
        return headers;
    },

    renderWebroot: function(requestedUrl) {
        var self = this;
        //try and match a file in our webroot directory
        fs.readFile('./app/webroot' + requestedUrl.href, function(error, content) {
            if (error) {
                self.serverError(404, '404 Bad Request');
            }
            else {
                var extension = (requestedUrl.pathname.split('.').pop());
                self.res.writeHead(200, self.getHeadersByFileExtension(extension));
                self.res.end(content, 'utf-8');
            }
        });
    }

};

// node.js module export
module.exports = response_handler;