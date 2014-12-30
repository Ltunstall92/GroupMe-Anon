var https = require('https');
var botId = undefined;
function GroupMe(bid) {
	if(bid && typeof(bid) == 'string') {
		botID = bid;
	}
}



GroupMe.prototype.send = function(message) {
	if (!botID) {return;}
	console.log('Sending Message');
	var jsonstr = JSON.stringify({"bot_id": botID, "text":message.substring(0,450)});
	var headers = {"content-type":"application/json"};
	var options = {"host":"api.groupme.com", "path":"/v3/bots/post", "method":"post", "headers":headers};
	console.log(jsonstr);
	var req = https.request(options, function(response) {
		response.on('data', function(data) {console.log(data.toString());});
	});
	req.write(jsonstr);
	req.end();
}


module.exports = GroupMe;
