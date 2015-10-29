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

```js
var Guerrilla = require('guerrilla-api');
var guerrillaApi = new Guerrilla('127.0.0.1', 'automated-test-agent');
```

From that, we are now ready to make our first call to Guerrilla api. Let's see
what e-mail address they give us.

```js
guerrillaApi.getEmailAddress(function(err, address) {
	if (err) {
		console.log('Holly crap, something went wrong!' + err);
	} else {
		console.log('As I expected. My new temp e-mail is: ' + address);
	}
});
```

Well, maybe you don't like the e-mail address randomly provided by Guerrilla.
So, lets create one of our own.

```js
guerrillaApi.setEmailAddress(desiredUsernameEmail, function (err, address) {
	if (err) {
		console.log('Weirdooo, something went wrong!' + err);
	} else {
		console.log('Nice, I have a new e-mail address. Check it out: '
				+ address);
	}
});
```

Now that we have a nice e-mail address, let's check what do we have in our inbox:
```js
guerrillaApi.checkEmail(function (err, emails) {
	if (err) {
		console.log('Noooooo, an error? It must be a solar storm. Let\'s see: '
					+ err);
	} else {
		emails.forEach(function(email) {
			console.log(email.mail_from +
				' sent me an e-mail with the following subject: '
				+ mail.mail_subject);
		});
	}
});
```