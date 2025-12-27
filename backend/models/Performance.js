const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainingPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingPlan'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  metrics: {
    weight: Number,
    bodyFat: Number,
    muscleMass: Number,
    vo2Max: Number,
    restingHeartRate: Number,
    flexibility: Number,
    strength: {
      benchPress: Number,
      squat: Number,
      deadlift: Number
    },
    endurance: {
      runTime5k: Number,
      runTime10k: Number,
      plankDuration: Number
    },
    speed: {
      sprint100m: Number,
      sprint200m: Number
    }
  },
  customMetrics: [{
    name: String,
    value: Number,
    unit: String
  }],
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Performance', performanceSchema);
