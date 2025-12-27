const express = require('express');
const router = express.Router();
const {
  createTrainingPlan,
  getMyPlans,
  getPlan,
  updatePlan,
  deletePlan,
  getMyAthletes,
  getAthleteProgress,
  respondToFeedback
} = require('../controllers/coachController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

router.use(protect);
router.use(authorize('coach'));

router.route('/plans')
  .post(createTrainingPlan)
  .get(getMyPlans);

router.route('/plans/:id')
  .get(getPlan)
  .put(updatePlan)
  .delete(deletePlan);

router.get('/athletes', getMyAthletes);
router.get('/athletes/:athleteId/progress', getAthleteProgress);
router.put('/feedback/:id/respond', respondToFeedback);

module.exports = router;
