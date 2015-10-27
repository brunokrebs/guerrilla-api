var assert = require('assert');
var Guerrilla = require('../index');

describe('Test suite for guerrilla-api wrapper', function() {

  it('should be able to retrieve the e-mail address', function(done) {
    //sometimes internet connection works as a pitfall
    this.timeout(5000);

    // instatiate guerrilla api object passing an ip and a user-agent
    var guerrillaApi = new Guerrilla('127.0.0.1', 'automated-test-agent');

    // err-back style to call guerrilla 'rest' api
    guerrillaApi.getEmailAddress(function(err, address) {
      assert.equal(err, null, 'Unexpected error occurred: ' + err);
      assert.notEqual(address, null, 'E-mail address should not be null');
      console.log(address + ' is the e-mail address returned from Guerrilla api.');
      done();
    });
  });
});
