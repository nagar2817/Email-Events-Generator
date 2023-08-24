const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the event
const eventSchema = new Schema({
  ab_test_id: String,
  ab_test_version: String,
  amp_enabled: Boolean,
  campaign_id: String,
  click_tracking: Boolean,
  customer_id: String,
  delv_method: String,
  event_id: String,
  friendly_from: String,
  geo_ip: {
    country: String,
    region: String,
    city: String,
    latitude: Number,
    longitude: Number,
    zip: Number,
    postal_code: String
  },
  injection_time: Date,
  initial_pixel: Boolean,
  ip_address: String,
  ip_pool: String,
  mailbox_provider: String,
  mailbox_provider_region: String,
  message_id: String,
  msg_from: String,
  msg_size: Number,
  num_retries: Number,
  open_tracking: Boolean,
  queue_time: Number,
  rcpt_meta: Object,
  rcpt_tags: [String],
  rcpt_to: String,
  rcpt_hash: String,
  raw_rcpt_to: String,
  rcpt_type: String,
  recipient_domain: String,
  routing_domain: String,
  scheduled_time: Number,
  sending_ip: String,
  subaccount_id: String,
  subject: String,
  template_id: String,
  template_version: String,
  timestamp: Number,
  transactional: String,
  transmission_id: String,
  type: String,
  user_agent: String,
  user_agent_parsed: {
    agent_family: String,
    device_brand: String,
    device_family: String,
    os_family: String,
    os_version: String,
    is_mobile: Boolean,
    is_proxy: Boolean,
    is_prefetched: Boolean
  }
});

// Create a model for the event
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;