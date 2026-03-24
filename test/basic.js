import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js';
import mojo from '@mojojs/core';
import {test} from 'node:test';

test('mqttPlugin', async t => {
  const app = mojo();
  app.plugin(mqttPlugin);

  app.get('/', async ctx => {
    await ctx.render({text: 'Hello World!'});
  });

  app.get('/get-typeof', async ctx => {
    await ctx.render({text: typeof ctx.mqttClient});
  });

  const ua = await app.newTestUserAgent();
  t.after(() => ua.stop());

  await t.test('Basics', async () => {
    (await ua.getOk('/')).statusIs(200).bodyIs('Hello World!');
  });

  await t.test('Helper exists', async () => {
    (await ua.getOk('/get-typeof')).statusIs(200).bodyIs('function');
  });
});
