'use strict';
var requestPromise = require('request-promise');

var secret = '';
function VerifyCaptchaFactory(secretKey) {
    secret = secretKey;
    return function (req, res, next) {

        if (!req.body) {
            return res.send(400, {error: 'Missing body'});
        }
        if (!req.body.recaptchaResponse) {
            return res.send(400, {error: 'Missing recaptchaResponse field in body'});
        }
        return requestPromise({
            method: 'GET',
            url: 'https://www.google.com/recaptcha/api/siteverify?secret=' + secret + '&response=' + req.body.recaptchaResponse
        })
            .then(function (data) {

                if (data.success === true) {
                    return next();
                } else {
                    return res.send(400, {error: 'Recaptcha verify failed'});
                }
            }, function (err) {
                return res.send(500, {error: err});
            })
    }
}

module.exports.VerifyCaptchaFactory = VerifyCaptchaFactory;