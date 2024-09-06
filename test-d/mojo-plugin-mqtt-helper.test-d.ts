import type {MqttClient} from 'mqtt';
import mqttPlugin from '../lib/mojo-plugin-mqtt-helper';
import mojo from '@mojojs/core';
import {expectType} from 'tsd';

const app = mojo();
app.plugin(mqttPlugin);
const ctx = app.newMockContext();
expectType<Promise<MqttClient>>(ctx.mqttClient());
expectType<Promise<MqttClient>>(ctx.mqttClient('mqtt://test.mosquitto.org'));
expectType<Promise<MqttClient>>(ctx.mqttClient('mqtt://test.mosquitto.org', {clientId: 'someClientId'}, true));
