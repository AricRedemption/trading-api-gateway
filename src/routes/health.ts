import Router from 'koa-router';
import { Context } from 'koa';

const router = new Router({
  prefix: '/health',
});

router.get('/', async (ctx: Context) => {
  ctx.body = {
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'trading-api-gateway',
  };
});

export default router;
