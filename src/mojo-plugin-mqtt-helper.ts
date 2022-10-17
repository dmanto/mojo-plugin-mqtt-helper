import type {MojoApp, ConfigOptions} from '@mojojs/core/lib/types';
import type {IClientOptions, AsyncMqttClient} from 'async-mqtt';
import {connect} from 'async-mqtt';
interface MqttOptions extends ConfigOptions {
  brokerUrl?: string;
  mqttOptions?: IClientOptions;
}
/**
 * mqttPlugin.
 * @param app
 * @param options
 */
export default function mqttPlugin(app: MojoApp, options: MqttOptions) {
  app.addHelper('mqttClient', () => {
    const brokerUrl = options.brokerUrl ?? 'mqtt://localhost:1883';
    return connect(brokerUrl, options.mqttOptions);
  });
}

declare module '@mojojs/core/lib/types' {
  interface MojoContext {
    mqttClient: () => AsyncMqttClient;
  }
}
