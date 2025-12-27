const TrainingPlan = require('../models/TrainingPlan');
const Workout = require('../models/Workout');
const Performance = require('../models/Performance');
const Feedback = require('../models/Feedback');

// Get assigned training plans
exports.getMyTrainingPlans = async (req, res) => {
  try {
    const plans = await TrainingPlan.find({ 
      athleteIds: req.user.id,
      status: 'active'
    }).populate('coachId', 'name email phone');

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Log workout
exports.logWorkout = async (req, res) => {
  try {
    const workoutData = {
      ...req.body,
      athleteId: req.user.id
    };

    const workout = await Workout.create(workoutData);

    res.status(201).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get my workouts
exports.getMyWorkouts = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = { athleteId: req.user.id };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const workouts = await Workout.find(query)
      .populate('trainingPlanId', 'title category')
      .sort('-date');

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update workout
exports.updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    if (workout.athleteId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Log performance metrics
exports.logPerformance = async (req, res) => {
  try {
    const performanceData = {
      ...req.body,
      athleteId: req.user.id
    };

    const performance = await Performance.create(performanceData);

    res.status(201).json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get my performance history
exports.getMyPerformance = async (req, res) => {
  try {
    const performance = await Performance.find({ athleteId: req.user.id })
      .sort('-date')
      .limit(50);

    res.status(200).json({
      success: true,
      count: performance.length,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const feedbackData = {
      ...req.body,
      athleteId: req.user.id
    };

    const feedback = await Feedback.create(feedbackData);

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get my feedback
exports.getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ athleteId: req.user.id })
      .populate('coachId', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
