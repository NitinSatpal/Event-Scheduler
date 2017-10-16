'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Meeting = mongoose.model('Meeting'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var stripe = require("stripe")("sk_test_dqaDTltNEWQMu2KEh9UHUxVL");
exports.paymentFromUser = function (req, res) {
	var token = req.body.stripeToken;
	var totalAmount = parseInt(req.body.amount);
	var hostAmount = parseInt(totalAmount - 0.0118);
	var account = req.body.account;
	stripe.charges.create({
	  amount: totalAmount,
	  currency: "usd",
	  source: token,
	  destination: {
	    amount: hostAmount,
	    account: account,
	  },
	}).then(function(charge) {
	  // asynchronously called
	  res.json(charge);
	  Meeting.findOne({_id: req.body.meetingId}).exec(function (err, meeting) {
	  	if (err){
	  		//send mail to admin
	  	} else {
	  		meeting.registeredUsersInfo.push(charge.source);
	  		meeting.save(function (err) {
	  			if (err) {
	  				//send mail to admin
	  			} else {
	  				// do nothing
	  			}
	  		})
	  	}
	  })
	});
}

exports.createMeeting = function (req, res) {
	var meeting = new Meeting(req.body);
	meeting.user = req.user;
	meeting.save(function(err) {
		if (err) {
			res.status(400).json(err)
		} else {
			var url = req.protocol + '://' + req.headers.host + '/' + 'meeting/register/' + meeting._id;
			meeting.url = url;
			meeting.save(function (err) {
				if (err) {
					res.status(400).json(err)
				}
				res.status(200).json(meeting);
			});
		}
	})
}

exports.fetchAllMeetings = function (req, res) {
	Meeting.find({user: req.user._id}).exec(function (err, meetings) {
		if (err) {
			res.status(400).json(err);
		}

		res.status(200).json(meetings);
	})
}

exports.fetchThisMeetingDetails = function (req, res) {
	Meeting.findOne({_id: req.params.meetingId}).populate('user').exec(function (err, meeting) {
		if (err) {
			res.status(400).json(err);
		}
		res.status(200).json(meeting);
	})
}