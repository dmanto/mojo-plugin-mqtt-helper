[![](https://github.com/dmanto/mojo-plugin-mqtt-helper/workflows/Linux/badge.svg)](https://github.com/dmanto/mojo-plugin-mqtt-helper/actions)
[![](https://github.com/dmanto/mojo-plugin-mqtt-helper/workflows/macOS/badge.svg)](https://github.com/dmanto/mojo-plugin-mqtt-helper/actions)
[![](https://github.com/dmanto/mojo-plugin-mqtt-helper/workflows/Windows/badge.svg)](https://github.com/dmanto/mojo-plugin-mqtt-helper/actions)
[![Coverage Status](https://coveralls.io/repos/github/dmanto/mojo-plugin-mqtt-helper/badge.svg?branch=main)](https://coveralls.io/github/dmanto/mojo-plugin-mqtt-helper?branch=main)
[![npm](https://img.shields.io/npm/v/mojo-plugin-mqtt-helper.svg)](https://www.npmjs.com/package/mojo-plugin-mqtt-helper)

A mojo.js plugin that adds MQTT helpers, built on the [mqtt](https://github.com/mqttjs/MQTT.js) module, with optional connection pooling via [mqtt-pool](https://www.npmjs.com/package/mqtt-pool).

## Important notes for existing users

**v0.8.0** (09/2026)

- Node.js 24 or newer is now required.

**v0.4.0** (09/2024)

- The module does not use `async-mqtt` anymore, and just returns an MqttClient Object
- As a result, methods `subscribe`, `unsubscribe`, `publish` and `end` are now callback-based, so you want to use `subscribeAsync`, `unsubscribeAsync`, `publishAsync` and `endAsync` instead (please see the examples).

## API

### `ctx.mqttClient(brokerUrl?, options?)`

Connects to `brokerUrl` (default `mqtt://localhost:1883`) with the given [mqtt client options](https://github.com/mqttjs/MQTT.js#client) and returns a `Promise<MqttClient>`. The client API is the same as the [mqtt](https://github.com/mqttjs/MQTT.js#api) client. The returned client is also `AsyncDisposable`, so it can be used with `await using`.

### `ctx.mqttPool()`

Only available when the plugin is registered with the `pool` option. Returns the shared [`MqttPool`](https://www.npmjs.com/package/mqtt-pool) instance, with `publish()`, `acquire()`, `receive()` and `request()`. The pool is created on server start and closed on app stop; calling `ctx.mqttPool()` from a CLI command throws.

## Example

```javascript
import mojo from '@mojojs/core';
import mqttPlugin from 'mojo-plugin-mqtt-helper';

const app = mojo();
app.plugin(mqttPlugin);

app.get('/', async ctx => {
  const client = await ctx.mqttClient('mqtt://test.mosquitto.org');
  client.on('message', async (topic, message) => {
    await ctx.render({text: `Received message on topic ${topic}: ${message}`});
    await client.endAsync();
  });
  await client.subscribeAsync('mojojs/test/#');
  await client.publishAsync('mojojs/test/hello/Channel', 'Hello world!');
});
app.start();
```

Using `await using` for automatic cleanup on scope exit (TypeScript users need 5.2+):

```javascript
app.get('/', async ctx => {
  await using client = await ctx.mqttClient('mqtt://test.mosquitto.org');
  client.on('message', async (topic, message) => {
    await ctx.render({text: `Received message on topic ${topic}: ${message}`});
  });
  await client.subscribeAsync('mojojs/test/#');
  await client.publishAsync('mojojs/test/hello/Channel', 'Hello world!');
  // client.endAsync() is called automatically when the handler returns
});
```

Using a connection pool, so requests reuse warm connections instead of connecting each time:

```javascript
app.plugin(mqttPlugin, {pool: {brokerUrl: 'mqtt://localhost:1883', min: 2, max: 10}});

app.post('/gate/open', async ctx => {
  await ctx.mqttPool().publish('gate/cmd', 'open');
  await ctx.render({json: {ok: true}});
});

app.get('/temperature', async ctx => {
  const {message} = await ctx.mqttPool().receive('sensors/temperature', {timeout: 5000});
  await ctx.render({json: {temperature: message.toString()}});
});
```

Besides `brokerUrl`, the `pool` option accepts all [mqtt-pool options](https://www.npmjs.com/package/mqtt-pool) (`min`, `max`, `acquireTimeoutMillis`, `idleTimeoutMillis`, `mqttOptions`, ...).

## More examples

This distribution also contains an example implementing a simple websockets based chat room:
[chat](https://github.com/dmanto/mojo-plugin-mqtt-helper/tree/main/examples/chat.js).

## Installation

All you need is Node.js 24.0.0 (or newer).

`@mojojs/core` and `mqtt` are peer dependencies, so install them alongside the plugin:

```
$ pnpm add mojo-plugin-mqtt-helper @mojojs/core mqtt
```
