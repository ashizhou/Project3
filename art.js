const port='9019'
const Url ='http://jimskon.com:'+port //needed :
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
  });
  $("#art-search").click(getMatches);
  $(".dropdown-content a").click(function(){
  $('.dropbtn').val($(this));
  });
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
    url: Url+'/find?field='+operation+'&search='+search, //+'&sqlTable='+sqlTable, //is this how the find function works or should it be
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

   $.ajax({
     url: Url+'/list',
     type:"GET",
     success: processResults,
     error:displayError
   })
   $('#results').append("this is working list");

 }
//outputs pictures after search
function processResults(results) {
  $('#results').html("");//clears past searc results
  rows=JSON.parse(results);
  var result = '<div class = artResults>';
  if (rows.length < 1) {
    result += "<h3>Nothing Found</h3>";
    console.log("Nothing Found");
  } else{
     result += '<h3>Results</h3>';
     var i=0;
     rows.forEach(function(row){
      result += `<img src='${row.URL}' class = 'URL'>` + '<p class=Title>Title: ' + row.Title + '</p><p class = Year>Year: ' + row.Year + '</p><p class = Artist>Artist: ' + row.Artist + '</p><p class = Born>Artist Born-Died: ' + row.BornDied + '</p><p class = Technique>Technique: ' + row.Technique + '</p><p class = Location>Location: ' + row.Location + '</p><p class = Form>Form: ' + row.Form + '</p><p class = Type>Type: ' + row.Type + '</p><p class = School>School: ' + row.School + '</p><p class = Timeframe>Timeframe: ' + row.Timeframe + '</p>';
      result += addRating();
      result += "<hr>";
      i++;
     })
    }
     result += '</div>';
     $(result).appendTo('#results');

  if(results=="") {
   errorText();
  }
  else {
//    ('#modal').modal('hide');//no clue what this does not my code
  }

}
//shows error
function displayError(error) {
    console.log('Error ${error}');
}

function addRating()
{
 var ratingTable = '<div class = "dropdown"><button class="dropbtn">Rating</button>';
 ratingTable += '<div class="dropdown-content">';
 ratingTable += '<a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a></div></div>';
 return ratingTable;
}
