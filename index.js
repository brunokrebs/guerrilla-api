var request = require('request').defaults({jar: true});
var validator = require('validator');
var S = require('string');

function Guerrilla(ip, agent) {
	var self = this;

	var guerrillaRegExp = /^([\-\.]*[A-Za-z0-9]+[\-\.]*)+$/;

	function _constructor(ip, agent) {
		if ( ! validator.isIP(ip)) {
			throw new Error('Invalid ip address: ' + ip);
		}
		if (S(agent).isEmpty()) {
			throw new Error('Empty user agent is not allowed.');
		}
		self.ip = ip;
		self.agent = agent;
	}

	_constructor(ip, agent);

	function getEndpoint(apiFunction) {
		var endpoint = 'https://api.guerrillamail.com/ajax.php?' +
			'f=' + apiFunction;
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
				cb(new Error('An error occurred while requesting e-mail address ' +
					'from guerrilla endpoint'));
			} else {
				var resObj = JSON.parse(body);
				self.email = resObj.email_addr;
				cb(null, self.email);
			}
		});
	};

	self.setEmailAddress = function (username, cb) {
		if (S(agent).isEmpty()) {
			throw new Error('Empty user agent is not allowed.');
		}

		if (S(username).isEmpty() || guerrillaRegExp.test(username) === false) {
			throw new Error('Invalid username passed as parameter: ' + username);
		}

		var endpoint = getEndpoint('set_email_user');

		endpoint += '&email_user=' + username;
		// TODO hardcoded, for now
		endpoint += '&lang=en';
		endpoint += '&domain=guerrillamail.com';

		request(endpoint, function(err, res, body) {
			if (err) {
				cb(err);
			} else if (res.statusCode != 200) {
				cb(new Error('An error occurred while setting e-mail address ' +
					'on guerrilla endpoint'));
			} else {
				var resObj = JSON.parse(body);
				self.email = resObj.email_addr;
				cb(null, self.email);
			}
		});
	}
}

module.exports = Guerrilla;
