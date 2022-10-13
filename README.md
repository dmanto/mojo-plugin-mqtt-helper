
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
