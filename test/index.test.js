var assert = require('assert');
var Guerrilla = require('../index');
var guerrillaApi;

var invalidIpAddresses = [
	null,
	undefined,
	'',
	'       ',
	'10.0.0.1   ',
	'  10.0.0.1',
	'192.168 0.10',
	'192. 168.0.10',
	'192 .168.0.10',
	'abc',
	'abc.def.ghi.jkl',
	'abc.100.1.jkl',
	'10.0.1'
];

var validIpAddresses = [
	'10.0.0.1',
	'10.0.0.15',
	'127.0.0.1',
	'192.168.0.10',
	'10.0.1.145',
	'201.21.229.208',
	'98.139.180.149',
	'FE80:0000:0000:0000:0202:B3FF:FE1E:8329',
	'FE80::0202:B3FF:FE1E:8329',
	'2607:f0d0:1002:51::4',
	'2607:f0d0:1002:0051:0000:0000:0000:0004'
];

var invalidUserAgents = [
	null,
	undefined,
	'',
	'           ',
	' '
];

var invalidUsernames = [
	null,
	undefined,
	'',
	'\'',
	'@',
	'%',
	'%$#@',
	'a_a'
];

var validUsernames = [
	'bruno',
	'a',
	'a.',
	'a.nice',
	'a.nice-username',
	'weird0-username-',
	'0',
	'013554678948546132646564',
	'.aname'
];

describe('Test suite for guerrilla-api wrapper', function () {
	invalidIpAddresses.forEach(function (ip) {
		it('should NOT accept invalid ip addresses', function (done) {
			assert.throws(function () {
				guerrillaApi = new Guerrilla(ip, 'automated-test-agent')
			}, /address/);
			done();
		});
	});

	validIpAddresses.forEach(function (ip) {
		it('should accept valid ip addresses', function (done) {
			assert.doesNotThrow(function () {
				guerrillaApi = new Guerrilla(ip, 'automated-test-agent')
			});
			done();
		});
	});

	invalidUserAgents.forEach(function (userAgent) {
		it('should NOT accept invalid user agents', function (done) {
			assert.throws(function () {
				guerrillaApi = new Guerrilla('127.0.0.1', userAgent)
			}, /agent/);
			done();
		});
	});

	it('should be able to retrieve the e-mail address', function (done) {
		// instatiate guerrilla api object passing an ip and a user-agent
		guerrillaApi = new Guerrilla('127.0.0.1', 'automated-test-agent');

		// sometimes internet connection works as a pitfall
		this.timeout(5000);

		// err-back style to call guerrilla 'rest' api
		guerrillaApi.getEmailAddress(function (err, address) {
			assert.equal(err, null, 'Unexpected error occurred: ' + err);
			assert.notEqual(address, null, 'E-mail address should not be null');
			done();
		});
	});

	it('should retrieve the e-mail for the second time really fast', function () {
		this.timeout(20);
		guerrillaApi.getEmailAddress(function (err, address) {
			assert.equal(err, null, 'Unexpected error occurred: ' + err);
			assert.notEqual(address, null, 'E-mail address should not be null');
		});
	});

	it('should be able to change the e-mail address', function() {
		// sometimes internet connection works as a pitfall
		this.timeout(5000);

		var desiredUsernameEmail = 'mytestuser';
		guerrillaApi.setEmailAddress(desiredUsernameEmail, function (err, address) {
			assert.equal(err, null, 'Unexpected error occurred: ' + err);
			assert.notEqual(address, null, 'E-mail address should not be null');
			assert.equal(address, desiredUsernameEmail + '@guerrillamailblock.com',
						'E-mail is different than expected. Guerrilla returned ' + address);
			guerrillaApi.getEmailAddress(function(err, address) {
				assert.equal(err, null, 'Unexpected error occurred: ' + err);
				assert.equal(address, desiredUsernameEmail + '@guerrillamailblock.com',
							'E-mail is different than expected. Guerrilla returned ' + address);
			});
		});
	});

	invalidUsernames.forEach(function (username) {
		it('should NOT accept invalid usernames', function (done) {
			assert.throws(function () {
				guerrillaApi.setEmailAddress(username);
			}, /name/, 'Username: ' + username);
			done();
		});
	});

	validUsernames.forEach(function(username) {
		it('should accept valid username ' + username, function(done) {
			// sometimes internet connection works as a pitfall
			this.timeout(5000);
			assert.doesNotThrow(function () {
				guerrillaApi.setEmailAddress(username, function (err, address) {
					assert.equal(address, username + '@guerrillamailblock.com',
						'E-mail is different than expected. Guerrilla returned ' + address);
					done();
				});
			});
		});
	});
});
