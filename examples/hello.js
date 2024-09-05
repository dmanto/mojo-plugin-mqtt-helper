import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js'; // change to 'mojo-plugin-mqtt-helper'
import mojo from '@mojojs/core';

const app = mojo();
app.plugin(mqttPlugin);

app.get('/', async ctx => {
  const client = await ctx.mqttClient('mqtt://test.mosquitto.org');
  client.on('message', async (topic, message) => {
    await ctx.render({text: `Received message on topic ${topic}: ${message}`});
    await client.unsubscribeAsync('mojojs/test/#');
    await client.endAsync();
  });
  await client.subscribeAsync('mojojs/test/#');
  await client.publishAsync('mojojs/test/hello/Channel', 'Hello world!');
});
app.start();
