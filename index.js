var http = require('http');
var fs = require('fs');
var GroupMe = require('./groupme.js');
var groupme = new GroupMe(fs.readFileSync('bot.id').toString().trim());
//Get bot ID from GroupMe dev and place in this file
var postCallbacks = require('./routing.js');

function processData(req,res) {
	var querydata = "";
	
	//Handle app message post situations
	if (req.method === "POST" && postCallbacks[req.url] != 'undefined') {
		req.on('data', function(data) {
			querydata += data;
			//Check for large amounts of data and terminate the connection if it is too large
			if (querydata.length > 1e6) {
				querydata = "";
				res.writeHead(413, {'Content-Type': 'text/plain'});
				res.end();
				request.connection.destroy();
			}
		});
	
		req.on('end', function() {
			postCallbacks[req.url](req, res, querydata, groupme);
		});
	} else if (req.method == "GET") {
		fs.readFile('index.html', function(err, data) {
			if (err) throw err;
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
		});
	} else {
		res.writeHead(404, "Not Found");
		res.end();
	}
};
http.createServer(function(req, res) {
	processData(req,res);
}).listen(3000);
