const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const db = require('./db.js');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Set up middleware to parse JSON requests
app.use(express.json());
app.use(express.static('static'));



app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
