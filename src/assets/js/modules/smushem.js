'use strict';

var reqwest = require('reqwest');

var Collection = require('collection'),
    Dropzone = require('dropzone'),
    LoadingIndicator = require('loading-indicator'),
    Templates = require('templates');

module.exports = SmushEm;

/**
 * SmushEm
 * @return {undefined}
 */
function SmushEm() {

  global.addEventListener('collectionUpdate', updateView.bind(this));

  this.dropzone = new Dropzone();
  this.loading = new LoadingIndicator();
  this.templates = new Templates();
  this.collection = new Collection();

}

/**
 * upload a file and handle response
 * @param  {File}      file  file object
 * @return {undefined}
 */
SmushEm.prototype.uploadFile = function(file) {
  var data = new FormData();
  data.append('img', file);
  this.loading.push();
  reqwest({
    url: '/smushit/',
    method: 'post',
    type: 'json',
    processData: false,
    data: data
  })
    .then(function(data) {
      if (data.dest) this.collection.add(data);
    }.bind(this))
    .always(function() {
      this.loading.pop();
    }.bind(this));
  return this;
};

/**
 * event handler for updating view
 * @param  {Event}     ev  event object
 * @return {undefined}
 */
function updateView(ev) {
  var collection = ev.detail;
  collection.$.innerHTML = '';
  Object.keys(collection.items).forEach(function(itemName) {
    collection.$.insertAdjacentHTML(
      'afterbegin',
      this.templates.render('item', collection.items[itemName])
    );
  }.bind(this));
  return this;
}
