var totalPage = 60;

$(function ()
{
    //Load pageId from previous operation
    var loadPageId = parseInt(window.sessionStorage["hennojinPageID"]);

    //Border check
    if (loadPageId < 0) loadPageId = 0;
    if (loadPageId > 59) loadPageId = 59;

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
        window.location.href = "reader_sample.html";
    });

    //Loading image
    $("#loadImg").append('\
        <img id="loadImgBox" class="ui bordered image" src="../manga_sample/go' + (loadPageId + 11) + '.jpg">\
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
            scrollPosition -= 68;
            if ($("#largerImg").dimmer('is active'))
                $("#largerImg").scrollTop(scrollPosition);
            else
                $(document).scrollTop(scrollPosition);
        }

        //Down arrow or S
        if (e.which == 83)
        {
            scrollPosition += 68;
            if ($("#largerImg").dimmer('is active'))
                $("#largerImg").scrollTop(scrollPosition);
            else
                $(document).scrollTop(scrollPosition);
        }

        if (e.which == 90)
        {
            $("#largerImg").dimmer('toggle');
            $("#largerImgBox").html('\
                <img id="loadImgBox" class="ui bordered image" style="max-width:' + $(window).width() + 'px" src="../manga_sample/go' + (loadPageId + 11) + '.jpg">\
                ');
        }
    });

    //Handle loading left page
    $("#mangaLeft").click(function ()
    {
        console.log("mangaLeft clicked");
        window.sessionStorage["hennojinPageID"] = (loadPageId - 1).toString();
        window.location.href = "reader_sample.html";
    });

    //Handle loading right page
    $("#mangaRight").click(function ()
    {
        console.log("mangaRight clicked");
        window.sessionStorage["hennojinPageID"] = (loadPageId + 1).toString();
        window.location.href = "reader_sample.html";
    });

    //Go back to gallery
    $("#goBackGallery").click(function ()
    {
        window.location.href = "gallery_sample.html";
    });
});
