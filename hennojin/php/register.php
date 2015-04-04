<?php

$servername = "localhost";
$username = "herreis_noel";
$password = "12241224";
$dbname = "herreis_wrdp1";

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

//Receive parameters
$mode = $_GET["mode"];

if($mode == "checkIdAvailable")
{
    $checkingId = $_GET["checkingId"];
    $sql = "SELECT * FROM `user` WHERE `id` = '".$checkingId."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
        echo 'unavailable';
    }
    else
    {
        echo 'available';
    }
}
else if($mode == "signup")
{
    $signup_id = $_GET["signup_id"];
    $signup_pw = $_GET["signup_pw"];
    $signup_email = $_GET["signup_email"];
    $signup_username = $_GET["signup_username"];

    $sql = "INSERT INTO `herreis_wrdp1`.`user` (`userId`, `id`, `password`, `name`, `email`, `userGroup`) VALUES (NULL, '".$signup_id."', '".$signup_pw."', '".$signup_username."', '".$signup_email."', 'normal')";
    if ($conn->query($sql) === TRUE)
    {
    	echo "good";
    }
    else
    {
    	echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

?>
