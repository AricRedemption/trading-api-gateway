import { BrokerConfig } from '../config';
import { RequestUtil } from '../utils/request';
import { ProxyRequest, ProxyResponse } from '../types';
import logger from '../utils/logger';

export class BrokerProxyService {
  constructor(private config: BrokerConfig) {}

  async proxyRequest<T = unknown>(request: ProxyRequest): Promise<ProxyResponse<T>> {
    logger.info(`Proxying request to broker: ${this.config.name}`, {
      method: request.method,
      url: request.url,
    });

    return RequestUtil.proxyRequest<T>(
      this.config.baseUrl,
      request,
      this.config.apiKey,
      this.config.apiSecret,
    );
  }

  async getAccountInfo(): Promise<ProxyResponse> {
    return this.proxyRequest({
      method: 'GET',
      url: '/account',
    });
  }

  async placeOrder(orderData: unknown): Promise<ProxyResponse> {
    return this.proxyRequest({
      method: 'POST',
      url: '/orders',
      data: orderData,
    });
  }

  async getOrders(params?: Record<string, string>): Promise<ProxyResponse> {
    return this.proxyRequest({
      method: 'GET',
      url: '/orders',
      params,
    });
  }
}
