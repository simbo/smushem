'use strict';

var path = require('path');

module.exports = [

  'copy unprocessed files to dest',

  function() {
    return this.gulp
      .src([
        path.join(this.paths.src, '**/*'),
        '!' + path.join(this.paths.src, 'assets/**/*.@(js|styl)'),
        '!' + path.join(this.paths.src, '**/*.jade')
      ])
      .pipe(this.gulp.dest(this.paths.dest));
  }

];
