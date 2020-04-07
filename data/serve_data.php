<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Content-Disposition: attachment; filename="covid19-cuba.json"');
readfile('covid19-cuba.json');