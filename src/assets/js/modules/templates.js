'use strict';

module.exports = Templates;

/**
 * Template
 * @return {undefined}
 */
function Templates() {
  this.templates = {
    item: document.getElementById('template_item').innerHTML,
    uploading: document.getElementById('template_uploading').innerHTML,
    failed: document.getElementById('template_failed').innerHTML
  };
}

/**
 * render template string with given data
 * @param  {String} name  template name
 * @param  {Object} data  data object
 * @return {String}       rendered string
 */
Templates.prototype.render = function(name, data) {
  return Object.keys(data).reduce(function(template, key) {
    var regexp = new RegExp('%' + key + '%', 'ig'),
        value = data[key];
    return template.replace(regexp, value);
  }, this.templates[name]);
};
