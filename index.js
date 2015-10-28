var request = require('request').defaults({jar: true});
var validator = require('validator');
var S = require('string');

function Guerrilla(ip, agent) {
	if ( ! validator.isIP(ip)) {
		throw new Error('Invalid ip address: ' + ip);
	}
	if (S(agent).isEmpty()) {
		throw new Error('Empty user agent is not allowed.');
	}
	var self = this;
	self.ip = ip;
	self.agent = agent;

	function getEndpoint(apiFunction) {
		var endpoint = 'http://api.guerrillamail.com/ajax.php?' +
			'f=' + apiFunction +
			'&ip=' + self.ip + '&agent=' + self.agent;
		return endpoint;
	}

	self.getEmailAddress = function(cb) {
		if (self.email) {
			cb(null, self.email);
		}
		request(getEndpoint('get_email_address'), function (err, res, body) {
			if (err) {
				cb(err);
			} else if (res.statusCode != 200) {
				cb(new Error('An err ocurred while requesting e-mail address ' +
					'from guerrilla endpoint'));
			} else {
				var resObj = JSON.parse(body);
				self.email = resObj.email_addr;
				cb(null, self.email);
			}
		});
	};
}

module.exports = Guerrilla;
