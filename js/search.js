$(function ()
{
    //Detect if user pressed enter on titleSearch
    $("#titleSearch").keypress(function (e)
    {
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13)
        {
            search();
        }
    });
});

function search()
{
    window.localStorage["hennojinLastSearch"] = $("#titleSearch").val();
    window.location.href = "search.php?q=" + $("#titleSearch").val();
}
