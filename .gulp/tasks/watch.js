'use strict';

var path = require('path');

module.exports = ['watch everything and react on changes', watch];

/**
 * gulp task for watching sources and react on changes
 * @param  {Function}  done  callback
 * @return {undefined}
 */
function watch(done) {

  this.gulp.watch(path.join(this.paths.src, '**/*.jade'), function() {
    this.runSequence('build:site');
  }.bind(this));

  this.gulp.watch(path.join(this.paths.css.src, '**/*.styl'), function() {
    this.runSequence('build:css');
  }.bind(this));

  this.gulp.watch([
    path.join(this.paths.src, '**/*'),
    '!' + path.join(this.paths.src, 'assets'),
    '!' + path.join(this.paths.src, 'assets/**/*'),
    '!' + path.join(this.paths.src, '**/*.jade')
  ], function() {
    this.runSequence('copy');
  }.bind(this));

  this.watchify = true;
  this.runSequence('build:js', done);

}
