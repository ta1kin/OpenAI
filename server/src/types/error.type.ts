export interface ICustomError extends Error {
  statusCode: number;
  responseData: Record<string, unknown>;
}