const express = require('express');
const router = express.Router();
const {
  getMyTrainingPlans,
  logWorkout,
  getMyWorkouts,
  updateWorkout,
  logPerformance,
  getMyPerformance,
  submitFeedback,
  getMyFeedback,
  getMyAnalytics,
  downloadReport
} = require('../controllers/athleteController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

router.use(protect);
router.use(authorize('athlete'));

router.get('/plans', getMyTrainingPlans);

router.route('/workouts')
  .post(logWorkout)
  .get(getMyWorkouts);

router.put('/workouts/:id', updateWorkout);

router.route('/performance')
  .post(logPerformance)
  .get(getMyPerformance);

router.route('/feedback')
  .post(submitFeedback)
  .get(getMyFeedback);

router.get('/analytics', getMyAnalytics);
router.get('/report/download', downloadReport);

module.exports = router;
