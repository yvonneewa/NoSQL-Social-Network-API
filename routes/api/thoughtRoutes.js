const router = require('express').Router();
const {
  getThougts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
} = require('../../controllers/ThoughtController.js');

// /api/Thougts
router.route('/').get(getThougts).post(createThought);

// /api/Thougts/:ThoughtId
router
  .route('/ThoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;
