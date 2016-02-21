'use strict';

var del = require('del');

module.exports = ['delete generated files', clean];

/**
 * gulp task for deleting generated files
 * @param  {Function}  done  callback
 * @return {undefined}
 */
function clean(done) {
  del([this.paths.dest]).then(function() {
    done();
  });
}
