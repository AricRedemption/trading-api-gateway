export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export interface ProxyRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  data?: unknown;
  params?: Record<string, string>;
}

export interface ProxyResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}
