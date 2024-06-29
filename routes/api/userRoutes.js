const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getusers).post(createuser);

// /api/users/:userId
router.route('/:userId').get(getSingleuser).delete(deleteuser);

// /api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThoughts);

// /api/users/:userId/thoughts/:thoughtsId
router.route('/:userId/thoughts/:thoughtsId').delete(removeThoughts);

// /api/users/:userId/reactions
router.route('/:userId/reactions').post(addReactions);

// /api/users/:userId/thoughts/:reactionId
router.route('/:userId/reactions/:reactionsId').delete(removeReactions);


module.exports = router;
