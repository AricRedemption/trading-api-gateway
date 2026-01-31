import Router from 'koa-router';
import { Context } from 'koa';
import { OkxDexService } from '../services/okxDex';

const router = new Router({
  prefix: '/okx-dex',
});

const okxDexService = new OkxDexService();

// K线数据接口
// GET /okx-dex/candles?chainId=501&address=xxx&bar=15s&limit=1440&after=xxx
router.get('/candles', async (ctx: Context) => {
  const { chainId, address, bar, limit, after } = ctx.query;

  if (!chainId || !address) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: 'chainId and address are required',
      code: 'INVALID_PARAMS',
    };
    return;
  }

  const result = await okxDexService.getCandles({
    chainId: chainId as string,
    address: address as string,
    bar: bar as string,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    after: after ? parseInt(after as string, 10) : undefined,
  });

  ctx.body = result;
});

// 买卖点标记数据接口
// GET /okx-dex/bs-points?chainId=501&tokenAddress=xxx&bar=15s&fromAddressTags=xxx
router.get('/bs-points', async (ctx: Context) => {
  const { chainId, tokenAddress, bar, fromAddressTags } = ctx.query;

  if (!chainId || !tokenAddress) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: 'chainId and tokenAddress are required',
      code: 'INVALID_PARAMS',
    };
    return;
  }

  const result = await okxDexService.getBsPoints({
    chainId: chainId as string,
    tokenAddress: tokenAddress as string,
    bar: bar as string,
    fromAddressTags: fromAddressTags as string,
  });

  ctx.body = result;
});

// 代币情绪/热度信息接口
// GET /okx-dex/vibe-info?chainIndex=501&tokenContractAddress=xxx&timeRangeType=2
router.get('/vibe-info', async (ctx: Context) => {
  const { chainIndex, tokenContractAddress, timeRangeType } = ctx.query;

  if (!chainIndex || !tokenContractAddress) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: 'chainIndex and tokenContractAddress are required',
      code: 'INVALID_PARAMS',
    };
    return;
  }

  const result = await okxDexService.getVibeInfo({
    chainIndex: chainIndex as string,
    tokenContractAddress: tokenContractAddress as string,
    timeRangeType: timeRangeType ? parseInt(timeRangeType as string, 10) : undefined,
  });

  ctx.body = result;
});

export default router;
