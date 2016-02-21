'use strict';

/**
 * Dropzone
 * @return {undefined}
 */
function Dropzone() {

  this.$ = document.createElement('div');
  this.$.className = 'dropzone';
  global.$body.appendChild(this.$);

  this.$.addEventListener('dragover', onDragOver.bind(this));
  this.$.addEventListener('dragleave', onDragOut.bind(this));
  this.$.addEventListener('dragend', onDragOut.bind(this));
  this.$.addEventListener('drop', onDrop.bind(this));

  global.addEventListener('dragenter', onDragEnter.bind(this));

}

/**
 * drag enter event handler
 * @param  {Event}     ev  event object
 * @return {undefined}
 */
function onDragEnter(ev) {
  ev.preventDefault();
  this.$.classList.add('drag-hover');
}

/**
 * drag over event handler
 * @param  {Event}     ev  event object
 * @return {undefined}
 */
function onDragOver(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'copy';
}

/**
 * drag out event handler
 * @param  {Event}     ev  event object
 * @return {undefined}
 */
function onDragOut(ev) {
  ev.preventDefault();
  this.$.classList.remove('drag-hover');
}

/**
 * drop event handler
 * @param  {Event}     ev  event object
 * @return {undefined}
 */
function onDrop(ev) {
  var i, files = ev.dataTransfer.files;
  onDragOut.call(this, ev);
  for (i = 0; i < files.length; i++) {
    global.smushem.uploadFile(files[i]);
  }
}

module.exports = Dropzone;
