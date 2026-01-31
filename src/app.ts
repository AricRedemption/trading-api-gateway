import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { appConfig } from './config';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import router from './routes';
import logger from './utils/logger';

const app = new Koa();

app.use(errorHandler);
app.use(requestLogger);
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err) => {
  logger.error('Application error', { error: err.message, stack: err.stack });
});

const PORT = appConfig.port;

app.listen(PORT, () => {
  logger.info(`Trading API Gateway started on port ${PORT}`);
  logger.info(`Environment: ${appConfig.env}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
});

export default app;
