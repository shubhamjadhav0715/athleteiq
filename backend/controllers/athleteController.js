const TrainingPlan = require('../models/TrainingPlan');
const Workout = require('../models/Workout');
const Performance = require('../models/Performance');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const { generateTrainingReport } = require('../utils/pdfService');

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch training plans'
    });
  }
};

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
    console.log('Workout logging error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

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
    res.status(500).json({ success: false, message: error.message });
  }
};

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
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Failed to log performance'
    });
  }
};

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

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
      message: 'Could not fetch feedback'
    });
  }
};

exports.getMyAnalytics = async (req, res) => {
  try {
    const athleteId = req.user.id;
    
    const totalWorkouts = await Workout.countDocuments({ athleteId });
    const workouts = await Workout.find({ athleteId }).sort('-date').limit(30);
    const performance = await Performance.find({ athleteId }).sort('-date').limit(10);
    
    const totalDuration = workouts.reduce((sum, w) => sum + (w.totalDuration || 0), 0);
    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const avgDifficulty = workouts.length > 0 
      ? workouts.reduce((sum, w) => sum + (w.difficultyRating || 0), 0) / workouts.length 
      : 0;
    const avgFatigue = workouts.length > 0
      ? workouts.reduce((sum, w) => sum + (w.fatigueLevel || 0), 0) / workouts.length
      : 0;

    const workoutsByCategory = await Workout.aggregate([
      { $match: { athleteId: req.user._id } },
      { $lookup: { from: 'trainingplans', localField: 'trainingPlanId', foreignField: '_id', as: 'plan' } },
      { $unwind: '$plan' },
      { $group: { _id: '$plan.category', count: { $sum: 1 } } }
    ]);

    const last7Days = workouts.slice(0, 7).reverse().map(w => ({
      date: new Date(w.date).toLocaleDateString(),
      duration: w.totalDuration,
      calories: w.caloriesBurned,
      difficulty: w.difficultyRating
    }));

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalWorkouts,
          totalDuration: Math.round(totalDuration / 60),
          totalCalories,
          avgDifficulty: avgDifficulty.toFixed(1),
          avgFatigue: avgFatigue.toFixed(1)
        },
        workoutsByCategory,
        last7Days,
        recentPerformance: performance.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const athleteData = await User.findById(req.user.id);
    const workouts = await Workout.find({ athleteId: req.user.id }).sort('-date').limit(50);
    const performance = await Performance.find({ athleteId: req.user.id }).sort('-date').limit(10);

    const result = await generateTrainingReport(athleteData, workouts, performance);

    if (result.success) {
      res.download(result.filePath, result.fileName, (err) => {
        if (err) {
          console.error('Download error:', err);
          res.status(500).json({ success: false, message: 'Error downloading file' });
        }
      });
    } else {
      res.status(500).json({ success: false, message: 'Failed to generate report' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
