var previewsPerSelect = 16;
var currentSelect = 0;

$(function ()
{
    var currentSelectStart = 0;

    //Init preview items for first range
    generatePreviews();
    generateComments();

    if ($("#theDescription").text() == "")
    {
        $("#theDescription").append('...');
    }

    //Handle preview is clicked
    $("body").on("click", ".galleryBox", function ()
    {
        console.log("preview clicked");
        window.sessionStorage["hennojinPageID"] = this.id;
        window.sessionStorage["hennojinMangaPath"] = thePath;
        window.sessionStorage["hennojinMangaTotalPage"] = totalPage;
        window.sessionStorage["hennojinMangaTitle"] = theTitle;
        window.location.href = "reader.html";
    });

    $("#previewLeft").click(function ()
    {
        console.log("previewLeft clicked");

        //Border check
        if (currentSelect == 0) return;

        currentSelect--;
        generatePreviews();
    });

    $("#previewRight").click(function ()
    {
        console.log("previewRight clicked");

        //Border check
        if ((currentSelect + 1) * previewsPerSelect >= totalPage) return;
        currentSelect++;
        generatePreviews();
    });

    //Handle leave comment
    $('#postCommentButton').click(function ()
    {
        console.log($('#postCommentInput').val());

        //Get current time
        var currentTime = new Date();
        var formatted = currentTime.toISOString().replace("T", " ").substring(0, 20);

        //Certificate
        $.get("/hennojin/php/login.php?" + "id=" + window.localStorage["hennojinUserName"] + "&password=" + window.localStorage["hennojinUserPassword"], function (response)
        {
            console.log(response);
            if (isNaN(parseInt(response)))
            {
                alert('Please login first! ^^');
            }
            else
            {
                $.get("/hennojin/php/postComment.php?" + "user=" + window.localStorage["hennojinUserId"] + "&date=" + formatted + "&content=" + $('#postCommentInput').val() + "&mangaId=" + mangaId, function (ss)
                {
                    $('#comments').prepend('\
                        <div class="row">\
                            <div class="one wide column">\
                            </div>\
                            <div class="one wide column">\
                                <img class="ui tiny rounded image" src="img/head.png">\
                            </div>\
                            <div class="twelve wide column">\
                                <div class="ui purple message" style="font-size: larger; padding-left: 17px; padding-right: 17px; padding-top: 12px; padding-bottom: 12px">\
                                ' + window.localStorage["hennojinUserNickName"] + ' : ' + $('#postCommentInput').val() + '\
                                </div>\
                            </div>\
                        </div>');

                    $('#postCommentInput').val('');
                });
            }
        });
        //user, date, content, mangaId, commnetId
    });
});

function generateComments()
{
    $('#comments').html('');
    $.get("/hennojin/php/getComment.php?mangaId=" + mangaId, function (response)
    {
        $('#comments').append(response);
    });
}

function generatePreviews()
{
    //Get the start of the range
    currentSelectStart = currentSelect * previewsPerSelect;

    //Clear the previews
    $("#previewContainer").html('');

    //From i to range's max
    var i = currentSelectStart;
    for (; i < currentSelectStart + previewsPerSelect; i++)
    {
        //Border check
        if (i >= totalPage) break;

        //Update contents
        $("#previewContainer").append('\
            <div class="column">\
                <div id="' + i + '" class="galleryBox">\
                    <img class="ui medium bordered image" src="' + thePath + i + '_1.jpg">\
                </div>\
            </div>');
    }

    if (currentSelectStart == 0)
        $("#previewRange").html('Preview&nbsp;&nbsp;:&nbsp;&nbsp;Page ' + '01' + ' - ' + i + ' &nbsp;&nbsp;total (' + totalPage + ')&nbsp;&nbsp;');
    else
        $("#previewRange").html('Preview&nbsp;&nbsp;:&nbsp;&nbsp;Page ' + (currentSelectStart + 1) + ' - ' + i + ' &nbsp;&nbsp;total (' + totalPage + ')&nbsp;&nbsp;');
}
