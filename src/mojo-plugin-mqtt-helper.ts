import type {MojoApp} from '@mojojs/core/lib/types';
import {connectAsync, type MqttClient, type IClientOptions} from 'mqtt';

/**
 * mqttPlugin.
 * @param app
 */
export default function mqttPlugin(app: MojoApp) {
  app.addHelper('mqttClient', (_ctx, brokerUrl?, opts?, allowRetries?) => {
    return connectAsync(brokerUrl !== undefined ? brokerUrl : 'mqtt://localhost:1833', opts, allowRetries);
  });
}

declare module '@mojojs/core/lib/types' {
  interface MojoContext {
    mqttClient: (brokerUrl?: string, opts?: IClientOptions, allowRetries?: boolean) => Promise<MqttClient>;
  }
}
