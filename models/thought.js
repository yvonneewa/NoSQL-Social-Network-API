const mongoose = require("mongoose");
const dayjs = require("dayjs");
const { Schema } = mongoose;

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
    get: (timestamp) => {
      const formattedTimestamp = dayjs(timestamp).format("MM/DD/YYYY h:mm A");
      return formattedTimestamp;
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const dateFormat = (timestamp) => new Date(timestamp).toLocaleDateString();

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
