
$(document).ready(function ()
{
    //Init dim box
    $("body").on("mouseenter", ".coverBox", function ()
    {
        $(this).dimmer('show');
    });
    $("body").on("mouseleave", ".coverBox", function ()
    {
        $(this).dimmer('hide');
    });

    //Set mangaListStatus
    //But search one and index one are different
    // $('#mangaListStatus').html("Latest Manga : ");

    //Set form
    //But now change to php
    //$('#pageTmp').submit(function ()
    //{
    //    window.sessionStorage["hennojinIndexGetMangaPage"] = ($("input[name=p]").val() - 1);
    //    window.location.href = "index.html";
    //});
    $('#mangaPageNum').keypress(function (e)
    {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13)
        {
            search();
        }
    });

    //Load manga page
    // $("body").on("click", "#viewManga", function ()
    // {
    //     window.sessionStorage["hennojinMangaID"] = $(this).attr('name');
    //     window.location.href = "gallery.php?id=" + $(this).attr('name');
    // });

    //Add it to favorite list
    // $("body").on("click", "#addFavorite", function ()
    // {
    //     console.log('addFavorite clicked');
    // });

    //From RNA
    $("body").on("click", ".coverImgPart", function ()
    {
        console.log('coverImgPart clicked');
        window.sessionStorage["hennojinMangaID"] = $(this).attr('name');
        window.location.href = "gallery.php?id=" + $(this).attr('name');
    });

    //Manga Show left or right
    $("body").on("click", "#indexPageLeft", function ()
    {
        if(indexPageNum > 0)
        {
            if(window.localStorage["hennojinLastSearch"] == null || window.localStorage["hennojinLastSearch"] == '')
            {
                window.location.href = "index.php?p=" + (indexPageNum - 1);
            }
            else
            {
                window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum - 1);
            }

            if(tagSearching == 1)
            {
                window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum - 1) + "&t=1";
            }
            else if(contentSearching == 1)
            {
                window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum - 1) + "&contents=1";
            }
            else if(artistSearching == 1)
            {
                window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum - 1) + "&artists=1";
            }
            else if(parodySearching == 1)
            {
                window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum - 1) + "&parodies=1";
            }
        }
    });
    $("body").on("click", "#indexPageRight", function ()
    {
        if(window.localStorage["hennojinLastSearch"] == null || window.localStorage["hennojinLastSearch"] == '')
        {
            window.location.href = "index.php?p=" + (indexPageNum + 1);
        }
        else
        {
            window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum + 1);
        }

        if(tagSearching == 1)
        {
            window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum + 1) + "&t=1";
        }
        else if(contentSearching == 1)
        {
            window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum + 1) + "&contents=1";
        }
        else if(artistSearching == 1)
        {
            window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum + 1) + "&artists=1";
        }
        else if(parodySearching == 1)
        {
            window.location.href = "search.php?q=" + window.localStorage["hennojinLastSearch"] + "&p=" + (indexPageNum + 1) + "&parodies=1";
        }
    });

});
