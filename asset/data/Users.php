<?php
$db = "BDUsuariosA";
$host = "localhost";
$user="root";
$password="root";

try{
    $conexion = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $email = $_POST["email"];
    $pass = $_POST["password"];
    $query = $conexion->prepare("SELECT * FROM Users where email = :email  AND pass = :pass");
    $result = $query->execute([":email" => $email, ":pass" => $pass]);
    print_r($result);
}catch(PDOException $e){
    echo "Hubo un error".$e->getMessage();
}

?>