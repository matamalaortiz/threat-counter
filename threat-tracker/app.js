var express = require('express');
var app = express();
var firebase = require('firebase');
var mustache = require('mustache-express');
app.engine('html', mustache());

app.set('view engine', 'mustache');
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));

app.use('/assets', express.static('assets'));

/*-----------
//Database Info
--------------*/
var config = {
    apiKey: "AIzaSyBiwcCG717jnVtDlTz_FOUiJlz9Wng32pI",
    authDomain: "threat-1186e.firebaseapp.com",
    databaseURL: "https://threat-1186e.firebaseio.com",
    projectId: "threat-1186e",
    storageBucket: "threat-1186e.appspot.com",
    messagingSenderId: "70131077767"
  };
firebase.initializeApp(config);
var database = firebase.database();

var hello_data = {
	my_name : "harlo",
	my_favorite_color : "yellow",
	my_picture : "harlo.png"
};

app.get('/', function(req, res) {
	res.render("index.html", hello_data);
});

app.get('/anita', function(req, res){
	database.ref('/users/anita').on("value", function(snapshot) {
    res.json(snapshot.val());
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
});

app.post('/', function(req, res) {
	res.render("index.html", hello_data);
});

app.get("/firebase/get/:type", function(req, res){
	// var userInfo = req.params.name.split(',');
	// res.header('Access-Control-Allow-Origin', "*");
	// var requrl = 'http://api.population.io:80/1.0/wp-rank/'+userInfo[0]+'/'+ userInfo[2]+'/' + userInfo[1] + '/today/';
	// Request(requrl, function (error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	// 		//console.log(body);
	// 		var theData = JSON.parse(body).rank;
	// 		res.json(theData);
	// 	}
	// });
  var theData = {
    threat : 38
  };
  res.json(theData);
});

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Simple Server Started at http://%s:%s", host, port);
});
