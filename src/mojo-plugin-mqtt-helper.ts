import type {MojoApp} from '@mojojs/core/lib/types';
import {connectAsync, type MqttClient} from 'mqtt';

/**
 * mqttPlugin.
 * @param app
 */
export default function mqttPlugin(app: MojoApp) {
  app.addHelper('mqttClient', (_ctx, ...args: Parameters<typeof connectAsync>) => {
    const [brokerUrl, ...rest] = args;
    return connectAsync(brokerUrl !== undefined ? brokerUrl : 'mqtt://localhost:1833', ...rest);
  });
}

declare module '@mojojs/core/lib/types' {
  interface MojoContext {
    mqttClient: (...args: Parameters<typeof connectAsync> | []) => Promise<MqttClient>;
  }
}
