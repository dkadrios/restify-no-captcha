'use strict';
var axios = require('axios');

var secret = '';
function VerifyCaptchaFactory(secret, remoteip) {
    return function (req, res, next) {

        if (!req.body) {
            return res.send(400, {error: 'Missing body'});
        }
        if (!req.body.recaptchaResponse) {
            return res.send(400, {error: 'Missing recaptchaResponse field in body'});
        }
        return axios.post('https://www.google.com/recaptcha/api/siteverify', {
            secret,
            response: req.body.recaptchaResponse,
			remoteip,
        })
            .then(function (response) {

                if (response.success === true) {
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
