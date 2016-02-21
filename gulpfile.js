'use strict';

// require core packages
var path = require('path');

// require packages
var gulp = require('gulp'),
    gulpplug = require('gulpplug');

// create a plug instance
var plug = new gulpplug.Plug(gulp, {
  tasksDir: '.gulp/tasks'
});

// set project paths for usage in tasks
plug.paths = (function(paths) {
  paths.cwd = __dirname;
  paths.src = path.join(paths.cwd, 'src');
  paths.dest = path.join(paths.cwd, 'html');
  paths.assets = {
    src: path.join(paths.src, 'assets'),
    dest: path.join(paths.dest, 'assets')
  };
  paths.js = {
    src: path.join(paths.assets.src, 'js'),
    dest: path.join(paths.assets.dest, 'js')
  };
  paths.css = {
    src: path.join(paths.assets.src, 'stylus'),
    dest: path.join(paths.assets.dest, 'css')
  };
  return paths;
})({});

// gulpplugging...
plug
  .loadPlugins()
  .addTasks()
  .addHelpTask()
  // add task sequences
  .addSequence('build', ['clean', ['copy', 'build:css', 'build:js', 'build:site']])
  .addSequence('dev', ['build', 'watch']);
