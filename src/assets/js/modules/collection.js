'use strict';

/**
 * Collection
 * @return {undefined}
 */
function Collection() {

  this.$ = document.createElement('div');
  this.$.className = 'item-collection';
  this.$.addEventListener('click', removeItem.bind(this));
  global.$body.appendChild(this.$);

  global.addEventListener('storage', storageUpdate.bind(this));

  this.updateEvent = new CustomEvent('collectionUpdate', {detail: this});

  this.read();
  this.removeExpired();

}

/**
 * add an item to the collection
 * @param  {Object}    item  collection item object
 * @return {undefined}
 */
Collection.prototype.add = function(item) {
  var created = new Date(),
      expires = new Date(item.expires);
  item.name = item.dest.replace(/^.+\/([^\/]+)$/i, '$1');
  item.id = item.dest.replace(/^.+\/([a-z0-9]+)\/[^\/]+$/i, '$1');
  item.created = created.getHours() + ':' + created.getMinutes();
  item.created_iso = created.toISOString();
  item.expires = expires.getHours() + ':' + expires.getMinutes();
  item.expires_iso = expires.toISOString();
  this.items[item.id] = item;
  this.store();
};

/**
 * remove an item from the collection
 * @param  {String}    itemId  collection item id
 * @return {undefined}
 */
Collection.prototype.remove = function(itemId) {
  if (this.items.hasOwnProperty(itemId)) delete this.items[itemId];
  this.store();
};

/**
 * store collection to local storage
 * @return {undefined}
 */
Collection.prototype.store = function() {
  global.localStorage.setItem('items', JSON.stringify(this.items));
  global.dispatchEvent(this.updateEvent);
};

/**
 * remove expired items from collection
 * @return {undefined}
 */
Collection.prototype.removeExpired = function() {
  var now = new Date();
  this.items = Object.keys(this.items).reduce(function(items, itemId) {
    if (now < new Date(this.items[itemId].expires_iso)) items[itemId] = this.items[itemId];
    return items;
  }.bind(this), {});
  this.store();
};

/**
 * read collection from local storage
 * @return {undefined}
 */
Collection.prototype.read = function() {
  var storedItems = global.localStorage.getItem('items');
  this.items = storedItems ? JSON.parse(storedItems) : {};
};

/**
 * event handler on storage update from another window
 * @param  {Event}     ev  storage event object
 * @return {undefined}
 */
function storageUpdate(ev) {
  this.items = JSON.parse(ev.newValue);
  global.dispatchEvent(this.updateEvent);
}

/**
 * event handler  on click on 'remove item'
 * @param  {Event}     ev  click event object
 * @return {undefined}
 */
function removeItem(ev) {
  if (ev.target.className === 'item_remove') {
    ev.preventDefault();
    this.remove(ev.target.href.replace(/^.+#item-([a-z0-9]+)/i, '$1'));
  }
}

module.exports = Collection;
