import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js'; // change to 'mojo-plugin-mqtt-helper'
import mojo from '@mojojs/core';

const app = mojo();
app.plugin(mqttPlugin);

app.get('/', async ctx => {
  const client = await ctx.mqttClient('mqtt://test.mosquitto.org');
  client.on('message', async (topic, message) => {
    await ctx.render({text: `Received message on topic ${topic}: ${message}`});
    await client.end();
  });
  await client.subscribe('mojojs/test/#');
  await client.publish('mojojs/test/hello/Channel', 'Hello world!');
});
app.start();
