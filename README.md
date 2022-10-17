[![](https://github.com/dmanto/mojo-plugin-mqtt-helper/workflows/test/badge.svg)](https://github.com/dmanto/mojo-plugin-mqtt-helper/actions)
[![Coverage Status](https://coveralls.io/repos/github/dmanto/mojo-plugin-mqtt-helper/badge.svg?branch=main)](https://coveralls.io/github/dmanto/mojo-plugin-mqtt-helper?branch=main)
[![npm](https://img.shields.io/npm/v/dmanto/mojo-plugin-mqtt-helper.svg)](https://www.npmjs.com/package/dmanto/mojo-plugin-mqtt-helper)


A mojo.js plugin to add an MQTT helper.

```js
import mojo from '@mojojs/core';
import mqttPlugin from 'mojo-plugin-mqtt-helper';

const app = mojo();
app.plugin(mqttPlugin);

app.get('/', async ctx => {
  await ctx.render({text: 'Hello World!'});
});

app.start();
```

## Installation

All you need is Node.js 16.0.0 (or newer).

```
$ npm install mojo-plugin-mqtt-helper
```
