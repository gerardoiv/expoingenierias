<?php
$data = [
  "name" => "Juan Pérez",
  "studentId" => "A01234567",
  "email" => "juan@tec.mx",
  "password" => '$2a$10$123456789012345678901uQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw', // hash bcrypt
  "semester" => "5",
  "career" => "IMT"
];

$options = [
  'http' => [
    'header'  => "Content-type: application/json\r\n",
    'method'  => 'POST',
    'content' => json_encode($data),
  ],
];
$context  = stream_context_create($options);
$result = file_get_contents('http://localhost/api/index.php/participant/register', false, $context);
echo $result;
?>