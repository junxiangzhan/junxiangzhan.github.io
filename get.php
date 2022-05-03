<?
header('content-type: application/json');
$pdo = new PDO('mysql:host=[::1];dbname=test', 'root');
$sql = $pdo->prepare('select cart from deal where id = :id');
$sql->execute($_REQUEST);
echo ($sql->fetchAll()[0] ?? ['null'])[0];