import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from '../utils/logger';
import { ProxyRequest, ProxyResponse } from '../types';

export class RequestUtil {
  static async proxyRequest<T = unknown>(
    baseUrl: string,
    request: ProxyRequest,
    apiKey?: string,
    apiSecret?: string,
  ): Promise<ProxyResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method: request.method,
        url: `${baseUrl}${request.url}`,
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        timeout: 30000,
      };

      if (apiKey) {
        config.headers!['X-API-Key'] = apiKey;
      }

      if (apiSecret) {
        config.headers!['X-API-Secret'] = apiSecret;
      }

      if (request.data) {
        config.data = request.data;
      }

      if (request.params) {
        config.params = request.params;
      }

      logger.info('Proxying request', {
        method: config.method,
        url: config.url,
      });

      const response: AxiosResponse<T> = await axios(config);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('Proxy request failed', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        return {
          success: false,
          error: error.response?.data?.message || error.message,
          code: error.response?.data?.code || 'PROXY_ERROR',
        };
      }

      logger.error('Unexpected error', { error });
      return {
        success: false,
        error: 'Unexpected error occurred',
        code: 'UNKNOWN_ERROR',
      };
    }
  }
}
