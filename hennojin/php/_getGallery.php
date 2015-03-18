<?php

$servername = "localhost";
$username = "herreis_noel";
$password = "12241224";
$dbname = "herreis_wrdp1";

$theMangaId = $_GET["id"];

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

$sql = "SELECT * FROM `manga` WHERE `mangaId` = ".$theMangaId; 
$result = $conn->query($sql);

$theTitle = "a";
$theArtist = "a";
$theParody = "a";
$theContents = "a";
$theLanguage = "a";
$theCategory ="a";
$thePages = 0;
$theRating = "a";
$theViews = 0;
$thePath = "a";
$theDescription = "a";

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
    	$theTitle = $row["title"];
    	$theArtist = $row["artist"];
		$theParody = $row["parody"];
		$theContents = $row["contents"];
		$theLanguage = $row["language"];
		$theCategory = $row["category"];
		$thePages = $row["pages"];
		$theRating = $row["rating"];
		$theViews = $row["views"];
		$thePath = $row["path"];
		$theDescription = $row["description"];
    }
}

$theJson = array(
	"title" => $theTitle,
	"artist" => $theArtist,
	"parody" => $theParody,
	"contents" => $theContents,
	"language" => $theLanguage,
	"category" => $theCategory,
	"pages" => $thePages,
	"rating" => $theRating,
	"views" => $theViews,
	"path" => $thePath,
	"description" => $theDescription
	);

echo json_encode($theJson);

?>