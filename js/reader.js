var totalPage = 0;
var thePath = "";
var searchInReader = false;

$(function ()
{
    //Load pageId from previous operation
    var loadPageId = parseInt(window.sessionStorage["hennojinPageID"]);

    //Load totalPage and thePath from previous operation
    totalPage = parseInt(window.sessionStorage["hennojinMangaTotalPage"]);
    thePath = window.sessionStorage["hennojinMangaPath"];

    //Set Title
    var tmpTitle = window.sessionStorage["hennojinMangaTitle"];
    //Only display English part
    tmpTitle = tmpTitle.split("/")[0];
    //Adjust title's length on navbar < 30
    if (tmpTitle.length > 40)
    {
        tmpTitle = tmpTitle.substring(0, 40) + "...";
    }
    $('#mangaTitle').html(tmpTitle);
    $('#mangaTitleBrowser').html(window.sessionStorage["hennojinMangaTitle"]);

    //Border check
    if (loadPageId < 0) loadPageId = 0;
    if (loadPageId > totalPage - 1) loadPageId = totalPage - 1;

    console.log("Loading page " + (loadPageId + 1));

    //Set Page X
    document.getElementById("mangaPage").innerHTML = "Page " + (loadPageId + 1);

    //And generate gotopage parts
    $("#mangaPage").append('\
        <div id="mangaPageGoto" class="menu">\
        </div>\
        ');
    for (var pages = 0; pages < totalPage; pages++)
    {
        $("#mangaPageGoto").append('\
            <a id="' + pages + '" class="item gotopage">' + (pages + 1) + '</a>\
            ');
    }

    //Handle clicked gotopage
    $("body").on("click", ".gotopage", function ()
    {
        console.log("gotopage clicked");
        window.sessionStorage["hennojinPageID"] = this.id;
        window.location.href = "reader.html";
    });

    //Loading image
    $("#loadImg").append('\
        <img id="loadImgBox" class="ui bordered image" style="max-width: 900px" src="' + thePath + loadPageId + '.jpg">\
        <img id="loadImgBox" class="ui bordered image" style="display: none;" src="' + thePath + (loadPageId + 1) + '.jpg">\
		');

    //Handle clicked left half or right half of image
    $("#loadImgBox").click(function (e)
    {
        var iWidth = $(this).innerWidth();
        var iOffset = $(this).offset();
        var x = e.pageX - iOffset.left;
        if (iWidth / 2 > x)
        {
            console.log("left half image");
            $("#mangaLeft").trigger("click");
        }
        else
        {
            console.log("right half image");
            $("#mangaRight").trigger("click");
        }
    });

    //Handle keypress WASD or four arrows
    $("body").on("keydown", function (e)
    {
        if(searchInReader == false)
        {
            //Current scroll position
            var scrollPosition = $(document).scrollTop();

            //But for full page
            if ($("#largerImg").dimmer('is active'))
                scrollPosition = $("#largerImg").scrollTop();

            //Left arrow or A
            if (e.which == 37 || e.which == 65)
            {
                console.log("left arrow!");
                $("#mangaLeft").trigger("click");
            }

            //Right arrow or D
            if (e.which == 39 || e.which == 68)
            {
                console.log("right arrow!");
                $("#mangaRight").trigger("click");
            }

            //Up arrow or W
            if (e.which == 87)
            {
                scrollPosition -= 35;
                if ($("#largerImg").dimmer('is active'))
                    $("#largerImg").scrollTop(scrollPosition);
                else
                    $(document).scrollTop(scrollPosition);
            }

            //Down arrow or S
            if (e.which == 83)
            {
                scrollPosition += 35;
                if ($("#largerImg").dimmer('is active'))
                    $("#largerImg").scrollTop(scrollPosition);
                else
                    $(document).scrollTop(scrollPosition);
            }

            //Toggle Zoom in
            if (e.which == 90)
            {
                $("#largerImg").dimmer('toggle');
                $("#largerImgBox").html('\
                    <img id="loadImgBox" class="ui bordered image" style="max-width:' + $(window).width() + 'px" src="' + thePath + loadPageId + '.jpg">\
                    ');
            }

            //Go back to gallery
            if (e.which == 71)
            {
                $("#goBackGallery").trigger("click");
            }
        }
    });

    //Special searching in reader
    $("#titleSearch").focusin(function ()
    {
        searchInReader = true;
        console.log('searchInReader = true;');
    });

    $("#titleSearch").focusout(function ()
    {
        searchInReader = false;
        console.log('searchInReader = false;');
    });

    //Handle loading left page
    $("#mangaLeft").click(function ()
    {
        console.log("mangaLeft clicked");
        window.sessionStorage["hennojinPageID"] = (loadPageId - 1).toString();
        window.location.href = "reader.html";
    });

    //Handle loading right page
    $("#mangaRight").click(function ()
    {
        console.log("mangaRight clicked");
        window.sessionStorage["hennojinPageID"] = (loadPageId + 1).toString();
        window.location.href = "reader.html";
    });

    //Go back to gallery
    $("#goBackGallery").click(function ()
    {
        window.location.href = "gallery.php?id=" + window.sessionStorage["hennojinMangaID"];
    });
});
