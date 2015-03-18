<?php

$servername = "localhost";
$username = "root";
$password = "n1o2e2l4";
$dbname = "hennojin_mangalist";

$pageStart = (int)$_GET["p"] * 20;

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

$sql = "SELECT * FROM `manga` ORDER BY `manga` . `mangaId` DESC LIMIT " . $pageStart . ", 20 ";
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    // output data of each row
    while($row = $result->fetch_assoc())
    {
        // echo "id: " . $row["mangaId"]. " - Name: " . $row["title"]. " " . $row["pages"]. "<br>";
        //Split title by '/'
        list($partA, $partB) = explode('/', $row["title"]);
        echo '<div class="column">';
		    echo '<div class="coverBox">';
		        echo '<div class="ui dimmer">';
		            echo '<div class="content">';
		                echo '<div class="center">';
		                    echo '<h4 class="ui inverted header">'.$partA.'</h4>';
		                    echo '<div id="Addfavorite" class="ui purple button">Add</div>';
		                    echo '<div name="'.$row["mangaId"].'" id="viewManga" class="ui button">View</div>';
		               echo ' </div>';
		            echo '</div>';
		        echo '</div>';
		        echo '<img class="ui medium bordered image" src="..'.$row["path"].'0.jpg">';
		    echo '</div>';
		echo '</div>';
    }
}

$conn->close();
?>
