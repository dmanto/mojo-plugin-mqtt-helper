import type {MojoApp} from '@mojojs/core';
import {connectAsync, type MqttClient, type IClientOptions} from 'mqtt';

type ConnectParameters = [brokerUrl?: string, opts?: IClientOptions];
type DisposableMqttClient = MqttClient & AsyncDisposable;

/**
 * mqttPlugin.
 * @param app
 */
export default function mqttPlugin(app: MojoApp) {
  app.addHelper('mqttClient', async (_ctx, ...args: ConnectParameters) => {
    const [brokerUrl, opts] = args;
    const client = await connectAsync(brokerUrl ?? 'mqtt://localhost:1883', opts ?? {});
    return Object.assign(client, {[Symbol.asyncDispose]: () => client.endAsync()}) as DisposableMqttClient;
  });
}

declare module '@mojojs/core' {
  interface MojoContext {
    mqttClient: (...args: ConnectParameters) => Promise<DisposableMqttClient>;
  }
}
