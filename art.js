const port='9019'
const Url ='http://jimskon.com:'+port//needed :
var operation;
var selectID;
var recIndex;
var rows;
var webPage="Login";
var sqlTable ="";
var saveRecord;

$(document).ready(function () {
  /*$(".btn-login").click( {
    sqlTable="userinfo.sql"
  });*/
    $(".modal").hide()
    $(".user-profile").hide();
    console.log("ready");
    operation = "Artist";//default
    $("#user-search").click(getList);

//commented out bc we dont need it tomorrow i dont think
    //console.log("ready");
    //changeoperation(operation);
  /*$(".btn-login").click(getMatches("Userinfo"));

  $(".btn-createaccount").click(makeAccount);
*/


  $(".dropdown-menu li a").click(function(){
    $(this).parents(".btn-group").find('.selection').text($(this).text());
    operation=$(this).text().split(" ").pop();  // Get last word
    console.log(operation)
  });
  $("#art-search").click(getMatches);

});

function getMatches() {//if set on one function pass sqlTable to this
  //basically gutted this for demo, we can implement later
  //need a way to differentiate between tables, but cannot call in doc .ready with sql name or else wont search properly
  //may be worth writing a seperate one for user/password

  //for dual purpse:
  /*if(sqlTable=="Userinfo") {
    if("#username-login").length()>1{
      var username = $("#username-login").val();
      var password = $("#password-login").val();
      var search = username+" "+password; }
    else
      var search = $("#user-search-input").val();
  }
  else */
  //if(sqlTable=="art") {
    var search = $("#art-search-input").val();//sets search value
    $('#art-search-input').empty();
  //}
  $.ajax({
    url: Url+'/find?field='+operation+'&search='+search,//+'&sqlTable='+sqlTable, //is this how the find function works or should it be
    type:"GET",
    success: processResults,
    error:displayError
  })
}

function pageChange(webPage) {
/*  if(webPage=="Login") {
    //login page functions will show
}*/
  if(webPage=="Main") {
    //main page functions wiill show
  }
  if(webPage=="ArtSeach") {
    //Art Results pages will show
  }
}
function errorText() {
  $("#modal-login-text").hide();
  $("#modal-login-error-text").show();
}
 function getList(){
   sqlTable="Userinfo.sql"
   search=$("#user-search-input").val();
   $.ajax({
     url: Url+'/list?search='+search,
     type:"GET",
     success: processResults,
     error:displayError
   })
   $('#results').append("this is working list");

 }
//outputs pictures after search
function processResults(results) {
  console.log(results);
  if(results=="") {
   errorText();
  }
  else if(sqlTable=="Userinfo.sql") {
    var userinfo = results.split(",");
    for (var i=0; i<userinfo.length; i++) {
      if(i == 0) {
        userinfo[i] = userinfo[i].replace('[{','');
      } else if (i == userinfo.length-1) {
        userinfo[i] = userinfo[i].replace('}]','');
      }
      userinfo[i]=userinfo[i].split(":").pop();
      for(var j=0; j<userinfo[i].length; j++) {
        userinfo[i][j]=userinfo[i][j].replace('""','');
      }
      console.log(userinfo[i]);
      userinfo[0]
    }
    var username = userinfo[0];

    $(".search-option").hide();
    $(".user-profile").show();
    $("#user-username").text(userinfo[0]);
    $("#user-biography").text(userinfo[2]);
    $(".favorite-artists").text(userinfo[3])

  }
  else if (sqlTable=="art.sql"){
  $('#results').html("");//clears past searc results
  var arrayOfPics = results.split(",");//seperated urls from results
  //for loop for putting pictures on the screen
  var i;
  for(i = 0; i < arrayOfPics.length; i++){
    //cleaning urls to become picture src
  if (i == 0){
    arrayOfPics[i]=arrayOfPics[i].replace('[', '');
  }
  if (i == arrayOfPics.length-1){
    arrayOfPics[i]=arrayOfPics[i].replace(']', '');
  }
  var pic = arrayOfPics[i].replace('{"URL":"', '');
  var pic2 = pic.replace('"}', '');

  //puts picture on website
  $(`<img src='${pic2}'>`).appendTo('#results');
  }
  }
  else {
    console.log(":(");
  }
}
//shows error
function displayError(error) {
    console.log('Error ${error}');
}
