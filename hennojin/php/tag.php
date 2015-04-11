<?php

$servername = "localhost";
$username = "herreis_noel";
$password = "12241224";
$dbname = "herreis_wrdp1";

$type = $_GET["type"];
$startswith = $_GET["startswith"];

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

function str_starts_with($haystack, $needle)
{
    return strpos($haystack, $needle) === 0;
}

$sql = "SELECT * FROM `tags` WHERE `type` = '" . $type . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    // output data of each row
    while($row = $result->fetch_assoc())
    {
        if(str_starts_with($row["name"], $startswith))
        {
            echo '<div class="item">
                    <div class="content">
                        <div class="header tagResult"># '.htmlspecialchars($row["name"]).'</div>
                    </div>
                </div>';
        }
    }
}

$conn->close();
?>
