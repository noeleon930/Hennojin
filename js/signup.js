var bool_signup_id = false;
var bool_signup_pw = false;
var bool_signup_email = false;
var bool_signup_username = false;

$(function ()
{
    $("#signup_id").change(function()
    {
        bool_signup_id = false;
        if($("#signup_id").val() != "")
        {
            $.get("/hennojin/php/register.php?mode=checkIdAvailable&checkingId=" + $("#signup_id").val().toLowerCase(), function(data, status)
            {
                if(data == "available")
                {
                    $("#signup_id").parent().parent().removeClass("required");
                    $("#signup_id").parent().prev().html('ID<i class="checkmark icon"></i>');
                    bool_signup_id = true;
                }
                else
                {
                    $("#signup_id").parent().parent().addClass("required");
                    $("#signup_id").parent().prev().html('ID (not available) <i class="remove icon"></i>');
                    bool_signup_id = false;
                }
            });
        }
        else
        {
            $("#signup_id").parent().parent().addClass("required");
            $("#signup_id").parent().prev().html('ID (for signin)');
            bool_signup_id = false;
        }
    });

    $("#signup_pw").change(function()
    {
        $("#signup_cpw").val("");
        bool_signup_pw = false;
        if($("#signup_pw").val().length >= 8)
        {
            $("#signup_pw").parent().parent().removeClass("required");
            $("#signup_pw").parent().prev().html('Password<i class="checkmark icon"></i>');
        }
        else
        {
            $("#signup_pw").parent().parent().addClass("required");
            $("#signup_pw").parent().prev().html('Password (at least 8 characters)<i class="remove icon"></i>');
            bool_signup_pw = false;
        }
    });

    $("#signup_cpw").change(function()
    {
        if($("#signup_cpw").val() == $("#signup_pw").val())
        {
            $("#signup_cpw").parent().parent().removeClass("required");
            $("#signup_cpw").parent().prev().html('Confirm password<i class="checkmark icon"></i>');
            bool_signup_pw = true;
        }
        else
        {
            $("#signup_cpw").parent().parent().addClass("required");
            $("#signup_cpw").parent().prev().html('Confirm password (not same)<i class="remove icon"></i>');
            bool_signup_pw = false;
        }
    });

    $("#signup_email").change(function()
    {
        $("#signup_cemail").val("");
        bool_signup_email = false;
        if($("#signup_email").val().length >= 6)
        {
            $("#signup_email").parent().parent().removeClass("required");
            $("#signup_email").parent().prev().html('Email<i class="checkmark icon"></i>');
        }
        else
        {
            $("#signup_email").parent().parent().addClass("required");
            $("#signup_email").parent().prev().html('Email (for sending forgotten password)<i class="remove icon"></i>');
            bool_signup_email = false;
        }
    });

    $("#signup_cemail").change(function()
    {
        if($("#signup_cemail").val() == $("#signup_email").val())
        {
            $("#signup_cemail").parent().parent().removeClass("required");
            $("#signup_cemail").parent().prev().html('Confirm email<i class="checkmark icon"></i>');
            bool_signup_email = true;
        }
        else
        {
            $("#signup_cemail").parent().parent().addClass("required");
            $("#signup_cemail").parent().prev().html('Confirm email (not same)<i class="remove icon"></i>');
            bool_signup_email = false;
        }
    });

    $("#signup_username").change(function()
    {
        bool_signup_username = false;
        if($("#signup_username").val().length > 0)
        {
            $("#signup_username").parent().parent().removeClass("required");
            $("#signup_username").parent().prev().html('Name (Nickname)<i class="checkmark icon"></i>');
            bool_signup_username = true;
        }
        else
        {
            $("#signup_username").parent().parent().addClass("required");
            $("#signup_username").parent().prev().html('Name (Nickname) (at least 1 character ^^)<i class="remove icon"></i>');
            bool_signup_username = false;
        }
    });

    $("#signup_submit").click(function()
    {
        checkAllFields();
    });
});

function checkAllFields()
{
    if(bool_signup_id == true && bool_signup_pw == true && bool_signup_email == true && bool_signup_username == true)
    {
        $.post("/hennojin/php/register.php?mode=signup&signup_id=" + $("#signup_id").val().toLowerCase() + "&signup_pw=" + $("#signup_cpw").val() + "&signup_email=" + $("#signup_cemail").val() + "&signup_username=" + $("#signup_username").val(), function(data)
        {
            if(data == "good")
            {
                $("#theForm").html('<h1>Sign-up has been successful!</h1><h3>And we will redirect you to lobby after 5 seconds...</h3>');
                window.setTimeout(function()
                {
                    window.location.href = "index.php";
                }, 5000);
            }
            else
            {
                alert('Something goes wrong... Please retry later.');
            }
        });
    }
    else
    {
        alert('Please check all fields are correct!');
    }
}
