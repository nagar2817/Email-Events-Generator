const { faker } = require('@faker-js/faker');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGeoIP() {
  return {
    country: faker.location.country(),
    region: faker.location.state(),
    city: faker.location.city(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    zip: faker.location.zipCode(),
    postal_code: faker.location.zipCode(),
  };
}

function generateUserAgentParsed() {
  const userAgentParsed = {
    agent_family: faker.lorem.word(),
    device_brand: faker.company.name(),
    device_family: faker.lorem.word(),
    is_mobile: faker.datatype.boolean(),
    is_proxy: faker.datatype.boolean(),
    is_prefetched: faker.datatype.boolean(),
  };

  if (!userAgentParsed.is_mobile) {
    userAgentParsed.os_family = faker.lorem.word();
    userAgentParsed.os_version = faker.system.semver();
  }

  return userAgentParsed;
}

function generateEmailEvent() {
  return {
    ab_test_id: faker.string.alphanumeric(10),
    ab_test_version: getRandomInt(1, 3),
    amp_enabled: faker.datatype.boolean(),
    campaign_id: faker.string.alphanumeric(10),
    click_tracking: faker.datatype.boolean(),
    customer_id: faker.string.alphanumeric(5),
    delv_method: 'esmtp',
    event_id: faker.string.alphanumeric(25),
    friendly_from: faker.internet.email(),
    geo_ip: generateGeoIP(),
    injection_time: faker.date.past().toISOString(),
    initial_pixel: faker.datatype.boolean(),
    ip_location: faker.internet.ip(),
    ip_pool: 'example-ip-pool',
    mailbox_provider: faker.lorem.word(),
    mailbox_provider_region: faker.location.country(),
    message_id: faker.string.alphanumeric(16),
    msg_from: faker.internet.email(),
    msg_size: getRandomInt(1000, 5000),
    num_retries: getRandomInt(0, 5),
    open_tracking: faker.datatype.boolean(),
    queue_time: getRandomInt(1, 60),
    rcpt_tags: [faker.lorem.word(), faker.lorem.word()],
    rcpt_to: faker.internet.email(),
    rcpt_hash: faker.string.alphanumeric(40),
    raw_rcpt_to: faker.internet.email(),
    rcpt_type: 'cc',
    recipient_domain: faker.internet.domainName(),
    routing_domain: faker.internet.domainName(),
    scheduled_time: faker.date.future().getTime() / 1000,
    sending_ip: faker.internet.ip(),
    subaccount_id: faker.string.alphanumeric(3),
    subject: faker.lorem.sentence(),
    template_id: 'templ-1234',
    template_version: '1',
    timestamp: faker.date.past().getTime() / 1000,
    transactional: faker.datatype.boolean() ? '1' : '0',
    transmission_id: faker.string.alphanumeric(17),
    user_agent: faker.internet.userAgent(),
    user_agent_parsed: generateUserAgentParsed(),
  };
}

const numEmailEvents = 10000;
const emailEvents = []; 

for (let i = 0; i < numEmailEvents; i++) {
  emailEvents.push(generateEmailEvent());
} 

module.exports = emailEvents;
