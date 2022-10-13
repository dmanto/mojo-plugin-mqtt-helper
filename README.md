
A mojo.js plugin.

```js
import mojo from '@mojojs/core';
import myPlugin from 'mojo-plugin-mqtt-helper';

const app = mojo();
app.plugin(myPlugin);

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
