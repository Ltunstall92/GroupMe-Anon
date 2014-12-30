var GroupMe = require('./groupme.js');
var groupme = new GroupMe();
var Pin = require('./pin.js');
var pin = new Pin();
var rootCallback = function (req, res, data) {

};

var sayCallback = function (req, res, data) {
	//Verify the PIN
	var dobj = null;
	try {dobj = JSON.parse(data);}
	catch (err) {};
	if (dobj && dobj.pin && dobj.text && typeof(dobj.text) == "string" && pin.verify(dobj.pin)) {
		res.writeHead(200);
		res.end();
		groupme.send(dobj.text);
	} else {
		res.writeHead(400);
		res.end();
	}
};
module.exports =  {"/":rootCallback,
					 "/say/":sayCallback};
