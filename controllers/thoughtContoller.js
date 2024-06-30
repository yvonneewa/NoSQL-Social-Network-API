const { User, Thought } = require("../models/");

module.exports = {
  // this will Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // this will Get a single thought by its ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('user');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async createThought (req, res) {
    try {
      const thought = await Thought.create(req.body);
      
      // Update user's thoughts array
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },



  // this will Update a thought by its ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // this will Delete a thought by its ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: thought.user } });

      res.json({ message: 'Thought and associated users deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },



  // this will Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $push: {
            reactions: { reactionBody, username },
          },
        },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // this will Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $pull: {
            reactions: { _id: reactionId },
          },
        },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};
