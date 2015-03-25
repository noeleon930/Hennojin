<!DOCTYPE html>
<html>
<head>
    <!-- Standard Meta -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="prVerify" content="8158e2e9d3bd3dbe5a19d30e76dff9b5" />

    <!-- Site Properities -->
    <title>Hennojin-Gallery</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="ui/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="css/general.css">
	<link rel="shortcut icon" href="img/hj.ico">
<?
    // $servername = "localhost";
    // $username = "root";
    // $password = "n1o2e2l4";
    // $dbname = "hennojin_mangalist";
    $servername = "localhost";
    $username = "herreis_noel";
    $password = "12241224";
    $dbname = "herreis_wrdp1";

    $theMangaId = $_GET["id"];

    $conn = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conn,"utf8");

    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM `manga` WHERE `mangaId` = ".$theMangaId;
    $result = $conn->query($sql);

    $theTitle = "";
    $theArtist = "";
    $theParody = "";
    $theContents = "";
    $theLanguage = "";
    $theCategory ="";
    $thePages = 0;
    $theRating = "";
    $theViews = 0;
    $thePath = "";
    $theDescription = "";

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
echo '
    <script>
        var thePath = "'.$thePath.'";
        var totalPage = '.$thePages.';
        var theTitle = "'.$theTitle.'";
        var mangaId = '.$theMangaId.';
    </script>

</head>
<body>
    <div class="ui fixed large purple inverted menu" style="z-index: 16888">
        <div id="navbar">
            <a id="home" class="item" href="index.php">
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
                        <input id="titleSearch" name="search" placeholder="title or tags" type="text">
                    </div>
                </div>
            </div>
            <a id="tag" class="item" href="tag.html">
                <i class="tags icon"></i> Tag
            </a>

            <div class="right menu">
                <a id="following" class="item">
                    <i class="checkmark box icon"></i> Following
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
                            Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="mainContainer">
        <div class="row">
            <div class="column">

                <!-- Title and descriptions -->
                <div class="ui inverted top attached segment">
                    <h4 id="theTitle" style="margin:0px">'.$theTitle.'</h4>
                </div>
                <div class="ui bottom attached segment">
                    <div class="ui grid">
                        <div class="row">
                            <div class="four wide column">
                                <img id="theGalleryCoverImg" class="ui medium bordered image" src="'.$thePath.'0.png">
                            </div>
                            <div class="seven wide column">
                                <div class="ui divided selection list">
                                    <a id="theArtist" class="item">
                                        <div class="ui purple horizontal label">Artist</div>
                                        '.$theArtist.'
                                    </a>
                                    <a id="theParody" class="item">
                                        <div class="ui purple horizontal label">Parody</div>
                                        '.$theParody.'
                                    </a>
                                    <div class="item">
                                        <div class="ui purple horizontal label">Contents</div>
                                        <div class="ui segment" style="margin-top:5px;padding:5px;">';

$tags = explode(", ", $theContents);
$tagsPerRow = 0;
foreach($tags as $tag)
{
    $tagsPerRow = $tagsPerRow + 1;
    $ttag = str_replace(' ', '&nbsp;', $tag);
    echo '<a href="search.php?q='.$tag.'&t=1">'.$ttag.'</a>&nbsp;&nbsp;';
    if($tagsPerRow > 5)
    {
        echo'<br>';
        $tagsPerRow = 0;
    }
}


echo '</div>
                                    </div>
                                    <a id="theLanguage" class="item">
                                        <div class="ui purple horizontal label">Language</div>
                                        '.$theLanguage.'
                                    </a>
                                    <a id="theCategory" class="item">
                                        <div class="ui purple horizontal label">Category</div>
                                        '.$theCategory.'
                                    </a>
                                    <a id="thePages" class="item">
                                        <div class="ui purple horizontal label">Pages</div>
                                        '.$thePages.'
                                    </a>
                                    <a id="theRating" class="item">
                                        <div class="ui purple horizontal label">Rating</div>
                                        '.$theRating.'
                                    </a>
                                    <a id="theViews" class="item">
                                        <div class="ui purple horizontal label">Views</div>
                                        '.$theViews.'
                                    </a>
                                </div>
                            </div>
                            <div class="five wide column">
                                <div class="ui divided selection list">
                                    <a class="item">
                                        <div class="ui purple horizontal label">Description</div>
                                    </a>
                                    <a class="item" style="border-top: 0px">
                                        <div class="ui segment">
                                            <p id="theDescription">'.nl2br($theDescription).'</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Title and descriptions End -->
                <!-- Preview thumbnails -->
                <div class="ui inverted top attached segment" style="-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;">
                    <div style="float: left">
                        <h4 id="previewRange" style="margin:0px">Preview&nbsp;&nbsp;:&nbsp;&nbsp;Page 1 - 16 &nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                    <div style="float: left">
                        <i id="previewLeft" class="left chevron icon"></i>
                        <i>&nbsp;</i>
                        <i id="previewRight" class="right chevron icon"></i>
                    </div>
                </div>
                <div class="ui bottom attached segment">
                    <div class="ui grid">
                        <div id="previewContainer" class="eight column row">
                            <!-- Adding preview here -->
                        </div>
                    </div>
                    <!-- Preview range so hot -->
                    <!-- <div class="ui three column centered grid">
                        <div class="column">
                            <div id="previewRange" class="ui pagination menu">
                                <a id="previewRangeLeft" class="icon item">
                                    <i class="left arrow icon"></i>
                                </a>
                                <a id="previewRange1" class="active item">
                                    1
                                </a>
                                <a id="previewRange2" class="item">
                                    2
                                </a>
                                <a id="previewRange3" class="item">
                                    3
                                </a>
                                <a id="previewRange4" class="item">
                                    ...
                                </a>
                                <a id="previewRangeLast" class="item">
                                    Last
                                </a>
                                <a id="previewRangeRight" class="icon item">
                                    <i class="right arrow icon"></i>
                                </a>
                            </div>
                        </div>
                    </div> -->
                </div>
                <!-- Preview thumbnails End -->
                <!-- Comments -->
                <div class="ui inverted top attached segment">
                    <h4 style="margin:0px">Comments</h4>
                </div>
                <div class="ui bottom attached segment">
                    <div class="ui grid">

                        <!-- Input -->
                        <div class="row">
                            <div class="one wide column">
                            </div>
                            <div class="one wide column">
                                <img class="ui tiny rounded image" src="img/head.png">
                            </div>
                            <div class="twelve wide column">
                                <div class="ui fluid big action input">
                                    <input id="postCommentInput" placeholder="Leave comment here..." type="text">
                                    <div id="postCommentButton" class="ui button">Post</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Ajax generated dynamically -->
                    <div id="comments" class="ui grid">

                    </div>
                </div>
                <!-- Comments End -->
            </div>
        </div>
    </div>


    <!-- JS -->
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="ui/semantic.min.js"></script>
    <script src="js/init.js"></script>
	<script src="js/user.js"></script>
    <script src="js/search.js"></script>
    <script src="js/gallery.js"></script>
</body>
</html>';
?>
