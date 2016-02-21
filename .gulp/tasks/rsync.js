'use strict';

var path = require('path');

module.exports = [

  'rsync generated files to live server',

  'build',

  function() {
    return this.gulp
      .src(path.join(this.paths.dest))
      .pipe(this.plugins.rsync({
        root: this.paths.dest,
        hostname: 'libra.uberspace.de',
        username: 'simbo',
        port: 22,
        destination: '/var/www/virtual/simbo/smushem.simbo.de',
        progress: true,
        incremental: true,
        recursive: true,
        clean: true
      }));
  }

];
