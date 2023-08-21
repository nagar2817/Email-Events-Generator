const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.MONGO_URL);
const db =  mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000 
})
.then((data) =>console.log(`MongoDB connected with server ${data.connection.host}`))
.catch((err) => console.log(err));

module.exports = db;