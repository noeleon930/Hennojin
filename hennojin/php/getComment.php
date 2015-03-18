<?php

$servername = "localhost";
$username = "herreis_noel";
$password = "12241224";
$dbname = "herreis_wrdp1";

$mangaId = (int)$_GET["mangaId"];

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

$sql = "SELECT * FROM `comment` WHERE `mangaId` = ".$mangaId." ORDER BY `comment`.`commentId` DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    // output data of each row
    while($row = $result->fetch_assoc())
    {
    	//Get user name QAQ
    	$sql2 = "SELECT * FROM `user` WHERE `userId` = ".$row["userId"];
    	$result2 = $conn->query($sql2);
    	$row2 = $result2->fetch_assoc();

    	echo '<div id="userId'.$row["userId"].'" class="row">
	        	<div class="one wide column">
	        	</div>
	        	<div class="one wide column">
	            	<img class="ui tiny rounded image" src="img/head.png">
	        	</div>
	        	<div class="twelve wide column">
	            	<div class="ui purple message" style="font-size: larger; padding-left: 17px; padding-right: 17px; padding-top: 12px; padding-bottom: 12px">
	                '.$row2["name"].' : '.$row["content"].'
	            	</div>
	        	</div>
	    	</div>';
    }
}

$conn->close();
?>
