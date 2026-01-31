import Router from 'koa-router';
import healthRouter from './health';
import brokerRouter from './broker';
import marketRouter from './market';
import okxDexRouter from './okxDex';

const router = new Router();

router.use(healthRouter.routes()).use(healthRouter.allowedMethods());
router.use(brokerRouter.routes()).use(brokerRouter.allowedMethods());
router.use(marketRouter.routes()).use(marketRouter.allowedMethods());
router.use(okxDexRouter.routes()).use(okxDexRouter.allowedMethods());

export default router;
