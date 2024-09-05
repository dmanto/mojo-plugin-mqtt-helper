[![](https://github.com/dmanto/mojo-plugin-mqtt-helper/workflows/Linux/badge.svg)](https://github.com/dmanto/mojo-plugin-mqtt-helper/actions)
[![](https://github.com/dmanto/mojo-plugin-mqtt-helper/workflows/macOS/badge.svg)](https://github.com/dmanto/mojo-plugin-mqtt-helper/actions)
[![](https://github.com/dmanto/mojo-plugin-mqtt-helper/workflows/Windows/badge.svg)](https://github.com/dmanto/mojo-plugin-mqtt-helper/actions)
[![Coverage Status](https://coveralls.io/repos/github/dmanto/mojo-plugin-mqtt-helper/badge.svg?branch=main)](https://coveralls.io/github/dmanto/mojo-plugin-mqtt-helper?branch=main)
[![npm](https://img.shields.io/npm/v/mojo-plugin-mqtt-helper.svg)](https://www.npmjs.com/package/mojo-plugin-mqtt-helper)

A mojo.js plugin to add an MQTT helper, wrapped over mqtt module.

## Important notes for existing users

**v0.4.0** (09/2024)

- The module does not use `async-mqtt` anymore, and just returns an MqttClient Object
- As a result, methods `subscribe`, `unsuscribe`, `publish` and `end` are now blocking methods, so you want to use `subscribeAsync`, `unsuscribeAsync`, `publishAsync` and `endAsync` instead (please see the examples).

## API

The API is the same as [mqtt](https://github.com/mqttjs/mqtt#api) client.

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

## More examples

This distribution also contains an example implementing a simple websockets based chat room:
[chat](https://github.com/dmanto/mojo-plugin-mqtt-helper/tree/main/examples/chat.js).

## Installation

All you need is Node.js 16.0.0 (or newer).

```
$ npm install mojo-plugin-mqtt-helper
```
