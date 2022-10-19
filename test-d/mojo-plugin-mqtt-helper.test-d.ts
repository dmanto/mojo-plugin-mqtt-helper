import type {AsyncMqttClient} from 'async-mqtt';
import mqttPlugin from '../lib/mojo-plugin-mqtt-helper';
import mojo from '@mojojs/core';
import {expectType, expectError} from 'tsd';

const app = mojo();
app.plugin(mqttPlugin);
const ctx = app.newMockContext();
expectType<Promise<AsyncMqttClient>>(ctx.mqttClient());
expectType<Promise<AsyncMqttClient>>(ctx.mqttClient('mqtt://test.mosquitto.org', {clientId: 'someClientId'}, true));
