const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// const ngrok = require('ngrok');
const emailEvents = require('./data.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const EventRouter = require('./routers.js');
app.use(EventRouter);

function callEndpointPeriodically() {
  setInterval(() => {
    // Use a library like axios to make a request to your own API endpoint
    // Here's an example using axios
    
    axios.get('http://localhost:3000/metrics') // Replace with your actual endpoint URL
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, 600); // 60,000 milliseconds = 1 minute
}

app.use('/welcome',(req,res)=>{
  res.json(emailEvents[32]);
})

app.listen(port, () => {
  console.log(`Real-time analytics API listening at http://localhost:${port}`);
  // callEndpointPeriodically();
});

