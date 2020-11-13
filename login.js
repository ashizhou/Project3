$(document).ready(function () {
    $("#user-login").click(getMatches);

    $("#clear").click(clearResults);
});

function getMatches(){
    console.log("getMatches!");
    var username=$('#username').val();
    var password=$('#password').val();
    if(username.length<1 || password.length<1)
    var userinfo=username+" "password,
    return;
    console.log(username+" "+password);
    $.ajax({
	     url: '/cgi-bin/stutz2_artproject.cgi?userinfo='+userinfo,
	     type: "get",
	     dataType: 'text',
	     success: processResults,
       error: function(){alert("Error: Something went wrong");}
    });
}

processResults(results) {
  console.log(results);
  if(results==true)
  {
    $(location).attr("href","http://jimskon.com/class/softdev/stutz2/ArtApp/art.html")
  }
}
