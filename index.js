'use strict';
var axios = require('axios');

function VerifyCaptchaFactory(secret, remoteip) {
    return function (req, res, next) {

        if (!req.body) {
            return res.send(400, {error: 'Missing body'});
        }
        if (!req.body.recaptchaResponse) {
            return res.send(400, {error: 'Missing recaptchaResponse field in body'});
        }
      return axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.recaptchaResponse}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
        },
      ).then(function (response) {
          if (response.data.success === true) {
              return next();
          } else {
            return res.send(400, {
              error: 'Recaptcha verify failed ' + JSON.stringify(response.data['error-codes'])
            });
          }
      }, function (err) {
          return res.send(500, {error: err});
      })
    }
}

module.exports.VerifyCaptchaFactory = VerifyCaptchaFactory;
