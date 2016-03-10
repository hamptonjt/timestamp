'use strict';

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var express = require('express');
var app = express();

app.get('/', function(req,res) {
	res.end('Add a string to the end of the URL to use the microservice...\n\nFor example: \n\nhttps://timestamp-hamptonjt.c9users.io/April%2011,%201977')
	
})

app.get('/:date', function(req, res) {
	var timestamp = {
		"unix": null,
		"natural": null
	}
	
	var inputDate = req.params.date
	var inputDateAsDate = new Date()
	var d = Date.parse(inputDate)
	var naturalDate
	
	inputDateAsDate.setTime(inputDate * 1000) // convert to milliseconds...
	
	res.writeHead(200, {'Accept': 'application/json'})
	
	if ( isNaN(d) ) {  
		// date is not valid as a natural date - check to see if it was a unix date..
		d = inputDateAsDate
		var unixDate = Date.parse(d)
		if ( isNaN(unixDate) ) {
			// date is invalid
			timestamp.unix = null
			timestamp.natural = null
			console.log('Invalid Date by time...')
			res.end(JSON.stringify(timestamp))
		}
		else {
			// date is valid...
			naturalDate = new Date(unixDate)
			timestamp.unix = inputDate 
			timestamp.natural = months[naturalDate.getMonth()] + ' ' + naturalDate.getDate() + ', ' + naturalDate.getFullYear()
			res.end(JSON.stringify(timestamp))
		}
	}
	else {
		// date is valid
		naturalDate = new Date(d)
		timestamp.unix = d / 1000
		timestamp.natural = months[naturalDate.getMonth()] + ' ' + naturalDate.getDate() + ', ' + naturalDate.getFullYear()
		res.end(JSON.stringify(timestamp))
	}
	
	console.log('Input Date:', inputDate)
	console.log('Unix:', timestamp.unix)
	console.log('Natural:', timestamp.natural)
})

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});