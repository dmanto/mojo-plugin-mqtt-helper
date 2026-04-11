import type {MojoApp} from '@mojojs/core';
import {connectAsync, type MqttClient, type IClientOptions} from 'mqtt';
import {createMqttPool, type MqttPool, type MqttPoolOptions} from 'mqtt-pool';

type ConnectParameters = [brokerUrl?: string, opts?: IClientOptions];
type DisposableMqttClient = MqttClient & AsyncDisposable;

export type MqttPluginOptions = {
  /**
   * If provided, initialises a warm connection pool on server start.
   * Enables `ctx.mqttPool()`. Only available in HTTP server context, not CLI.
   */
  pool?: {brokerUrl: string} & MqttPoolOptions;
};

/**
 * mqttPlugin.
 * @param app
 * @param opts
 */
export default function mqttPlugin(app: MojoApp, opts: MqttPluginOptions = {}) {
  app.addHelper('mqttClient', async (_ctx, ...args: ConnectParameters) => {
    const [brokerUrl, connOpts] = args;
    const client = await connectAsync(brokerUrl ?? 'mqtt://localhost:1883', connOpts ?? {});
    return Object.assign(client, {[Symbol.asyncDispose]: () => client.endAsync()}) as DisposableMqttClient;
  });

  if (opts.pool !== undefined) {
    const {brokerUrl, ...poolOpts} = opts.pool;
    let pool: MqttPool | undefined;

    app.addAppHook('server:start', async () => {
      pool = createMqttPool(brokerUrl, poolOpts);
    });

    app.onStop(async () => {
      if (pool !== undefined) await pool.end();
    });

    app.addHelper('mqttPool', (_ctx) => {
      if (pool === undefined) throw new Error('mqttPool: pool not available in CLI context');
      return pool;
    });
  }
}

declare module '@mojojs/core' {
  interface MojoContext {
    mqttClient: (...args: ConnectParameters) => Promise<DisposableMqttClient>;
    mqttPool: () => MqttPool;
  }
}
