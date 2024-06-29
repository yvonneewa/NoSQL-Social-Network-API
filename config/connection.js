const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/NoSQLChallenge'; 

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error: ', err);
});

module.exports = mongoose.connection;
