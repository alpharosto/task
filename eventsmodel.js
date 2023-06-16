const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name']
  },
  type: {
    type: String,
    required: [true, 'Please enter event type']
  },
  tagline: {
    type: String,
    required: [true, 'Please enter tag']
  },
  schedule: {
    type: Date,
    required: [true, 'Please enter schedule']
  },
  description: {
    type: String,
    required: [true, 'Please enter description']
  },
  moderator: {
    type: String,
    required: [true, 'Please enter moderator name']
  },
  category: {
    type: String,
    required: [true, 'Please enter category']
  },
  sub_category: {
    type: String,
    required: [true, 'Please enter sub-category']
  },
  riger_rank: {
    type: Number,
    required: [true, 'Please enter rank']
  },
  attendees: {
    type: [String],
    required: [true, 'Please provide an array of data']
  },
  image: String
});

const Event = mongoose.model('Event', eventsSchema);

module.exports = Event;
