

const router = require('express').Router();
const { addReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;


const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Array of reactionSchema objects
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const dateFormat = (timestamp) => new Date(timestamp).toLocaleDateString();

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
