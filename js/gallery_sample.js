var totalPage = 60;
var previewsPerSelect = 16;
var currentSelect = 0;

$(function ()
{
    var currentSelectStart = 0;

    // //If pages is not over, remove Middle button
    // if (totalPage / previewsPerSelect < 4) $("#previewRange4").remove();
    // if (totalPage / previewsPerSelect < 3) $("#previewRange3").remove();
    // if (totalPage / previewsPerSelect < 2) $("#previewRange2").remove();
    // if (totalPage / previewsPerSelect < 1) $("#previewRangeLast").remove();

    // //Init Last page
    // var lastPageNumber = parseInt(totalPage / previewsPerSelect);
    // if (totalPage % previewsPerSelect == 0) $("#previewRangeLast").html(lastPageNumber);
    // else $("#previewRangeLast").html(lastPageNumber + 1);

    //Init preview items for first range
    generatePreviews();

    //Handle preview is clicked
    $("body").on("click", ".galleryBox", function ()
    {
        console.log("preview clicked");
        window.sessionStorage["hennojinPageID"] = this.id;
        window.location.href = "reader_sample.html";
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

    // //Handle previewRange1
    // $("#previewRange1").click(function ()
    // {
    //     console.log("previewRange1 clicked");

    //     //Check if now it's in this stage already
    //     if (currentSelect == parseInt($(this).html()) - 1) return;
    //     else
    //     {
    //         //If not so, do something
    //         currentSelect = parseInt($(this).html()) - 1;
    //         generatePreviews();
    //         centerTheCurrentSelect();
    //     }
    // });

    // //Handle previewRange2
    // $("#previewRange2").click(function ()
    // {
    //     console.log("previewRange2 clicked");

    //     //Check if now it's in this stage already
    //     if (currentSelect == parseInt($(this).html()) - 1) return;
    //     else
    //     {
    //         //If not so, do something
    //         currentSelect = parseInt($(this).html()) - 1;
    //         generatePreviews();
    //         centerTheCurrentSelect();
    //     }
    // });

    // //Handle previewRange3
    // $("#previewRange3").click(function ()
    // {
    //     console.log("previewRange3 clicked");

    //     //Check if now it's in this stage already
    //     if (currentSelect == parseInt($(this).html()) - 1) return;
    //     else
    //     {
    //         //If not so, do something
    //         currentSelect = parseInt($(this).html()) - 1;
    //         generatePreviews();
    //         centerTheCurrentSelect();
    //     }
    // });

    // //Handle previewRange4
    // $("#previewRange4").click(function ()
    // {
    //     console.log("previewRange4 clicked");

    //     //Check if now it's in this stage already
    //     if (currentSelect == parseInt($(this).html()) - 1) return;
    //     else
    //     {
    //         //If not so, do something
    //         currentSelect = parseInt($(this).html()) - 1;
    //         generatePreviews();
    //         centerTheCurrentSelect();
    //     }
    // });

    // //Handle previewRangeLast
    // $("#previewRangeLast").click(function ()
    // {
    //     console.log("previewRangeLast clicked");

    //     //Check if now it's in this stage already
    //     if (currentSelect == parseInt($(this).html()) - 1) return;
    //     else
    //     {
    //         //If not so, do something
    //         currentSelect = parseInt($(this).html()) - 1;
    //         generatePreviews();
    //         centerTheCurrentSelect();
    //     }
    // });

    // //Handle previewRangeLeft
    // $("#previewRangeLeft").click(function ()
    // {
    //     console.log("previewRangeLeft clicked");
    // });

    // //Handle previewRangeRight
    // $("#previewRangeRight").click(function ()
    // {
    //     console.log("previewRangeRight clicked");
    // });
});

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
                    <img class="ui medium bordered image" src="../manga_sample/preview/go' + (i + 11) + '.jpg">\
                </div>\
            </div>');
    }

    if (currentSelectStart == 0)
        $("#previewRange").html('Preview&nbsp;&nbsp;:&nbsp;&nbsp;Page ' + '01' + ' - ' + i + ' &nbsp;&nbsp;total (' + totalPage + ')&nbsp;&nbsp;');
    else
        $("#previewRange").html('Preview&nbsp;&nbsp;:&nbsp;&nbsp;Page ' + (currentSelectStart + 1) + ' - ' + i + ' &nbsp;&nbsp;total (' + totalPage + ')&nbsp;&nbsp;');
}

// function centerTheCurrentSelect()
// {
//     //Reset all previewRanges
//     $("#previewRange1").removeClass("active");
//     $("#previewRange2").removeClass("active");
//     $("#previewRange3").removeClass("active");
//     $("#previewRange4").removeClass("active");
//     $("#previewRangeLast").removeClass("active");

//     //If it's page 1
//     if (currentSelect == 0)
//     {
//         //Set active
//         $("#previewRange1").addClass("active");

//         //Set offset
//         $("#previewRange1").html(currentSelect + 1);
//         $("#previewRange2").html(currentSelect + 2);
//         $("#previewRange3").html(currentSelect + 3);
//         $("#previewRange4").html(currentSelect + 4);
//     }
//         //If it's the last page
//     else if ((currentSelect + 1) * previewsPerSelect >= totalPage)
//     {
//         //Set active
//         $("#previewRangeLast").addClass("active");

//         //Set offset but care range
//         if ($("#previewRange1").length)
//         {
//             $("#previewRange1").html(currentSelect);
//             $("#previewRangeLast").html(currentSelect + 1);
//         }
//         if ($("#previewRange2").length)
//         {
//             $("#previewRange1").html(currentSelect - 1);
//             $("#previewRange2").html(currentSelect);
//             $("#previewRangeLast").html(currentSelect + 1);
//         }
//         if ($("#previewRange3").length)
//         {
//             $("#previewRange1").html(currentSelect - 2);
//             $("#previewRange2").html(currentSelect - 1);
//             $("#previewRange3").html(currentSelect);
//             $("#previewRangeLast").html(currentSelect + 1);
//         }
//         if ($("#previewRange4").length)
//         {
//             $("#previewRange1").html(currentSelect - 3);
//             $("#previewRange2").html(currentSelect - 2);
//             $("#previewRange3").html(currentSelect - 1);
//             $("#previewRange4").html(currentSelect);
//             $("#previewRangeLast").html(currentSelect + 1);
//         }
//         else
//         {
//             //Only one page
//         }
//     }
// }
