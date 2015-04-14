<?php

$servername = "localhost";
$username = "herreis_noel";
$password = "12241224";
$dbname = "herreis_wrdp1";

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$insert ="('".$obj["myArray"][0]["title"]."', '".$obj["myArray"][0]["artists"]."', '".$obj["myArray"][0]["parodies"]."', '".$obj["myArray"][0]["contents"]."', '".$obj["myArray"][0]["language"]."', '".$obj["myArray"][0]["category"]."', '".(int)$obj["myArray"][0]["pages"]."', '"."', '"."0"."', '"."/manga-catcher/base/".(int)$obj["myArray"][0]["mangaId"]."/"."', '".$obj["myArray"][0]["description"]."', '".(int)$obj["myArray"][0]["mangaId"]."', '".$obj["myArray"][0]["crawlFrom"]."')";


$sql = "INSERT INTO `manga` (`title`, `artist`, `parody`, `contents`, `language`, `category`, `pages`, `rating`, `views`, `path`, `description`, `mangaId`, `crawlFrom`) VALUES" . $insert;

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

if ($conn->query($sql) === TRUE)
{
	echo "New manga submit successfully";
}
else
{
	echo "Error: " . $sql . $conn->error;
}

$conn->close();
?>
