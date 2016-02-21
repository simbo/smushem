<?php

try {

  // Undefined | Multiple Files | $_FILES Corruption Attack
  if (!isset($_FILES['img']['error']) || is_array($_FILES['img']['error']))
    throw new RuntimeException('Invalid parameters');

  // check $_FILES['img']['error'] value
  switch ($_FILES['img']['error']) {
    case UPLOAD_ERR_OK: break;
    case UPLOAD_ERR_NO_FILE: throw new RuntimeException('No file sent');
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE: throw new RuntimeException('Exceeded filesize limit');
    default: throw new RuntimeException('Unknown error');
  }

  // check filesize
  if ($_FILES['img']['size'] > (2 * 1024 * 1024))
    throw new RuntimeException('Exceeded filesize limit');

  // check MIME type
  $finfo = new finfo(FILEINFO_MIME_TYPE);
  if (false === $ext = array_search($finfo->file($_FILES['img']['tmp_name']), array(
    'jpg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'tiff' => 'image/tiff',
    'bmp' => 'image/bmp'
  ), true))
    throw new RuntimeException('Invalid file format');

  // send file via curl
  $url = 'http://www.resmush.it/ws.php';
  $filepath = realpath($_FILES['img']['tmp_name']);
  $filename = preg_replace('/[^a-z0-9\._-]/i', '_', $_FILES['img']['name']);
  $data = array(
    'files' => '@' . $filepath . ';filename=' . rawurlencode($filename)
  );
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec ($ch);
  curl_close ($ch);

} catch (RuntimeException $e) {
  $result = json_encode(array('error' => $e->getMessage()));
}

header('Content-type: application/json');
echo $result;

?>
