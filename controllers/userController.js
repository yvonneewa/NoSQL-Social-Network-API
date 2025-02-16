const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // this will Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate("friends");
      const userObj = {
        users,
        headCount: users.length,
      };
      return res.json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  //this will Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // this will Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
  
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  

  // this will Delete a user and remove associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thoughts = await Thought.deleteMany({ username: user.username });

      res.json({
        message: "User and associated thoughts deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            friends: friendId,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            friends: friendId,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
