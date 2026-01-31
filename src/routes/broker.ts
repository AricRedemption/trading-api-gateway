import Router from 'koa-router';
import { Context } from 'koa';
import { BrokerProxyService } from '../services/brokerProxy';
import { brokerConfigs } from '../config';

const router = new Router({
  prefix: '/broker',
});

router.get('/:brokerName/account', async (ctx: Context) => {
  const { brokerName } = ctx.params;
  const config = brokerConfigs[brokerName];

  if (!config) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: `Broker ${brokerName} not found`,
    };
    return;
  }

  const service = new BrokerProxyService(config);
  const result = await service.getAccountInfo();

  ctx.body = result;
});

router.post('/:brokerName/orders', async (ctx: Context) => {
  const { brokerName } = ctx.params;
  const config = brokerConfigs[brokerName];

  if (!config) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: `Broker ${brokerName} not found`,
    };
    return;
  }

  const service = new BrokerProxyService(config);
  const result = await service.placeOrder(ctx.request.body);

  ctx.body = result;
});

router.get('/:brokerName/orders', async (ctx: Context) => {
  const { brokerName } = ctx.params;
  const config = brokerConfigs[brokerName];

  if (!config) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: `Broker ${brokerName} not found`,
    };
    return;
  }

  const service = new BrokerProxyService(config);
  const result = await service.getOrders(ctx.query as Record<string, string>);

  ctx.body = result;
});

export default router;
