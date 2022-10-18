import type {MojoApp} from '@mojojs/core/lib/types';
import type {IClientOptions, AsyncMqttClient} from 'async-mqtt';
import pkg from 'async-mqtt';
const {connectAsync} = pkg;

/**
 * mqttPlugin.
 * @param app
 */
export default function mqttPlugin(app: MojoApp) {
  app.addHelper('mqttClient', (_ctx, brokerUrl?: any, opts?: IClientOptions, allowRetries?: boolean) => {
    return connectAsync(brokerUrl, opts, allowRetries);
  });
}

declare module '@mojojs/core/lib/types' {
  interface MojoContext {
    mqttClient: (brokerUrl?: any, opts?: IClientOptions, allowRetries?: boolean) => Promise<AsyncMqttClient>;
  }
}
