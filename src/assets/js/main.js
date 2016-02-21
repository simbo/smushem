'use strict';

var SmushEm = require('smushem');

document.addEventListener('DOMContentLoaded', function() {

  // var infoVisible = false;

  global.$body = document.getElementsByTagName('body')[0];

  // document.getElementById('toggle-info').addEventListener('click', function(ev) {
  //   ev.preventDefault();
  //   infoVisible = !infoVisible;
  //   global.$body.classList[infoVisible ? 'add' : 'remove']('info-visible');
  // });

  global.smushem = new SmushEm();

});
