const port='9016'
const Url = "http://jimskon.com"+port
var operation;
var selectID;
var recIndex;
var rows;
var sqlTable ="";
var saveRecord;

$(document).ready(function () {
  $(".modal").show();
  $(".btn-login").click( {
    sqlTable="userinfo.sql"
  });
  $(".btn-login").click(getMatches)

  $(".btn-createaccount").click(makeAccount);
});

function getMatches() {
  console.log("GetMatches:"+sqlTable);
  var username = $("#username-login").val();
  if($("#password-login").val()!="")
  var password = $("#password-login").val();
  $.ajax({
    url: Url+'/find?field='sqlTable+'&username='+username+'&password='+password,
    type:"GET",
    success: processResults,
    error:displayError
  })
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
