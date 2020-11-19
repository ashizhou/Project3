var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require('mysql');
var port = 9019
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/art.html");
})

function openSQL() {
  var con = mysql.createConnection ({
    host:"localhost",
    user: "stutz2",
    password: "S219536",
    database:"TeamB",
  });
  con.connect(function(err) {
    if(err) throw err;
  });
  return con;
}
var con = openSQL();

app.get('/list', function(req,res) {
  query = "SELECT * FROM Userinfo";
  con.query(query, function(err, result, fields) {
    if(err) throw err;
    console.log(result)
    res.end( JSON.stringify(result));
  })
})

app.get('/find', function (req, res) {
    // find art
    console.log("Query:"+JSON.stringify(req.query));
    if (req.query.field === undefined || req.query.search === undefined) {
    	console.log("Missing query value!");
    	res.end('[]');
    } else {
    	field=req.query.field;
    	search=req.query.search;
    	console.log(field+":"+search);

	query = "SELECT * FROM art WHERE "+field + "  like '%"+req.query.search+"%'";
	console.log(query);
	con.query(query, function(err,result,fields) {
	    if (err) throw err;
	    console.log(result)
	    res.end( JSON.stringify(result));
	})
    }
})


var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
