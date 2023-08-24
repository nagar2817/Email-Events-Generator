const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// const ngrok = require('ngrok');
const emailEvents = require('./data.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const {router,eventStore} = require('./routers.js');
app.use(router);

// Function to select a random event from the emailEvents array
function getRandomEvent() {
  const randomIndex = Math.floor(Math.random() * emailEvents.length);
  return emailEvents[randomIndex];
} 

// Function to call the /events endpoint with a random event payload
// handling 550+ request out of 600 , that's 92.56% success rate.
function sendRandomEvent() {
  setInterval(()=>{
    const randomEvent = getRandomEvent();

    axios.post('http://localhost:3000/events', randomEvent, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then()
      .catch(error => {
        console.error('Error sending event:', error);
      });
  },100) // sending 100 request per second to generate high throuput
}

function deleteInitialEntries() {
  const entriesToDelete = Array.from(eventStore.keys()).slice(0, 100);
  
  for (const key of entriesToDelete) {
    eventStore.delete(key);
  }
}

setInterval(()=>{
  if(eventStore.size > 500){
    deleteInitialEntries();
  }
},60000); // 1 min

app.listen(port, () => {
  console.log(`Real-time analytics API listening at http://localhost:${port}`);
  sendRandomEvent();
});

