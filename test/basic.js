import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js';
import mojo from '@mojojs/core';
import t from 'tap';

t.test('mqttPlugin', async t => {
  const app = mojo();
  app.plugin(mqttPlugin);

  app.get('/', async ctx => {
    await ctx.render({text: 'Hello World!'});
  });

  app.get('/get-typeof', async ctx => {
    await ctx.render({text: typeof ctx.mqttClient});
  });

  const ua = await app.newTestUserAgent({tap: t});

  await t.test('Basics', async () => {
    (await ua.getOk('/')).statusIs(200).bodyIs('Hello World!');
  });

  await t.test('Helper exists', async () => {
    (await ua.getOk('/get-typeof')).statusIs(200).bodyIs('function');
  });

  await ua.stop();
});
