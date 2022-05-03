<?
header('content-type: application/json');
$pdo = new PDO('mysql:host=[::1];dbname=test', 'root');
$pdo->prepare('insert into deal(cart) values(:cart)')->execute($_REQUEST);
echo $pdo->query('select id from deal order by id desc')->fetchAll()[0][0];