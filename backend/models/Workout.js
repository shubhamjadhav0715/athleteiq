const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainingPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingPlan',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  exercises: [{
    name: String,
    setsCompleted: Number,
    repsCompleted: String,
    durationCompleted: String,
    weight: String,
    notes: String
  }],
  totalDuration: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number
  },
  difficultyRating: {
    type: Number,
    min: 1,
    max: 10
  },
  fatigueLevel: {
    type: Number,
    min: 1,
    max: 10
  },
  mood: {
    type: String,
    enum: ['excellent', 'good', 'average', 'poor', 'exhausted']
  },
  notes: {
    type: String
  },
  injuries: [{
    bodyPart: String,
    severity: {
      type: String,
      enum: ['minor', 'moderate', 'severe']
    },
    description: String
  }],
  completed: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
