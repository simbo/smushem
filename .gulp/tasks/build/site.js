'use strict';

var path = require('path');

var jade = require('jade');

module.exports = ['generate static site', buildSite];

/**
 * gulp task for building static site
 * @return {Object} gulp stream
 */
function buildSite() {

  var options = {
        templateEngine: 'jade',
        templateEngineOptions: {
          basedir: this.paths.src,
          jade: jade
        }
      };

  return this.gulp
    .src(path.join(this.paths.src, '**/*.jade'))
    .pipe(this.plugins.plumber())
    .pipe(this.plugins.consolidate(
      options.templateEngine,
      {},
      {useContents: true}
    ))
    .pipe(this.plugins.rename(function(path) {
      path.extname = '.html';
    }))
    .pipe(this.gulp.dest(this.paths.dest));

}
