const mongoose = require('mongoose');

const injurySchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bodyPart: {
    type: String,
    required: [true, 'Please specify the injured body part'],
    trim: true
  },
  severity: {
    type: String,
    enum: ['minor', 'moderate', 'severe'],
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please provide injury description']
  },
  dateOccurred: {
    type: Date,
    required: true,
    default: Date.now
  },
  expectedRecoveryDate: {
    type: Date
  },
  actualRecoveryDate: {
    type: Date
  },
  treatment: {
    type: String
  },
  restrictions: [{
    activity: String,
    duration: String
  }],
  status: {
    type: String,
    enum: ['active', 'recovering', 'recovered'],
    default: 'active'
  },
  coachNotes: {
    type: String
  },
  followUpDates: [{
    date: Date,
    notes: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Injury', injurySchema);
