export interface AppConfig {
  port: number;
  env: string;
  logLevel: string;
}

export interface BrokerConfig {
  name: string;
  baseUrl: string;
  apiKey?: string;
  apiSecret?: string;
  timeout: number;
}

export const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
};

export const brokerConfigs: Record<string, BrokerConfig> = {
  // 示例配置，根据实际券商API调整
  example: {
    name: 'Example Broker',
    baseUrl: process.env.BROKER_EXAMPLE_URL || 'https://api.example.com',
    apiKey: process.env.BROKER_EXAMPLE_API_KEY,
    apiSecret: process.env.BROKER_EXAMPLE_API_SECRET,
    timeout: 30000,
  },
};
