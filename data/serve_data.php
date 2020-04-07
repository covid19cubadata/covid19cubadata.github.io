<?php
$filename = $_GET['filename'];
if (!is_file(__DIR__ . '/' . preg_replace('/\.\.\//', '', $filename))) {
    header("HTTP/1.0 404 Not Found");
    die;
}

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Content-Disposition: attachment; filename="' . $filename . '"');
readfile($filename);