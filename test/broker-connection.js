import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js';
import mojo from '@mojojs/core';
import t from 'tap';

const skip = process.env.TEST_ONLINE === undefined ? {skip: 'set TEST_ONLINE to broker url to enable this test'} : {};

t.test('BrokerConnection', skip, async t => {
  // Isolate tests
  const baseTopic = `mojo-test-topic-${Math.random().toString(36).substring(2)}/`;
  const fooTopic = baseTopic + 'foo';
  const app = mojo();
  app.plugin(mqttPlugin);

  app.get('/subscribe-n-wait', async ctx => {
    const client = await ctx.mqttClient(process.env.TEST_ONLINE);
    await client.subscribe(fooTopic);
    client.on('message', async (topic, message) => {
      await ctx.render({text: `topic: ${topic}, message: ${message}`});
      await client.end();
    });
    await client.publish(fooTopic, 'It works!');
  });

  const ua = await app.newTestUserAgent({tap: t});

  await t.test('Single message', async () => {
    (await ua.getOk('/subscribe-n-wait')).statusIs(200).bodyIs(`topic: ${fooTopic}, message: It works!`);
  });

  await ua.stop();
});
