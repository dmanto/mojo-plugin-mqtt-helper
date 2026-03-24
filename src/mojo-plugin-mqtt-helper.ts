import type {MojoApp} from '@mojojs/core';
import {connectAsync, type MqttClient, type IClientOptions} from 'mqtt';

type ConnectParameters = [brokerUrl?: string, opts?: IClientOptions];

/**
 * mqttPlugin.
 * @param app
 */
export default function mqttPlugin(app: MojoApp) {
  app.addHelper('mqttClient', (_ctx, ...args: ConnectParameters) => {
    const [brokerUrl, opts] = args;
    return connectAsync(brokerUrl !== undefined ? brokerUrl : 'mqtt://localhost:1883', opts !== undefined ? opts : {});
  });
}

declare module '@mojojs/core' {
  interface MojoContext {
    mqttClient: (...args: ConnectParameters) => Promise<MqttClient>;
  }
}
