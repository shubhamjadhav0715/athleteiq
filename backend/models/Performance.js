const mongoose = require('mongoose');

const customMetricSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Metric name is required'],
    trim: true,
    maxlength: [50, 'Metric name cannot exceed 50 characters']
  },
  value: {
    type: Number,
    required: [true, 'Metric value is required']
  },
  unit: {
    type: String,
    trim: true,
    maxlength: [20, 'Unit cannot exceed 20 characters']
  }
}, { _id: true });

const performanceSchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Athlete ID is required'],
    validate: {
      validator: async function(value) {
        const User = mongoose.model('User');
        const athlete = await User.findById(value);
        return athlete && athlete.role === 'athlete';
      },
      message: 'Invalid athlete ID or user is not an athlete'
    }
  },
  trainingPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingPlan'
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Performance date cannot be in the future'
    }
  },
  metrics: {
    weight: {
      type: Number,
      min: [20, 'Weight must be at least 20 kg'],
      max: [300, 'Weight cannot exceed 300 kg']
    },
    bodyFat: {
      type: Number,
      min: [3, 'Body fat percentage must be at least 3%'],
      max: [60, 'Body fat percentage cannot exceed 60%']
    },
    muscleMass: {
      type: Number,
      min: [10, 'Muscle mass must be at least 10 kg'],
      max: [200, 'Muscle mass cannot exceed 200 kg']
    },
    vo2Max: {
      type: Number,
      min: [10, 'VO2 Max must be at least 10'],
      max: [100, 'VO2 Max cannot exceed 100']
    },
    restingHeartRate: {
      type: Number,
      min: [30, 'Resting heart rate must be at least 30 bpm'],
      max: [120, 'Resting heart rate cannot exceed 120 bpm']
    },
    flexibility: {
      type: Number,
      min: [0, 'Flexibility score must be at least 0'],
      max: [100, 'Flexibility score cannot exceed 100']
    },
    strength: {
      benchPress: {
        type: Number,
        min: [0, 'Bench press weight must be positive']
      },
      squat: {
        type: Number,
        min: [0, 'Squat weight must be positive']
      },
      deadlift: {
        type: Number,
        min: [0, 'Deadlift weight must be positive']
      }
    },
    endurance: {
      runTime5k: {
        type: Number,
        min: [10, 'Run time must be at least 10 minutes']
      },
      runTime10k: {
        type: Number,
        min: [20, 'Run time must be at least 20 minutes']
      },
      plankDuration: {
        type: Number,
        min: [0, 'Plank duration must be positive']
      }
    },
    speed: {
      sprint100m: {
        type: Number,
        min: [8, 'Sprint time must be at least 8 seconds']
      },
      sprint200m: {
        type: Number,
        min: [16, 'Sprint time must be at least 16 seconds']
      }
    }
  },
  customMetrics: [customMetricSchema],
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
performanceSchema.index({ athleteId: 1, date: -1 });
performanceSchema.index({ trainingPlanId: 1 });
performanceSchema.index({ date: -1 });

// Virtual for BMI calculation
performanceSchema.virtual('bmi').get(function() {
  if (!this.metrics?.weight) return null;
  // Assuming average height of 1.75m for demo (should be stored in user profile)
  const height = 1.75;
  return (this.metrics.weight / (height * height)).toFixed(2);
});

// Pre-save middleware to ensure at least one metric is provided
performanceSchema.pre('save', function(next) {
  const hasMetrics = this.metrics && Object.keys(this.metrics).some(key => {
    const value = this.metrics[key];
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v != null);
    }
    return value != null;
  });
  
  const hasCustomMetrics = this.customMetrics && this.customMetrics.length > 0;
  
  if (!hasMetrics && !hasCustomMetrics) {
    next(new Error('At least one performance metric must be provided'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Performance', performanceSchema);
