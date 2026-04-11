import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js';
import mojo from '@mojojs/core';
import {test} from 'node:test';

const skip =
  process.env.MQTT_TEST_ONLINE === undefined ? {skip: 'set MQTT_TEST_ONLINE to broker url to enable this test'} : {};

test('BrokerConnectionWithPool', skip, async t => {
  const baseTopic = `mojo-test-pool-${Math.random().toString(36).substring(2)}/`;
  const fooTopic = baseTopic + 'foo';
  const app = mojo();
  app.plugin(mqttPlugin, {pool: {brokerUrl: process.env.MQTT_TEST_ONLINE, min: 1, max: 3}});

  app.post('/publish', async ctx => {
    const body = await ctx.req.json();
    await ctx.mqttPool().publish(fooTopic, body.message);
    await ctx.render({json: {ok: true, size: ctx.mqttPool().size}});
  });

  app.get('/acquire-publish', async ctx => {
    await using client = await ctx.mqttPool().acquire();
    await client.publishAsync(fooTopic, 'via acquire');
    await ctx.render({json: {ok: true}});
  });

  const ua = await app.newTestUserAgent();
  t.after(() => ua.stop());

  await t.test('pool.publish via helper', async () => {
    const res = (await ua.postOk('/publish', {json: {message: 'hello pool'}})).statusIs(200);
    res.jsonIs(true, '/ok');
    res.jsonIs(1, '/size');
  });

  await t.test('pool.acquire with await using', async () => {
    (await ua.getOk('/acquire-publish')).statusIs(200).jsonIs(true, '/ok');
  });
});

test('BrokerConnection', skip, async t => {
  // Isolate tests
  const baseTopic = `mojo-test-topic-${Math.random().toString(36).substring(2)}/`;
  const fooTopic = baseTopic + 'foo';
  const app = mojo();
  app.plugin(mqttPlugin);

  app.get('/disposable', async ctx => {
    const client = await ctx.mqttClient(process.env.MQTT_TEST_ONLINE);
    const hasDispose = typeof client[Symbol.asyncDispose] === 'function';
    await client[Symbol.asyncDispose]();
    await ctx.render({text: `hasDispose: ${hasDispose}, disconnected: ${client.disconnected}`});
  });

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

  await t.test('AsyncDisposable symbol is present', async () => {
    (await ua.getOk('/disposable')).statusIs(200).bodyIs('hasDispose: true, disconnected: true');
  });

  await t.test('Single message', async () => {
    (await ua.getOk('/subscribe-n-wait')).statusIs(200).bodyIs(`topic: ${fooTopic}, message: It works!`);
  });
});
