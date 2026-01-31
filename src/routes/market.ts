import Router from 'koa-router';
import { Context } from 'koa';
import { MarketDataService } from '../services/marketData';

const router = new Router({
  prefix: '/market',
});

const marketDataService = new MarketDataService(
  process.env.MARKET_DATA_URL || 'https://api.marketdata.com',
  process.env.MARKET_DATA_API_KEY,
);

router.get('/quote/:symbol', async (ctx: Context) => {
  const { symbol } = ctx.params;
  const result = await marketDataService.getQuote(symbol);
  ctx.body = result;
});

router.get('/candles/:symbol', async (ctx: Context) => {
  const { symbol } = ctx.params;
  const { interval, limit } = ctx.query;

  const result = await marketDataService.getCandles(
    symbol,
    interval as string,
    limit ? parseInt(limit as string, 10) : undefined,
  );

  ctx.body = result;
});

router.get('/ticker/:symbol', async (ctx: Context) => {
  const { symbol } = ctx.params;
  const result = await marketDataService.getTicker(symbol);
  ctx.body = result;
});

export default router;
