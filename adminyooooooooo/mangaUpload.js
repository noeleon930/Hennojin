var mangaId = 0;
var title_en = "";
var title_jp = "";
var title = "";
var artists = "";
var parodies = "";
var contents = "";
var language = "";
var description = "";
var category = "";
var pages = 0;
var crawlFrom = "";
var pass = false;

var myArray = [];
var myJSON = "";

$(function()
{
    $.get("mangaUploadContents.php", function(data)
    {
        $('#contents').html(data);
    });
});

function addParody()
{
    $('#parodies').prepend('<input type="text" class="parody" style="width:300px"><br>');
}

function addArtist()
{
    $('#artists').prepend('<input type="text" class="artist" style="width:300px"><br>');
}

function confirm()
{
	//reset
	mangaId = 0;
	title_en = "";
	title_jp = "";
	title = "";
	artists = "";
	parodies = "";
	contents = "";
	language = "";
	description = "";
	category = "";
	pages = 0;
	crawlFrom = "";
	pass = false;

	mangaId = $('#mangaId').val();

	title_en = $('#title_en').val();
	title_jp = $('#title_jp').val();
	title = title_en + " / " + title_jp;

	artists =  $('.artist').eq(0).val();
	for(var i = 1; i < $('.artist').length; i++)
	{
		artists =  artists + ", " + $('.artist').eq(i).val();
	}

	parodies =  $('.parody').eq(0).val();
	for(var i = 1; i < $('.parody').length; i++)
	{
		parodies = parodies + ", " + $('.parody').eq(i).val();
	}

	for(var i = 0; i < $('.contentCheckBox').length; i++)
	{
		if($('.contentCheckBox').eq(i).prop('checked'))
		{
			contents = contents + ", " + $('.contentCheckBox').eq(i).val();
		}
	}
	//And clean up the first ", "
	contents = contents.replace(", ", "");

	language = $('#language').val();

	description = $('#description').val().replace(/\n/g, "\r\n");

	category = $('#category').val();

	pages = $('#pages').val();

	crawlFrom = $('#crawlFrom').val();

	if(!(mangaId > 0 && title != " / " && artists.length > 0 && parodies.length > 0 && contents.length > 0 && language.length > 0 && category.length > 0 && pages > 0 && crawlFrom.length > 0))
	{
		// alert('Something is empty, plz check!');
		$('#outputResult').html('Check again.<br>');
	}
	else
	{
		pass = true;
		$('#outputResult').html('<h4>Good.</h4>')
		$('#outputResult').append('\
			<h4>(1) mangaId : ' + mangaId + ' </h4>\
			<h4>(2) title : ' + title + ' </h4>\
			<h4>(3) artists : ' + artists + ' </h4>\
			<h4>(4) parodies : ' + parodies + ' </h4>\
			<h4>(5) contents : ' + contents + ' </h4>\
			<h4>(6) language : ' + language + ' </h4>\
			<h4>(7) description : </h4>\
			' + description.replace(/\r\n/g, "<br>") + '\
			<h4>(8) category : ' + category + ' </h4>\
			<h4>(9) pages : ' + pages + ' </h4>\
			<h4>(10) crawlFrom : ' + crawlFrom + ' </h4>\
			<h3>And you still can edit, but dont forget to check again!</h3>');
	}
}

function submit()
{
	if(pass == false) alert('Something is empty, plz check!');
	else
	{
		var item = {
			"mangaId" : mangaId,
			"title" : title,
			"artists" : artists,
			"parodies" : parodies,
			"contents" : contents,
			"language" : language,
			"description" : description,
			"category" : category,
			"pages" : pages,
			"crawlFrom" : crawlFrom
		};

		myArray.push(item);
		myJSON = JSON.stringify({myArray: myArray});

		console.log(myJSON);

		$.post("mangaUploadInsert.php", myJSON, function(data)
		{
			$('#phpResult').append(data);
		});
	}
}

function rest()
{
	location.reload(true);
}
