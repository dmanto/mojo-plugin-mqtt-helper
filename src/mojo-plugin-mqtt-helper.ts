import type {MojoApp} from '@mojojs/core/lib/types';
import type {IClientOptions,AsyncMqttClient} from 'async-mqtt';
import {connect} from 'async-mqtt';
export default function mqttPlugin(app: MojoApp, url: string, options: IClientOptions) {
  app.addHelper('mqttClient', () => {
    return connect(url, options);
  });
}

declare module '@mojojs/core/lib/types' {
  interface MojoContext {
    mqttClient: () => AsyncMqttClient;
  }
}