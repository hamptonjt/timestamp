'use strict';

var express = require('express');
var app = express();

app.get('/', function(req,res) {
	res.redirect(`/${new Date()}`)
})

app.get('/:date', function(req, res) {
	var timestamp = {
		"unix": '',
		"utc": ''
	}
	
	var inputDate = req.params.date
	var d = Date.parse(inputDate)
	
	
	if ( isNaN(d) ) {  
		// date is not valid as a natural date - check to see if it was a unix date..
		if ( isNaN(inputDate) ) {
			// date is invalid
			timestamp.unix = ''
			timestamp.utc= ''
			console.log('Invalid Date by time...')
			res.send({"error": "Invalid Date"})
		}
		else {
			// date is valid...
			timestamp.unix = inputDate
			timestamp.utc = new Date(inputDate * 1).toUTCString()
			res.send(timestamp)
		}
	}
	else {
		// date is valid
		timestamp.unix = d
		timestamp.utc = new Date(d).toUTCString()
		res.send(timestamp)
	}
	
	console.log('Input:', inputDate)
	console.log('Unix:', timestamp.unix)
	console.log('UTC:', timestamp.utc)
	res.end()
})

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});