'use strict';

var path = require('path');

var eslintify = require('eslintify'),
    gulpWB = require('gulp-watchify-browserify'),
    uglifyify = require('uglifyify');

module.exports = ['bundle javascripts using watchify+browserify', buildJs];

/**
 * gulp task for building js
 * @param  {Function} done  callback
 * @return {Object}         gulp stream
 */
function buildJs(done) {

  var options = {
    watch: this.watchify,
    cwd: this.paths.js.src,
    browserify: {
      paths: [
        path.join(this.paths.js.src, 'modules'),
        path.join(this.paths.cwd, 'node_modules')
      ],
      debug: true,
      transform: [
        eslintify,
        [uglifyify, {global: true}]
      ]
    }
  };

  gulpWB('*.js', options, function streamHandler(stream) {
    return stream
      .pipe(this.plugins.plumber())
      .pipe(this.plugins.sourcemaps.init({loadMaps: true}))
      .pipe(this.plugins.sourcemaps.write('.', {includeContent: true, sourceRoot: '.'}))
      .pipe(this.gulp.dest(this.paths.js.dest));
  }.bind(this), done);

}
