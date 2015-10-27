# guerrilla-api
Guerrilla API module for Node

~~~
npm install guerrilla-api
~~~

## why
Well, I first wrote this module to enable automated tests that depend on e-mail.
For example, I'm design a software where the user can create an account, and it
is expected that this user receive an e-mail to validate his/her account. Since
I use [Guerrilla Mail](guerrillamail.com) a lot and they have a not so bad api,
I have decided to write this module to use it in my automated tests.

## why not
You might ask why haven't I used another pre-existing module. You would receive
a short an easy answer: I haven't find any module with a good documentation and
interface.

### usage
First things first. Guerrilla Mail api expects you to pass an ip address that is
the origin of your requests. Besides that, it also expects you to provide an
[user agent](https://en.wikipedia.org/wiki/User_agent). So there we go:

~~~
var Guerrilla = require('guerrilla-api');

var guerrillaApi = new Guerrilla('127.0.0.1', 'automated-test-agent');
guerrillaApi.getEmailAddress(function(err, address) {
  if (err) {
    console.log('Holly crap, something went wrong!' + err);
  } else {
    console.log('As I expected. My new temp e-mail is: ' + address);
  }
});
~~~
