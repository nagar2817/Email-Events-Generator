const express = require('express');
const router = express.Router();
const eventStore = new Map();
const emailEvents = require('./data.js');

// Endpoint to receive real-time analytics events
router.post('/events', (req, res) => {
  const event = req.body;

  // Add a timestamp to the event
  event.timestamp = new Date().toISOString();

  // Set the new event in eventStore
  eventStore.set(event.timestamp, event);

  res.status(200).json({ message: 'Event received successfully' });
});

router.get('/metrics',(req, res) => {
  const opensByCountries = {};
  const opensByCities = {};
  const opensByDevice = {};
  const timeSeries = [];
  const currentTime = Date.now();
  

  eventStore.forEach((event) => {

    // Aggregation by country
    const country = event.geo_ip.country;
    if (!opensByCountries[country]) {
      opensByCountries[country] = 0;
    }
    opensByCountries[country]++;
    
    const city = event.geo_ip.city;
    if (!opensByCities[city]) {
      opensByCities[city] = 0;
    }
    opensByCities[city]++;

    // Aggregation by device type
    const deviceFamily = event.user_agent_parsed.device_family;
    
    switch (deviceFamily) {
      case 'Laptop':
        if (!opensByDevice['Laptop']) {
          opensByDevice['Laptop'] = 0;
        }
        opensByDevice['Laptop']++;
        break;

      case 'Desktop':
        if (!opensByDevice['Desktop']) {
          opensByDevice['Desktop'] = 0;
        }
        opensByDevice['Desktop']++;
        break;
    
      case 'Tablet':
        if (!opensByDevice['Tablet']) {
          opensByDevice['Tablet'] = 0;
        }
        opensByDevice['Tablet']++;
        break;
    
      case 'iPhone':
      case 'Android':
      case 'Window Phone':
      case 'BlackBerry':
        if (!opensByDevice['Mobile']) {
          opensByDevice['Mobile'] = 0;
        }
        opensByDevice['Mobile']++;
        break;
    
      default:
        if (!opensByDevice['Other']) {
          opensByDevice['Other'] = 0;
        }
        opensByDevice['Other']++;
    }

    // Aggregation for time series
    const eventTimestamp = new Date(event.timestamp); // 10:32
    const timeSeriesEntry = timeSeries.find((entry) => {
      const entryTimestamp = new Date(entry.time);
      
      const isSameTime = (
        entryTimestamp.getFullYear() === eventTimestamp.getFullYear() &&
        entryTimestamp.getMonth() === eventTimestamp.getMonth() &&
        entryTimestamp.getDate() === eventTimestamp.getDate() &&
        entryTimestamp.getHours() === eventTimestamp.getHours() &&
        entryTimestamp.getMinutes() === eventTimestamp.getMinutes()
      );
    
      return isSameTime;
    });

    if (timeSeriesEntry) {
      timeSeriesEntry.totalOpens++;
    } else {
      const formattedTime = eventTimestamp.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, // Enables AM/PM format
      });
      const seconds =  "00";

    const formattedTimeWithSeconds = formattedTime.replace(
      /(\d+:\d+:)\d+( [APM]{2})/,
      `$1${seconds}$2`
    );
      timeSeries.push({
        totalOpens: 1,
        time: formattedTimeWithSeconds,
      });
    }
  }
  );

  const metrics = {
    opens_by_countries: opensByCountries,
    opeb_by_cities:opensByCities,
    opens_by_device: opensByDevice,
    timeseries: timeSeries,
  };

  res.status(200).json(metrics);
  // res.sse('message', metrics);
      
});

router.get('/',(req,res)=>{
  res.sendFile(__dirname + "/pages/index.html");
})

module.exports = {
  router,
  eventStore
}