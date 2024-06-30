
## NoSQL Social Network API
## Overview

This project implements a RESTful API for a social network using Node.js, Express.js, and MongoDB with Mongoose. It allows users to perform CRUD operations on users, thoughts, reactions, and friend relationships.

## Technologies Used
Node.js
Express.js
MongoDB with Mongoose
Insomnia (for API testing)
JavaScript Date object (for timestamp formatting)

## Getting Started
To get started with this project, follow these steps:

Clone the repository

Gitbash
Copy code
git clone https://github.com/yourusername/nosql-social-network-api.git
cd nosql-social-network-api
Install dependencies

npm install to Set up environment variables

Create a  file for the root directory
Define your MongoDB connection URI file:

MONGODB_URI=mongodb://localhost:27017/socialnetwork
Start the server

npm start

Ensure your MongoDB server is running.
Upon starting the server, the Mongoose models (User and Thought) will automatically sync with your MongoDB database specified in the  file.

## Testing

Users

-GET /api/users: Get all users
-GET /api/users/:userId: Get a single user by ID
-POST /api/users: Create a new user
-PUT /api/users/:userId: Update a user by ID
-DELETE /api/users/:userId: Delete a user by ID

Friends

-POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list
-DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list

Thoughts

-GET /api/thoughts: Get all thoughts
-GET /api/thoughts/:thoughtId: Get a single thought by ID
-POST /api/thoughts: Create a new thought
-PUT /api/thoughts/:thoughtId: Update a thought by ID
-DELETE /api/thoughts/:thoughtId: Delete a thought by ID

Reactions

-POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
-DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought by reaction ID


![alt text](image.png)

## Walkthrough Video



## Contributing
Contributions to the project are welcome!


## Acknowledgements 

xpert learning
activites from class

## License

MIT License

## Contact

github: https://github.com/yvonneewa/NoSQL-Social-Network-API



