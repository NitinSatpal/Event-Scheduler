'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  StripeStrategy = require('passport-stripe').Strategy,
  users = require('../../controllers/users.server.controller'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

module.exports = function (config) {
  // Use facebook strategy
  passport.use(new StripeStrategy({
      clientID: 'ca_BY1f1MfDQLWexMnd95UHQS0w7W5GGaQv',
      clientSecret: 'sk_test_dqaDTltNEWQMu2KEh9UHUxVL',
      callbackURL: "http://13.58.243.96:3000/api/auth/stripe/callback",
      passReqToCallback: true
  },
    function(req, accessToken, refreshToken, stripe_properties, done) {
        var providerUserProfile = stripe_properties;
        users.saveStripeDetails(req, providerUserProfile, done);
    }
  ));
};
