import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js';
import mojo from '@mojojs/core';
import {test} from 'node:test';

const skip =
  process.env.MQTT_TEST_ONLINE === undefined ? {skip: 'set MQTT_TEST_ONLINE to broker url to enable this test'} : {};

test('BrokerConnection', skip, async t => {
  // Isolate tests
  const baseTopic = `mojo-test-topic-${Math.random().toString(36).substring(2)}/`;
  const fooTopic = baseTopic + 'foo';
  const app = mojo();
  app.plugin(mqttPlugin);

  app.get('/subscribe-n-wait', async ctx => {
    const client = await ctx.mqttClient(process.env.MQTT_TEST_ONLINE);
    await client.subscribeAsync(fooTopic);
    const messagePromise = new Promise(resolve => {
      client.once('message', (topic, message) => resolve({topic, message: message.toString()}));
    });
    await client.publishAsync(fooTopic, 'It works!');
    const {topic, message} = await messagePromise;
    await client.unsubscribeAsync(fooTopic);
    await client.endAsync();
    await ctx.render({text: `topic: ${topic}, message: ${message}`});
  });

  const ua = await app.newTestUserAgent();
  t.after(() => ua.stop());

  await t.test('Single message', async () => {
    (await ua.getOk('/subscribe-n-wait')).statusIs(200).bodyIs(`topic: ${fooTopic}, message: It works!`);
  });
});
