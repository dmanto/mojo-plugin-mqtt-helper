import type {MojoApp} from '@mojojs/core/lib/types';
import type {IClientOptions, AsyncMqttClient} from 'async-mqtt';
import {connect} from 'async-mqtt';

/**
 * mqttPlugin.
 * @param app
 */
export default function mqttPlugin(app: MojoApp) {
  app.addHelper('mqttClient', (_ctx, brokerUrl?: any, opts?: IClientOptions) => {
    return connect(brokerUrl, opts);
  });
}

declare module '@mojojs/core/lib/types' {
  interface MojoContext {
    mqttClient: (brokerUrl?: any, opts?: IClientOptions) => AsyncMqttClient;
  }
}
