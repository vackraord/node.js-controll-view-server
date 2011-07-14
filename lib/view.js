/*
 * /lib/view.js
 */
var fs = require('fs');
var Mustache = require('../node_modules/mustache/mustache');
var view = function() {};

view.prototype = {

    renderView: function(name, data, callback) {
        var self = this;

        if (typeof callback !== 'function') throw ViewCallbackException;

        self.getView(name, 'html', function(content) {
            var template = Mustache.to_html(content, data);

            self.getLayout({}, function(content) {
                content = self.setLayoutContent(content, template);
                callback(content);
            });
        });
    }