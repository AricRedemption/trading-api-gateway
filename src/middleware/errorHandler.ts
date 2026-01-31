import { Context, Next } from 'koa';
import logger from '../utils/logger';
import { ApiError } from '../types';

export async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    const error = err as ApiError;

    ctx.status = error.status || 500;
    ctx.body = {
      success: false,
      error: error.message || 'Internal Server Error',
      code: error.code || 'INTERNAL_ERROR',
    };

    logger.error('Request error', {
      method: ctx.method,
      url: ctx.url,
      status: ctx.status,
      error: error.message,
      stack: error.stack,
    });

    ctx.app.emit('error', error, ctx);
  }
}
