import type {MojoApp} from '@mojojs/core/lib/types';
import {connectAsync, type MqttClient, type IClientOptions} from 'mqtt';

// type ConnectParameters = Parameters<typeof connectAsync>;
type ConnectParameters = [brokerUrl?: string, opts?: IClientOptions, allowRetries?: boolean];

/**
 * mqttPlugin.
 * @param app
 */
export default function mqttPlugin(app: MojoApp) {
  app.addHelper('mqttClient', (_ctx, ...args: ConnectParameters) => {
    const [brokerUrl, opts, allowRetries] = args;
    return connectAsync(
      brokerUrl !== undefined ? brokerUrl : 'mqtt://localhost:1883',
      opts !== undefined ? opts : {},
      allowRetries !== undefined ? allowRetries : false
    );
  });
}

declare module '@mojojs/core/lib/types' {
  interface MojoContext {
    mqttClient: (...args: ConnectParameters) => Promise<MqttClient>;
  }
}
