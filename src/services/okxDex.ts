import { RequestUtil } from '../utils/request';
import { ProxyResponse } from '../types';
import logger from '../utils/logger';

const OKX_DEX_BASE_URL = 'https://web3.okx.com';

export interface CandleParams {
  chainId: string;      // 链ID: 501=Solana, 1=Ethereum, 56=BSC
  address: string;      // 代币合约地址
  bar?: string;         // K线周期: 15s, 1m, 5m, 15m, 1H, 4H, 1D
  limit?: number;       // 返回K线数量
  after?: number;       // 游标时间戳，获取此时间之前的数据
}

export interface BsPointParams {
  chainId: string;          // 链ID
  tokenAddress: string;     // 代币合约地址
  fromAddressTags?: string; // 地址标签过滤: migrate-for-bs, dev, kol-for-bs
  bar?: string;             // K线周期
}

export interface VibeInfoParams {
  chainIndex: string;           // 链ID: 501=Solana, 1=Ethereum
  tokenContractAddress: string; // 代币合约地址
  timeRangeType?: number;       // 时间范围类型: 1=24h, 2=3d, 3=7d, 4=30d
}

export interface TradingHistoryParams {
  chainId: string;              // 链ID
  tokenContractAddress: string; // 代币合约地址
  type?: number;                // 时间范围: 4=5m, 1=1h, 2=4h, 3=24h
}

export interface TokenOverviewParams {
  chainId: string;              // 链ID
  tokenContractAddress: string; // 代币合约地址
}

export class OkxDexService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || OKX_DEX_BASE_URL;
  }

  async getCandles(params: CandleParams): Promise<ProxyResponse> {
    const { chainId, address, bar, limit, after } = params;

    logger.info('Fetching OKX DEX candles', { chainId, address, bar, limit });

    const queryParams: Record<string, string> = {
      chainId,
      address,
      t: String(Date.now()),
    };

    if (bar) {
      queryParams.bar = bar;
    }
    if (limit !== undefined) {
      queryParams.limit = String(limit);
    }
    if (after !== undefined) {
      queryParams.after = String(after);
    }

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: '/priapi/v5/dex/token/market/dex-token-hlc-candles',
        params: queryParams,
        headers: {
          Referer: 'https://web3.okx.com/',
        },
      },
    );
  }

  async getBsPoints(params: BsPointParams): Promise<ProxyResponse> {
    const { chainId, tokenAddress, fromAddressTags, bar } = params;

    logger.info('Fetching OKX DEX buy/sell points', { chainId, tokenAddress, bar });

    const queryParams: Record<string, string> = {
      chainId,
      tokenAddress,
      t: String(Date.now()),
    };

    if (fromAddressTags) {
      queryParams.fromAddressTags = fromAddressTags;
    }
    if (bar) {
      queryParams.bar = bar;
    }

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: '/priapi/v1/dx/market/v2/trading/kline-bs-point',
        params: queryParams,
        headers: {
          Referer: 'https://web3.okx.com/',
        },
      },
    );
  }

  async getVibeInfo(params: VibeInfoParams): Promise<ProxyResponse> {
    const { chainIndex, tokenContractAddress, timeRangeType } = params;

    logger.info('Fetching OKX DEX vibe info', { chainIndex, tokenContractAddress, timeRangeType });

    const queryParams: Record<string, string> = {
      chainIndex,
      tokenContractAddress,
      t: String(Date.now()),
    };

    if (timeRangeType !== undefined) {
      queryParams.timeRangeType = String(timeRangeType);
    }

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: '/priapi/v1/dx/market/v2/token/vibe/info',
        params: queryParams,
        headers: {
          Referer: 'https://web3.okx.com/',
        },
      },
    );
  }

  async getTradingHistory(params: TradingHistoryParams): Promise<ProxyResponse> {
    const { chainId, tokenContractAddress, type } = params;

    logger.info('Fetching OKX DEX trading history', { chainId, tokenContractAddress, type });

    const queryParams: Record<string, string> = {
      chainId,
      tokenContractAddress,
      t: String(Date.now()),
    };

    if (type !== undefined) {
      queryParams.type = String(type);
    }

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: '/priapi/v1/dx/market/v2/trading-history/info',
        params: queryParams,
        headers: {
          Referer: 'https://web3.okx.com/',
        },
      },
    );
  }

  async getTokenOverview(params: TokenOverviewParams): Promise<ProxyResponse> {
    const { chainId, tokenContractAddress } = params;

    logger.info('Fetching OKX DEX token overview', { chainId, tokenContractAddress });

    const queryParams: Record<string, string> = {
      chainId,
      tokenContractAddress,
      t: String(Date.now()),
    };

    return RequestUtil.proxyRequest(
      this.baseUrl,
      {
        method: 'GET',
        url: '/priapi/v1/dx/market/v2/token/overview',
        params: queryParams,
        headers: {
          Referer: 'https://web3.okx.com/',
        },
      },
    );
  }
}
