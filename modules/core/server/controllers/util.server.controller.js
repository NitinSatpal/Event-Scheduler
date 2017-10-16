'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  svgCaptcha = require('svg-captcha');

exports.getCaptchaImage = function (req, res) {
  console.log('aya');
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  
  res.type('svg');
  res.status(200).send(captcha.data);
}
