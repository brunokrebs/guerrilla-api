var assert = require('assert');
var Guerrilla = require('../index');

describe('Testing e-mail reception', function() {
	var guerrillaApi;


	it('should be able to list e-mails', function(done) {
		this.timeout(10000);

		guerrillaApi = new Guerrilla('127.0.0.1', 'automated-test-agent');

		guerrillaApi.setEmailAddress('test', function(err, address) {
			assert.equal(err, null);
			assert.ok(address.startsWith('test@'));

			guerrillaApi.getEmailAddress(function(err, email) {
				guerrillaApi.checkEmail(function(err, emails) {
					assert.equal(err, null);
					assert.notEqual(emails, null);
					assert.ok(emails.length >= 1);
					emails.forEach(function(email, idx) {
						assert.notEqual(email.mail_id, null);
						assert.notEqual(email.mail_from, null);
						if (idx === emails.length - 1) {
							done();
						}
					});
				});
			});
		});
	});
});