var assert = require('assert');
var Guerrilla = require('../index');

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


describe('Testing getting and setting e-mail address', function () {
	var guerrillaApi;

	beforeEach(function() {
		guerrillaApi = new Guerrilla('127.0.0.1', 'automated-test-agent');
	});

	it('should be able to retrieve the e-mail address', function (done) {
		// sometimes internet connection works as a pitfall
		this.timeout(10000);

		// err-back style to call guerrilla 'rest' api
		guerrillaApi.getEmailAddress(function (err, address) {
			assert.equal(err, null, 'Unexpected error occurred: ' + err);
			assert.notEqual(address, null, 'E-mail address should not be null');
			done();
		});
	});

	it('should retrieve the e-mail for the second time really fast', function (done) {
		guerrillaApi.getEmailAddress(function (err, address) {
			assert.equal(err, null, 'Unexpected error occurred: ' + err);
			assert.notEqual(address, null, 'E-mail address should not be null');
			done();
		});
	});

	it('should be able to change the e-mail address', function (done) {
		var desiredUsernameEmail = 'mytestuser';
		guerrillaApi.setEmailAddress(desiredUsernameEmail, function (err, address) {
			assert.equal(err, null, 'Unexpected error occurred: ' + err);
			assert.notEqual(address, null, 'E-mail address should not be null');
			assert.equal(address, desiredUsernameEmail + '@guerrillamailblock.com',
						'E-mail is different than expected. Guerrilla returned ' + address);
			done();
		});
	});

	it('should have the same e-mail set before', function (done) {
		var desiredUsernameEmail = 'mytestuser';
		guerrillaApi.getEmailAddress(function(err, address) {
			assert.equal(err, null, 'Unexpected error occurred: ' + err);
			assert.equal(address, desiredUsernameEmail + '@guerrillamailblock.com',
				'E-mail is different than expected. Guerrilla returned ' + address);
			done();
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
		it('should accept valid username ' + username, function (done) {
			// sometimes internet connection works as a pitfall
			this.timeout(10000);
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
