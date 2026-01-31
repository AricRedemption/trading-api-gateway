import { Context, Next } from 'koa';
import logger from '../utils/logger';

export async function requestLogger(ctx: Context, next: Next): Promise<void> {
  const start = Date.now();

  logger.info('Incoming request', {
    method: ctx.method,
    url: ctx.url,
    ip: ctx.ip,
  });

  await next();

  const ms = Date.now() - start;

  logger.info('Request completed', {
    method: ctx.method,
    url: ctx.url,
    status: ctx.status,
    duration: `${ms}ms`,
  });
}
