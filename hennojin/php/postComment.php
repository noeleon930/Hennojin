<?php

$servername = "localhost";
$username = "herreis_noel";
$password = "12241224";
$dbname = "herreis_wrdp1";

$user = $_GET["user"];
$date = $_GET["date"];
$content = $_GET["content"];
$mangaId = $_GET["mangaId"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn,"utf8");

// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
else
{
	// echo 'Connected successfully' . '<br>';
}

// $sql = "INSERT INTO `herreis_wrdp1`.`comment` (`user`, `date`, `content`, `mangaId`, `commnetId`) VALUES (\'1224\', \'2015-02-12 17:41:41\', \'test\', \'1225\', NULL);";
// $sql = "INSERT INTO `comment` (`user`, `date`, `content`, `mangaId`, `commnetId`) VALUES (\'1224\', \'2015-02-12 17:41:41\', \'testyomotherfucker\', \'1225\', NULL)";

$sql = "INSERT INTO `herreis_wrdp1`.`comment` (`userId`, `date`, `content`, `mangaId`, `commentId`) VALUES ('".$user."', '".$date."', '".$content."', '".$mangaId."', NULL)";

if ($conn->query($sql) === TRUE)
{
	echo "New record created successfully";
}
else
{
	echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
