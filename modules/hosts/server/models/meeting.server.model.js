'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Meeting Schema
 */
var MeetingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  dateAndTime: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: '',
    trim: true
  },
  amount: {
    type: Number
  },
  url: {
    type: String
  },
  registeredUsersInfo: {
    type: Array,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Meeting', MeetingSchema);

