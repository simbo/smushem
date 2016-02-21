'use strict';

/**
 * LoadingIndicator
 * @return {undefined}
 */
function LoadingIndicator() {

  var requests = 0;

  this.$ = document.createElement('div');
  this.$.className = 'loading-indicator';
  global.$body.appendChild(this.$);

  /**
   * add to loading request count
   * @return {undefined}
   */
  this.push = function() {
    requests++;
    this.update();
  };

  /**
   * remove from loading request count
   * @return {undefined}
   */
  this.pop = function() {
    requests--;
    this.update();
  };

  /**
   * update dom loading properties
   * @return {undefined}
   */
  this.update = function() {
    this.$.dataset.requests = requests;
    global.$body.classList[requests === 0 ? 'remove' : 'add']('loading');
  };

}

module.exports = LoadingIndicator;
