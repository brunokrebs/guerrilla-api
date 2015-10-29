var assert = require('assert');
var Guerrilla = require('../index');

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

describe('Testing instatiation', function() {
	invalidIpAddresses.forEach(function (ip) {
		it('should NOT accept invalid ip addresses', function (done) {
			assert.throws(function () {
				var guerrillaApi = new Guerrilla(ip, 'automated-test-agent')
			}, /address/);
			done();
		});
	});

	validIpAddresses.forEach(function (ip) {
		it('should accept valid ip addresses', function (done) {
			assert.doesNotThrow(function () {
				var guerrillaApi = new Guerrilla(ip, 'automated-test-agent')
			});
			done();
		});
	});

	invalidUserAgents.forEach(function (userAgent) {
		it('should NOT accept invalid user agents', function (done) {
			assert.throws(function () {
				var guerrillaApi = new Guerrilla('127.0.0.1', userAgent)
			}, /agent/);
			done();
		});
	});
});