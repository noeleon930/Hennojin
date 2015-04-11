var tags_target = "";
var tags_startswith = "";
var tags_target_selected = false;
var tags_startswith_selected = false;

$(function ()
{
    $('.tags_select_target').click( function()
    {
        var arrayLength = $('.tags_select_target').length;
        for(var i = 0; i < arrayLength; i++)
        {
            $('.tags_select_target').eq(i).removeClass("active");
        }

        $(this).addClass("active");

        tags_target = $(this).attr('id').split("_")[1];
        tags_target_selected = true;

        getTags();
    });

    $('.tags_select_startswith').click( function()
    {
        var arrayLength = $('.tags_select_startswith').length;
        for(var i = 0; i < arrayLength; i++)
        {
            $('.tags_select_startswith').eq(i).removeClass("active");
        }

        $(this).addClass("active");

        tags_startswith = $(this).attr('id').split("_")[2];
        tags_startswith_selected = true;

        getTags();
    });

    $('#tagGenerated').on('click', '.tagResult', function ()
    {
        var toSearch = $(this).html().substring(2).replace("&lt;", "<").replace("&gt;", ">");
        // alert(toSearch);

        window.localStorage["hennojinLastSearch"] = toSearch;
        window.location.href = "search.php?q=" + toSearch + "&" + tags_target + "=1";
    });
});

function getTags()
{
    if(!(tags_target_selected == true && tags_startswith_selected == true)) return;
    $('#tagGenerated').hide('fast', function ()
    {
        $.get("/hennojin/php/tag.php?type=" + tags_target + "&startswith=" + tags_startswith, function(data)
        {
            if(data == "")
            {
                $('#tagGenerated').html('No results');
            }
            else
            {
                $('#tagGenerated').html(data);
            }

            $('#tagGenerated').show('fast');
        });
    });
}
