# restify-no-captcha

This is a small middleware to use with restify to verify Recaptcha response from [google reCaptcha](https://developers.google.com/recaptcha/)

## First thing first

```
    npm install --save restify-no-captcha
```

## Usage

```javascript
...

var recaptchaFactory = require('restify-no-captcha');
var mySecretRecaptchaFromGoogle = 'xxxxxxDDDDAAAAbhq2P9NkorGs3bjseddDd-xz43';
var verifyRecaptchaMiddleware = recaptchaFactory.VerifyCaptchaFactory(mySecretRecaptchaFromGoogle);
...
//in your routes config
...
server.post('/some-endpoint', [
        verifyRecaptchaMiddleware,
        myController.post
    ]);
...


//send a request with a field inside the body called recaptchaResponse
    body : {
        recaptchaResponse : 'captchaResponse' //from google js it would be grecaptcha.getResponse()
    }

//it will call next if recaptcha is validated, or 400 with an error object.
```
