const port='9019'
const Url = "http://jimskon.com"+port
var operation;
var selectID;
var recIndex;
var rows;
var webPage="Login";
var sqlTable ="";
var saveRecord;

$(document).ready(function () {
  $(".btn-login").click( {
    sqlTable="userinfo.sql"
  });
  $("#art-search").click(getMatches);
  changeoperation(operation)
  $(".btn-login").click(getMatches);

  $(".btn-createaccount").click(makeAccount);
});

function getMatches() {
  console.log("GetMatches:"+sqlTable);
  if(sqlTable=="User Info") {
    if("#usernaem-login").length()>1{
      var username = $("#username-login").val();
      var password = $("#password-login").val();
      var search = username+" "+password; }
    else
      var search = $("#user-search-input").val();
  }
  else if(sqlTable=="Art") {
    var search = $("#art-search-input").val();
  }
  $.ajax({
    url: Url+'/find?field='sqlTable+'&search'=search;
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
function processResults(results) {
  if(results=="") {
   errorText();
  }
  else {
    ('#modal').modal('hide');
  }

}
