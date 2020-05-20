'use strict';

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var express = require('express');
var app = express();

app.get('/', function(req,res) {
	res.redirect(`/${new Date()}`)
})

app.get('/:date', function(req, res) {
	var timestamp = {
		"unix": null,
		"utc": null
	}
	
	var inputDate = req.params.date
	var inputDateAsDate = new Date(inputDate)
	var d = Date.parse(inputDate)
	
	res.writeHead(200, {'Accept': 'application/json'})
	
	if ( isNaN(d) ) {  
		// date is not valid as a natural date - check to see if it was a unix date..
		// d = inputDateAsDate
		var unixDate = Date.parse(inputDateAsDate)
		if ( isNaN(unixDate) ) {
			// date is invalid
			timestamp.unix = null
			timestamp.utc= null
			console.log('Invalid Date by time...')
			res.end(JSON.stringify({"error": "Invalid Date"}))
		}
		else {
			// date is valid...
			timestamp.unix = inputDate 
			timestamp.utc = new Date(unixDate).toUTCString()
			res.end(JSON.stringify(timestamp))
		}
	}
	else {
		// date is valid
		timestamp.unix = d / 1000
		timestamp.utc = new Date(d).toUTCString()
		res.end(JSON.stringify(timestamp))
	}
	
	console.log('Input:', inputDate)
	console.log('Unix:', timestamp.unix)
	console.log('UTC:', timestamp.utc)
})

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});