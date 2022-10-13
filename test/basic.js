import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js';
import mojo from '@mojojs/core';
import t from 'tap';

t.test('mqttPlugin', async t => {
  const app = mojo();
  app.plugin(mqttPlugin);

  app.get('/', async ctx => {
    await ctx.render({ text: 'Hello World!' });
  });

  app.get('/using-helper', async ctx => {
    const typeOfMqtt = typeof ctx.mqttClient;
    await ctx.render({ text: typeOfMqtt });
  });

  const ua = await app.newTestUserAgent({ tap: t });

  await t.test('Basics', async () => {
    (await ua.getOk('/')).statusIs(200).bodyIs('Hello World!');
  });

  await t.test('Function exists', async () => {
    (await ua.getOk('/using-helper')).statusIs(200).bodyIs('function');
  });

  await ua.stop();
});
