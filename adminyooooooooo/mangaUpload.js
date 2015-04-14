$(function()
{
    $.get("mangaUploadContents.php", function(data)
    {
        $('#contents').html(data);
    });
});

function addParody()
{
    $('#parodies').prepend('<input type="text" class="parody"><br>');
}

function addArtist()
{
    $('#artists').prepend('<input type="text" class="artist"><br>');
}
