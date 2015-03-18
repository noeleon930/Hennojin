var userId = 0;
var loginIdFocused = false;
var loginPasswordFocused = false;

$(function ()
{

    if (window.localStorage["hennojinLoggedIn"] == "yes")
    {
        $('#accountMenu').html('\
            <div id="profile" class="item">Profile</div>\
            <div id="favorites" class="item">Favorites</div>\
            <div class="divider" style="margin:0px"></div>\
            <div id="logoutButton" class="item" onclick="logout()">Logout</div>\
        ');
		$.get("/hennojin/php/getUserNickName.php?" + "userId=" + window.localStorage["hennojinUserId"], function (r)
		{
		    window.localStorage["hennojinUserNickName"] = r;
		});
    }
    else if (window.localStorage["hennojinLoggedIn"] == "no")
    {

    }
    else
    {
        window.localStorage["hennojinLoggedIn"] = "no";
    }

    $("#loginId").focus(function ()
    {
        loginIdFocused = true;
    });

    $("#loginPassword").focus(function ()
    {
        loginPasswordFocused = true;
    });

    $("#loginId").focusout(function ()
    {
        loginIdFocused = false;
    });

    $("#loginPassword").focusout(function ()
    {
        loginPasswordFocused = false;
    });

});

function login()
{
    if ($('#loginId').val() == '' || $('#loginPassword').val() == '')
    {
        alert('Please input your ID or password correctly.');
    }

    console.log($('#loginId').val());
    console.log($('#loginPassword').val());

    $.get("/hennojin/php/login.php?" + "id=" + $('#loginId').val() + "&password=" + $('#loginPassword').val(), function (response)
    {
        console.log(response);
        if (isNaN(parseInt(response)))
        {
            console.log('Wrong ID or password.');
            $('#loginId').val('');
            $('#loginPassword').val('');
        }
        else
        {
            console.log('logging in...');

            window.localStorage["hennojinLoggedIn"] = "yes";
            window.localStorage["hennojinUserId"] = parseInt(response);
            window.localStorage["hennojinUserName"] = $('#loginId').val();
            window.localStorage["hennojinUserPassword"] = $('#loginPassword').val();

            $.get("/hennojin/php/getUserNickName.php?" + "userId=" + window.localStorage["hennojinUserId"], function (r)
            {
                window.localStorage["hennojinUserNickName"] = r;
            });

            window.location.reload();
        }
    });
}

function logout()
{
    console.log('logout called.');

    window.localStorage["hennojinLoggedIn"] = "no";
    window.localStorage["hennojinUserId"] = null;
    window.localStorage["hennojinUserName"] = null;
    window.localStorage["hennojinUserPassword"] = null;
    window.localStorage["hennojinUserNickName"] = null;

    window.location.reload();
}