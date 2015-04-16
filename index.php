<?php

$servername = "localhost";
$username = "herreis_noel";
$password = "12241224";
$dbname = "herreis_wrdp1";

$pageStart = (int)($_GET["p"]) * 20;
if(empty($_GET["p"]))
{
	$pageStart = 0;
}

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

echo '<!DOCTYPE html>
<html>
<head>
    <!-- Standard Meta -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="prVerify" content="8158e2e9d3bd3dbe5a19d30e76dff9b5" />

    <!-- Site Properities -->
    <title>Hennojin - One of the Best Source for Hentai Manga and Doujinshi</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="ui/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="css/general.css">
    <link rel="shortcut icon" href="img/hj.ico">

    <script>
        var indexPageNum = '.((int)($_GET["p"])).';
		var tagSearching = 0;
        window.localStorage["hennojinLastSearch"] = "";
    </script>

	<script type="text/javascript">
		var _prvar=_prvar||new Object();
		(function(pa,s){if(document.getElementById("pr2b7f05a9"))return false;
		pa=document.createElement("script");pa.type="text/javascript";pa.async=true;pa.id="pr2b7f05a9";pa.src="//prscripts.com/pub.js";
		s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(pa,s);})();
	</script>

</head>
<body>
    <div class="ui fixed large purple inverted menu" style="z-index: 16888">
        <div id="navbar">
            <a id="home" class="active item" href="index.php">
                <i class="home icon"></i> Home
            </a>
            <div class="ui dropdown item">
                <i class="browser icon"></i> Browse
                <i class="dropdown icon"></i>
                <div class="menu">
                    <div id="latest" class="item">Latest</div>
                    <div id="topRated" class="item">Top rated</div>
                    <div id="mostViewed" class="item">Most viewed</div>
                    <div class="ui left icon input">
                        <i class="search icon"></i>
                        <input id="titleSearch" name="search" placeholder="Search for..." type="text">
                    </div>
                </div>
            </div>
            <a id="tag" class="item" href="tag.html">
                <i class="tags icon"></i> Tags
            </a>

            <div class="right menu">
				<a id="fb" class="item" href="https://www.facebook.com/hennojin">
					<i class="facebook square icon"></i>
				</a>
				<a id="twitter" class="item" href="https://twitter.com/Hennojin">
					<i class="twitter square icon"></i>
				</a>
				<a id="following" class="item">
                </a>
                <div class="ui dropdown item">
                    <i class="user icon"></i>
                    Account
                    <i class="dropdown icon"></i>
                    <div id="accountMenu" class="menu">
                        <!--<div class="header">
                            Please login...
                        </div>-->
                        <div class="divider" style="margin:0px"></div>
                        <div>
                            <div class="ui input">
                                <input id="loginId" name="inputLoginId" placeholder="ID" type="text">
                            </div>
                        </div>
                        <div class="divider" style="margin:0px"></div>
                        <div>
                            <div class="ui input">
                                <input id="loginPassword" name="inputLoginPassword" placeholder="Password" type="password">
                            </div>
                        </div>
                        <div class="divider" style="margin:0px"></div>
                        <div id="loginButton" class="item" onclick="login()">
							<i class="sign in icon"></i>Sign in
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="mainContainer">
        <div class="row">
            <div class="column">
                <div class="ui message main">
                    <!--<h1 class="ui header">Hello, hennojins!</h1>-->
					<div id="helloHeader" class="header" style="font-size:x-large">
						Hello, Hennojins!
					</div>
					<p style="margin-bottom:2px">Hennojin is a free platform for hentai lover to express their love for hentai manga and doujinshi.</p>
					<p style="margin-top:2px">Enjoy bountiful of hentai manga and doujinshi in our user-friendly environment.</p>
					<div class="ui divided list">
						<div class="item">
							<div class="header">2015-04-12</div>
							Hennojin 0.8.3 :: Follow us on FB and Twitter, and support us on Patreon at
							<a href="https://www.patreon.com/hennojin">www.patreon.com/hennojin</a> ^w^
						</div>
						<div class="item">
							<div class="header">2015-04-12</div>
							Hennojin 0.8.2 :: More improved searching and TAGS is available, an advanced search function!
						</div>
						<div class="item">
							<div class="header">2015-04-05</div>
							Hennojin 0.8.1 :: Improved searching and Sign-up are available now! So don\'t forget to sign up! ^w^
						</div>
						<div class="item">
							<div class="header">2015-03-25</div>
							Tag searching is available now!
						</div>
						<div class="item">
							<div class="header">2015-03-14</div>
							Alpha online. But registering and user functions are still under construction ^w^
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="ui inverted top attached segment">
            <div style="float: left">
            	<h2 id="mangaListStatus" style="margin:0px"></h2>
            </div>
            <div style="float: right;margin-top:6px">
                <i id="indexPageLeft" class="left large chevron icon"></i>
                <i style="font-size: larger">Page '.($pageStart / 20 + 1).'</i>
                <i id="indexPageRight" class="right large chevron icon"></i>
            </div>
    	</div>
        <div class="ui attached segment">
            <div class="ui grid">
                <div id="getManga" class="five column row">';

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
		                    echo '<a href="gallery.php?id='.$row["mangaId"].'" id="viewManga" class="ui button" style="padding: 7px; padding-left: 14px; padding-right: 14px;">View</a>';
		               echo ' </div>';
		            echo '</div>';
		        echo '</div>';
		        echo '<img name="'.$row["mangaId"].'" class="ui medium bordered image coverImgPart" src="..'.$row["path"].'0.png">';
		    echo '</div>';
		echo '</div>';
    }
}
                echo'</div>
            </div>
        </div>
		<div class="ui inverted bottom attached segment">
            <div style="float: right;margin-top:0px; margin-bottom:6px">
                <i id="indexPageLeft" class="left large chevron icon"></i>
                <i style="font-size: larger">Page '.($pageStart / 20 + 1).'</i>
                <i id="indexPageRight" class="right large chevron icon"></i>
            </div>
    	</div>
		<div style="z-index: 10; position: absolute; right: 3px; top: 43px;">
			<div class="pr-widget" id="pr-c3lr" style="height:600px;width:120px;"></div>
		</div>
		<div style="z-index: 10; position: absolute; right: 3px; top: 643px;">
			<div class="pr-widget" id="pr-c3ls" style="height:600px;width:120px;"></div>
		</div>
		<div class="pr-widget" id="pr-c3ln" style="height:156px;width:1000px;margin-top:100px"></div>
		<div class="pr-widget" id="pr-c3lq" style="height:216px;width:760px;"></div>
    </div>

    <!-- JS -->
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script>
    	$("#mangaListStatus").html("Latest Manga : ");
    </script>
    <script src="ui/semantic.min.js"></script>
    <script src="js/init.js"></script>
    <script src="js/index.js"></script>
    <script src="js/user.js"></script>
    <script src="js/search.js"></script>
</body>
</html>';

$conn->close();
?>
