const User = require('../models/User');
const TrainingPlan = require('../models/TrainingPlan');
const Workout = require('../models/Workout');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role }).select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get system statistics
exports.getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCoaches = await User.countDocuments({ role: 'coach' });
    const totalAthletes = await User.countDocuments({ role: 'athlete' });
    const totalPlans = await TrainingPlan.countDocuments();
    const activePlans = await TrainingPlan.countDocuments({ status: 'active' });
    const totalWorkouts = await Workout.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCoaches,
        totalAthletes,
        totalPlans,
        activePlans,
        totalWorkouts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
