import type {MqttClient} from 'mqtt';
import type {MqttPool} from 'mqtt-pool';
import mqttPlugin from '../lib/mojo-plugin-mqtt-helper';
import mojo from '@mojojs/core';
import {expectType} from 'tsd';

const app = mojo();
app.plugin(mqttPlugin);
const ctx = app.newMockContext();
expectType<Promise<MqttClient & AsyncDisposable>>(ctx.mqttClient());
expectType<Promise<MqttClient & AsyncDisposable>>(ctx.mqttClient('mqtt://test.mosquitto.org'));
expectType<Promise<MqttClient & AsyncDisposable>>(ctx.mqttClient('mqtt://test.mosquitto.org', {clientId: 'someClientId'}));

const appWithPool = mojo();
appWithPool.plugin(mqttPlugin, {pool: {brokerUrl: 'mqtt://localhost:1883', min: 2, max: 5}});
const ctxWithPool = appWithPool.newMockContext();
expectType<MqttPool>(ctxWithPool.mqttPool());
