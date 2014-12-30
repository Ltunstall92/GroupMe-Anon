var GroupMe = require('./groupme.js');
var groupme = new GroupMe();
var pin;
function newPin() {
	var p = "";
	for (i = 0; i<4; i++) {
		p+= Math.floor(Math.random() * 10).toString();
	}
	groupme.send('CONSOLE: New PIN is ' + p + '\nSend messages here: http://104.236.16.182:3000/');
	return p;
}
function Pin() {
	pin = newPin();
	this._scheduler = require('node-schedule');
	var rule = new this._scheduler.RecurrenceRule();
	rule.second = 0;
	rule.minute = 0;
	rule.hour = 12;
	this._scheduler.scheduleJob(rule, function() {
		pin = newPin();	
	});
}

Pin.prototype.verify = function(p) {
	return p === pin;
}

module.exports = Pin;
