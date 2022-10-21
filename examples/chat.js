import mqttPlugin from '../lib/mojo-plugin-mqtt-helper.js'; // change to 'mojo-plugin-mqtt-helper'
import mojo from '@mojojs/core';

const app = mojo();
app.plugin(mqttPlugin);

app.get('/').to(ctx => ctx.render({inline: chatTemplate}));
app
  .websocket('/channel', async ctx => {
    const client = await ctx.mqttClient('mqtt://test.mosquitto.org');
    ctx.plain(async ws => {
      client.on('message', async (_topic, message) => {
        await ws.send(message.toString());
      });
      await client.subscribe('mojojs/mojochat/#');
      for await (const data of ws) {
        await client.publish('mojojs/mojochat/channel', data);
      }
      ws.on('close', async () => {
        await client.end();
      });
    });
  })
  .name('channel');
app.start();

const chatTemplate = `
<form onsubmit="sendChat(this.children[0]); return false"><input></form>
<div id="log"></div>
<script>
  var ws  = new WebSocket('<%= ctx.urlFor('channel') %>');
  ws.onmessage = function (e) {
    document.getElementById('log').innerHTML += '<p>' + e.data + '</p>';
  };
  function sendChat(input) { ws.send(input.value); input.value = '' }
</script>`;
