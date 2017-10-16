'use strict';

/**
 * Module dependencies
 */
var host = require('../controllers/hosts.server.controller')

module.exports = function (app) {
	app.route('/api/buyer/meetup/register')
		.post(host.paymentFromUser);

	app.route('/api/host/meeting')
		.get(host.fetchAllMeetings)
		.post(host.createMeeting);

	app.route('/api/host/single/meeting/:meetingId')
		.get(host.fetchThisMeetingDetails)
};
