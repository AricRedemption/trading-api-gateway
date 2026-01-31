import { RequestUtil } from '../utils/request';
import { ProxyResponse } from '../types';
import logger from '../utils/logger';

export class MarketDataService {
  constructor(private baseUrl: string, private apiKey?: string) {}

  async getQuote(symbol: string): Promise<ProxyResponse> {
    logger.info(`Fetching quote for symbol: ${symbol}`);

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: `/quote/${symbol}`,
      },
      this.apiKey,
    );
  }

  async getCandles(
    symbol: string,
    interval: string,
    limit?: number,
  ): Promise<ProxyResponse> {
    logger.info(`Fetching candles for symbol: ${symbol}, interval: ${interval}`);

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: `/candles/${symbol}`,
        params: {
          interval,
          ...(limit && { limit: String(limit) }),
        },
      },
      this.apiKey,
    );
  }

  async getTicker(symbol: string): Promise<ProxyResponse> {
    logger.info(`Fetching ticker for symbol: ${symbol}`);

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: `/ticker/${symbol}`,
      },
      this.apiKey,
    );
  }
}
